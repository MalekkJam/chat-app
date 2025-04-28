-- Step 1: Drop the existing User table
DROP TABLE IF EXISTS User;

-- Step 2: Recreate the User table with the joined_at column
CREATE TABLE User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);