const templates = {
    keterlambatan: (nama, waktu) => {
        return `*NOTIFIKASI KETERLAMBATAN*\n\n` +
               `Siswa: ${nama}\n` +
               `Waktu: ${waktu}\n\n` +
               `Mohon perhatian Bapak/Ibu untuk kedisiplinan waktu.`;
    },
    
    ketidakhadiran: (nama, tanggal) => {
        return `*NOTIFIKASI KETIDAKHADIRAN*\n\n` +
               `Siswa: ${nama}\n` +
               `Tanggal: ${tanggal}\n\n` +
               `Mohon informasi terkait ketidakhadiran putra/putri Bapak/Ibu.`;
    }
};

module.exports = templates;