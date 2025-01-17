const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const logger = require('./logger');
const BotCommand = require('../models/BotCommand');
const AIChat = require('../models/AIChat');

let globalSocket = null;

async function startWhatsApp() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: true,
            browser: ['WA Bot Absensi', '', ''],
            logger: pino({ level: 'silent' })
        });

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                logger.info('QR Code ready to scan');
                qrcode.generate(qr, { small: true });
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                logger.info('Connection closed due to ', lastDisconnect?.error?.message);
                
                if (shouldReconnect) {
                    startWhatsApp();
                }
            }

            if (connection === 'open') {
                logger.info('WhatsApp connected successfully!');
                globalSocket = sock;
            }
        });

        sock.ev.on('messages.upsert', async (m) => {
            try {
                const msg = m.messages[0];
                
                // Check if message is from group or private chat
                const isGroup = msg.key.remoteJid.endsWith('@g.us');
                
                if (!msg.key.fromMe && m.type === 'notify') {
                    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
                    console.log('Pesan diterima:', text);
        
                    if (text.startsWith('!')) {
                        const command = text.split(' ')[0].toLowerCase();
                        const question = text.slice(command.length).trim();
// Di dalam event handler messages.upsert
if (['!ask', '!gemini', '!mistral'].includes(command)) {
    try {
        if (!question) {
            await sock.sendMessage(msg.key.remoteJid, { 
                text: '❌ Mohon masukkan pertanyaan setelah command.\n\nContoh: !mistral apa itu javascript?',
                quoted: msg
            });
            return;
        }

        // Kirim loading message
        await sock.sendMessage(msg.key.remoteJid, { 
            text: '⌛ Sedang memproses pertanyaan Anda...',
            quoted: msg
        });

        // Tentukan tipe AI berdasarkan command
        let aiType, aiName;
        switch (command) {
            case '!mistral':
                aiType = 'mistral';
                aiName = 'Mistral';
                break;
            case '!gemini':
            case '!ask':
            default:
                aiType = 'gemini';
                aiName = 'Gemini';
                break;
        }

        // Tambahkan informasi pengirim untuk grup
        const isGroup = msg.key.remoteJid.endsWith('@g.us');
        let promptPrefix = '';
        if (isGroup) {
            const sender = msg.pushName || 'User';
            promptPrefix = `[Question from ${sender}]: `;
        }

        const response = await AIChat.processMessage(promptPrefix + question, aiType);
        
        // Format response
        let formattedResponse = `*🤖 ${aiName} AI Response*`;
        if (isGroup) {
            const sender = msg.pushName || 'User';
            formattedResponse += `\n\n*Question from:* ${sender}`;
        }
        formattedResponse += `\n\n${response}\n\n_Powered by ${aiName} AI_`;

        await sock.sendMessage(msg.key.remoteJid, { 
            text: formattedResponse,
            quoted: msg
        });

    } catch (error) {
        console.error('AI processing error:', error);
        await sock.sendMessage(msg.key.remoteJid, { 
            text: '❌ Maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi nanti.',
            quoted: msg
        });
    }
    return;
}
        
                        // Handle command biasa
                        console.log('Command yang diterima:', command);
                        const commandData = await BotCommand.findByCommand(command);
                        
                        if (commandData) {
                            await sock.sendMessage(msg.key.remoteJid, { 
                                text: commandData.response,
                                quoted: isGroup ? msg : undefined // Quote pesan jika di grup
                            });
                        } else {
                            const helpMessage = `*❌ Command Tidak Dikenali*\n\nBerikut adalah daftar command yang tersedia:\n\n*AI Commands:*\n!ask [pertanyaan] - Tanya ke AI\n!gemini [pertanyaan] - Tanya ke Gemini AI\n\n*Basic Commands:*\n!help - Menampilkan bantuan\n!status - Cek status bot\n\nKetik !help untuk informasi lebih detail.`;
                            
                            await sock.sendMessage(msg.key.remoteJid, { 
                                text: helpMessage,
                                quoted: isGroup ? msg : undefined
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Error handling message:', error);
                logger.error('Error in message handler:', error);
                try {
                    await sock.sendMessage(msg.key.remoteJid, { 
                        text: '❌ Terjadi kesalahan sistem. Mohon coba lagi nanti.',
                        quoted: msg
                    });
                } catch (sendError) {
                    console.error('Error sending error message:', sendError);
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);

        return sock;
    } catch (err) {
        logger.error('Error in WhatsApp setup:', err);
        return null;
    }
}

async function sendWhatsAppMessage(to, message) {
    if (!globalSocket) {
        throw new Error('WhatsApp not connected');
    }

    try {
        const formattedNumber = to.startsWith('0') ? 
            `62${to.slice(1)}@s.whatsapp.net` : 
            `${to}@s.whatsapp.net`;

        await globalSocket.sendMessage(formattedNumber, { text: message });
        return true;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
}

function getSocketStatus() {
    return {
        connected: globalSocket !== null,
        state: globalSocket ? 'connected' : 'disconnected',
        lastReconnect: globalSocket ? new Date().toISOString() : null
    };
}

module.exports = {
    startWhatsApp,
    sendWhatsAppMessage,
    getSocketStatus
};