const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createUser() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    const username = 'superadmin'; // Ganti dengan username yang diinginkan
    const password = 'admin123';   // Ganti dengan password yang diinginkan
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await connection.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        console.log('User created successfully:');
        console.log('Username:', username);
        console.log('Password:', password);
    } catch (error) {
        console.error('Error creating user:', error);
    }

    await connection.end();
}

createUser();