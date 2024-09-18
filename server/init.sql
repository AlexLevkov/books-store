CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL
);

-- Insert sample book data
INSERT INTO books (title, author, price, quantity) VALUES 
('Harry Potter', 'J.K. Rowling', 20.5, 3),
('The Hobbit', 'J.R.R. Tolkien', 15.99, 5),
('1984', 'George Orwell', 13.45, 4),
('To Kill a Mockingbird', 'Harper Lee', 12.99, 7),
('The Catcher in the Rye', 'J.D. Salinger', 10.5, 2),
('Pride and Prejudice', 'Jane Austen', 9.99, 6),
('Moby Dick', 'Herman Melville', 17.5, 4),
('War and Peace', 'Leo Tolstoy', 22.75, 3),
('The Great Gatsby', 'F. Scott Fitzgerald', 14.0, 5),
('The Lord of the Rings', 'J.R.R. Tolkien', 25.99, 8);
