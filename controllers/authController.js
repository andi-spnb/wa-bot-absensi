const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const logger = require('../utils/logger');

exports.loginPage = (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('auth/login', { 
        title: 'Login',
        error: null 
    });
};

exports.login = async (req, res) => {
    console.log('Login attempt received');
    const { username, password } = req.body;

    try {
        console.log('Querying user:', username);
        const [users] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        console.log('Users found:', users.length);

        if (users.length === 0) {
            console.log('No user found');
            return res.render('auth/login', {
                title: 'Login',
                error: 'Invalid username or password'
            });
        }

        const match = await bcrypt.compare(password, users[0].password);
        console.log('Password match:', match);

        if (!match) {
            console.log('Password does not match');
            return res.render('auth/login', {
                title: 'Login',
                error: 'Invalid username or password'
            });
        }

        // Set session
        req.session.user = {
            id: users[0].id,
            username: users[0].username
        };
        console.log('Session created:', req.session);

        // Tunggu session tersimpan
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.render('auth/login', {
                    title: 'Login',
                    error: 'Login failed'
                });
            }
            return res.redirect('/');
        });

    } catch (error) {
        console.error('Login error:', error);
        res.render('auth/login', {
            title: 'Login',
            error: 'Login failed'
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
};
