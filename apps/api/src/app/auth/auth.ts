import { compare, hash } from 'bcrypt';

const rounds = 10;

export const hashPassword = async raw => hash(raw, rounds);
export const comparePasswords = async (raw, hash) => compare(raw, hash);
