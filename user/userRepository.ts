import { dbPromise } from '../repo/repo';

export const findUserByEmail = async (email: string) => {
  return dbPromise.get('SELECT * FROM users WHERE email = ?', [email]);
};

export const createUser = async (name: string, email: string, password: string) => {
  return dbPromise.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
};
