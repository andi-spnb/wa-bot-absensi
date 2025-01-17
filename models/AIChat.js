const axios = require('axios');
const pool = require('../config/database');

class AIChat {
    static async processMessage(message, type = 'gemini') {
        try {
            let response;
            switch (type) {
                case 'gemini':
                    response = await this.processWithGemini(message);
                    break;
                case 'mistral':
                    response = await this.processWithMistral(message);
                    break;
                default:
                    throw new Error('AI type not supported');
            }

            // Simpan chat ke database
            await this.saveChat(message, response, type);
            return response;
        } catch (error) {
            console.error(`Error processing ${type} message:`, error);
            throw error;
        }
    }

    static async processWithGemini(message) {
        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            });

            return response.data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini API error:', error);
            throw new Error('Gagal memproses dengan Gemini AI');
        }
    }

    static async processWithMistral(message) {
        try {
            const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
                model: "mistral-tiny",
                messages: [{
                    role: "user",
                    content: message
                }],
                max_tokens: 500,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Mistral API error:', error.response?.data || error);
            throw new Error('Gagal memproses dengan Mistral AI');
        }
    }

    static async saveChat(message, response, aiType) {
        try {
            const [result] = await pool.query(
                'INSERT INTO ai_chats (message, response, ai_type, created_at) VALUES (?, ?, ?, NOW())',
                [message, response, aiType]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error saving chat:', error);
            return null;
        }
    }
}

module.exports = AIChat;