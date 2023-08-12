import { SECRET } from '$env/static/private';
import crypto from 'crypto';
import type { Encryption } from './index.js';

export const encrypt_password = (password: string): Encryption => {
	const salt = crypto.randomBytes(16).toString('hex');
	const derivedKey = crypto.scryptSync(password, salt, 64);
	const iv = crypto.randomBytes(16); // Generate a random initialization vector
	const cipher = crypto.createCipheriv('aes-256-cbc', SECRET, iv);
	let encrypted = cipher.update(derivedKey);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { text: encrypted.toString('hex'), salt, iv: iv.toString('hex') };
};
