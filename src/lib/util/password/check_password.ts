import { SECRET } from '$env/static/private';
import type { Encryption } from './index.js';
import crypto from 'crypto';

export const check_password = (password: string, encrypted: Encryption): 0 | 1 => {
	const { text, salt, iv } = encrypted;
	const encryptedBuffer = Buffer.from(text, 'hex');
	const saltBuffer = Buffer.from(salt, 'hex');
	const ivBuffer = Buffer.from(iv, 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET, ivBuffer);
	let decrypted = decipher.update(encryptedBuffer);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	const derivedKey = crypto.scryptSync(password, saltBuffer, 64);
	if (crypto.timingSafeEqual(decrypted, derivedKey)) return 1;
	return 0;
};
