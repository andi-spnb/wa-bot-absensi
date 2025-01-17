const axios = require('axios');
const pool = require('../config/database');

class MistralAI {
    static async generateResponse(prompt) {
        try {
            const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
                model: 'mistral-tiny',  // atau 'mistral-small', 'mistral-medium'
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: 1000
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Mistral AI Error:', error);
            throw new Error('Gagal mendapatkan respons dari AI');
        }
    }

    static async saveChat(userId, prompt, response) {
        try {
            const [result] = await pool.query(
                'INSERT INTO ai_chats (user_id, message, response, ai_type) VALUES (?, ?, ?, ?)',
                [userId, prompt, response, 'mistral']
            );
            return result.insertId;
        } catch (error) {
            console.error('Error saving chat:', error);
            // Tidak throw error agar tidak mengganggu flow utama
        }
    }

    static async getChatHistory(userId, limit = 10) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM ai_chats WHERE user_id = ? AND ai_type = "mistral" ORDER BY created_at DESC LIMIT ?',
                [userId, limit]
            );
            return rows;
        } catch (error) {
            console.error('Error getting chat history:', error);
            return [];
        }
    }
}

module.exports = MistralAI;