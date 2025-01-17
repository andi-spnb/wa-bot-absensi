// scripts/seed-commands.js
const pool = require('../config/database');

const defaultCommands = [
    {
        command: '!help',
        title: 'Bantuan',
        response: `*🤖 Menu Bantuan Bot*

Berikut adalah daftar perintah yang tersedia:

!help - Menampilkan menu bantuan
!info - Informasi tentang bot
!about - Tentang sistem absensi
!status - Cek status koneksi bot
!ping - Cek respon bot

*Perintah Absensi:*
!masuk - Absen masuk
!pulang - Absen pulang
!izin - Pengajuan izin
!status - Cek status absensi

Ketik perintah yang diinginkan untuk menggunakannya.`,
        description: 'Menampilkan daftar perintah yang tersedia'
    },
    {
        command: '!info',
        title: 'Informasi Bot',
        response: `*ℹ️ Informasi Bot*

Bot ini adalah sistem absensi otomatis yang membantu proses absensi melalui WhatsApp.

*Cara Penggunaan:*
1. Pastikan nomor Anda terdaftar
2. Gunakan perintah yang tersedia
3. Ikuti format yang ditentukan
4. Tunggu respons dari bot

Untuk bantuan lebih lanjut, hubungi admin.`,
        description: 'Informasi tentang penggunaan bot'
    },
    {
        command: '!about',
        title: 'Tentang Sistem',
        response: `*📱 Tentang Sistem Absensi*

WA Bot Absensi v1.0
Sistem absensi digital berbasis WhatsApp

*Fitur:*
✅ Absensi masuk/pulang
✅ Pengajuan izin
✅ Notifikasi otomatis
✅ Laporan absensi

Dibuat dengan ❤️ oleh Tim Pengembang`,
        description: 'Informasi tentang sistem absensi'
    }
];

async function seedCommands() {
    try {
        // Hapus command yang ada
        await pool.query('TRUNCATE TABLE bot_commands');
        
        // Insert default commands
        for (const cmd of defaultCommands) {
            await pool.query(
                'INSERT INTO bot_commands (command, title, response, description) VALUES (?, ?, ?, ?)',
                [cmd.command, cmd.title, cmd.response, cmd.description]
            );
        }
        
        console.log('Default commands berhasil ditambahkan!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding commands:', error);
        process.exit(1);
    }
}

seedCommands();