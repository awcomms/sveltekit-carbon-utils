export { encrypt_password } from "./encrypt_password.js";
export { check_password } from "./check_password.js";

export interface Encryption {
	iv: string;
	salt: string;
	text: string;
}