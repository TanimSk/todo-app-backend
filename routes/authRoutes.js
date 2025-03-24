// auth routes
const express = require('express');
const router = express.Router();
import {
    register,
    login,
    logout,
} from '../controllers/authController';

router.get('/register', register);
router.get('/login', login);
router.get('/logout', logout);

module.exports = router;