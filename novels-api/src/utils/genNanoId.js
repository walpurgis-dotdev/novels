import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdef";

export const genNanoId = customAlphabet(alphabet, 6);
