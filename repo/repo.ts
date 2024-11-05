import Database from 'better-sqlite3';

const db = new Database('database.db');

export const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      description TEXT,
      published_date TEXT
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT
    );
    CREATE TABLE IF NOT EXISTS audio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER,
      user_id INTEGER,
      audio_file TEXT,
      FOREIGN KEY (book_id) REFERENCES books(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
};

initializeDatabase();

export const dbPromise = {
  get: (sql: string, params: any[]) => {
    try {
      return db.prepare(sql).get(params);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  run: (sql: string, params: any[]) => {
    try {
      return db.prepare(sql).run(params);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

export const saveBookDetails = async (
  title: string,
  author: string,
  publishedDate: string,
  description: string,
) => {
  return dbPromise.run(
    'INSERT INTO books (title, author, published_date, description) VALUES (?, ?, ?, ?)',
    [title, author, publishedDate, description],
  );
};
