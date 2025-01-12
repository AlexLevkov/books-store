CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL
);

-- Insert sample book data
INSERT INTO books (title, author, price, quantity)
VALUES 
  ('The Great Gatsby', 'F. Scott Fitzgerald', 10.99, 5),
  ('To Kill a Mockingbird', 'Harper Lee', 8.99, 10),
  ('1984', 'George Orwell', 9.99, 7),
  ('Pride and Prejudice', 'Jane Austen', 7.99, 12),
  ('The Catcher in the Rye', 'J.D. Salinger', 6.99, 8),
  ('Moby Dick', 'Herman Melville', 11.99, 3),
  ('War and Peace', 'Leo Tolstoy', 12.99, 4),
  ('The Odyssey', 'Homer', 9.49, 6),
  ('Ulysses', 'James Joyce', 13.99, 2),
  ('Crime and Punishment', 'Fyodor Dostoevsky', 10.49, 5),
  ('The Lord of the Rings', 'J.R.R. Tolkien', 15.99, 9),
  ('Jane Eyre', 'Charlotte Brontë', 7.49, 11),
  ('Brave New World', 'Aldous Huxley', 9.29, 7),
  ('The Hobbit', 'J.R.R. Tolkien', 8.99, 10),
  ('Fahrenheit 451', 'Ray Bradbury', 7.99, 8),
  ('Animal Farm', 'George Orwell', 6.99, 14),
  ('The Divine Comedy', 'Dante Alighieri', 14.99, 3),
  ('Wuthering Heights', 'Emily Brontë', 8.49, 6),
  ('Les Misérables', 'Victor Hugo', 13.49, 4),
  ('The Brothers Karamazov', 'Fyodor Dostoevsky', 12.99, 5),
  ('Madame Bovary', 'Gustave Flaubert', 9.99, 7),
  ('The Iliad', 'Homer', 9.99, 6),
  ('Great Expectations', 'Charles Dickens', 7.99, 10),
  ('Don Quixote', 'Miguel de Cervantes', 11.99, 2),
  ('Anna Karenina', 'Leo Tolstoy', 12.49, 4),
  ('The Grapes of Wrath', 'John Steinbeck', 8.99, 9),
  ('Heart of Darkness', 'Joseph Conrad', 6.99, 13),
  ('Catch-22', 'Joseph Heller', 10.99, 5),
  ('One Hundred Years of Solitude', 'Gabriel García Márquez', 11.49, 3),
  ('The Picture of Dorian Gray', 'Oscar Wilde', 7.49, 8),
  ('Slaughterhouse-Five', 'Kurt Vonnegut', 9.49, 7),
  ('The Sound and the Fury', 'William Faulkner', 10.29, 4),
  ('The Old Man and the Sea', 'Ernest Hemingway', 6.99, 12),
  ('A Tale of Two Cities', 'Charles Dickens', 8.99, 10),
  ('Frankenstein', 'Mary Shelley', 7.99, 15),
  ('Dracula', 'Bram Stoker', 8.49, 9),
  ('The Count of Monte Cristo', 'Alexandre Dumas', 12.99, 3),
  ('The Stranger', 'Albert Camus', 9.29, 6),
  ('Rebecca', 'Daphne du Maurier', 8.99, 11),
  ('The Trial', 'Franz Kafka', 10.99, 5),
  ('Lolita', 'Vladimir Nabokov', 11.49, 4),
  ('The Sun Also Rises', 'Ernest Hemingway', 7.99, 8),
  ('Beloved', 'Toni Morrison', 9.99, 7),
  ('Invisible Man', 'Ralph Ellison', 8.49, 10),
  ('On the Road', 'Jack Kerouac', 7.49, 12),
  ('The Metamorphosis', 'Franz Kafka', 6.99, 14),
  ('The Kite Runner', 'Khaled Hosseini', 10.99, 6),
  ('Life of Pi', 'Yann Martel', 9.99, 8),
  ('The Alchemist', 'Paulo Coelho', 8.99, 10),
  ('The Secret Garden', 'Frances Hodgson Burnett', 6.99, 15),
  ('Gulliver Travels', 'Jonathan Swift', 7.99, 12),
  ('Middlemarch', 'George Eliot', 9.99, 7),
  ('Sense and Sensibility', 'Jane Austen', 7.49, 10),
  ('A Farewell to Arms', 'Ernest Hemingway', 8.99, 8),
  ('The Scarlet Letter', 'Nathaniel Hawthorne', 7.99, 11),
  ('Mansfield Park', 'Jane Austen', 6.99, 13),
  ('The Call of the Wild', 'Jack London', 5.99, 14),
  ('Robinson Crusoe', 'Daniel Defoe', 8.49, 9),
  ('Oliver Twist', 'Charles Dickens', 7.99, 10),
  ('The Jungle Book', 'Rudyard Kipling', 6.49, 12),
  ('Dr. Jekyll and Mr. Hyde', 'Robert Louis Stevenson', 6.99, 11),
  ('The Time Machine', 'H.G. Wells', 5.99, 13),
  ('The War of the Worlds', 'H.G. Wells', 7.49, 8),
  ('Treasure Island', 'Robert Louis Stevenson', 6.99, 14),
  ('A Christmas Carol', 'Charles Dickens', 5.99, 15),
  ('Around the World in Eighty Days', 'Jules Verne', 7.99, 9),
  ('Twenty Thousand Leagues Under the Sea', 'Jules Verne', 8.49, 7),
  ('Journey to the Center of the Earth', 'Jules Verne', 7.99, 10),
  ('The Hunchback of Notre-Dame', 'Victor Hugo', 9.99, 5),
  ('The Three Musketeers', 'Alexandre Dumas', 8.99, 8),
  ('The Prince', 'Niccolò Machiavelli', 6.99, 11),
  ('Thus Spoke Zarathustra', 'Friedrich Nietzsche', 9.49, 6),
  ('The Republic', 'Plato', 10.99, 5),
  ('Meditations', 'Marcus Aurelius', 8.99, 9),
  ('The Art of War', 'Sun Tzu', 7.99, 12),
  ('The Book Thief', 'Markus Zusak', 9.99, 7),
  ('The Fault in Our Stars', 'John Green', 8.99, 10),
  ('Gone Girl', 'Gillian Flynn', 9.49, 8),
  ('The Road', 'Cormac McCarthy', 8.99, 11),
  ('The Girl with the Dragon Tattoo', 'Stieg Larsson', 10.99, 6),
  ('The Hunger Games', 'Suzanne Collins', 8.49, 12),
  ('Harry Potter and the Sorcerer Stone', 'J.K. Rowling', 10.99, 15),
  ('Twilight', 'Stephenie Meyer', 9.99, 8),
  ('The Da Vinci Code', 'Dan Brown', 8.99, 11),
  ('Memoirs of a Geisha', 'Arthur Golden', 7.99, 10),
  ('The Hitchhiker Guide to the Galaxy', 'Douglas Adams', 8.49, 9),
  ('Dune', 'Frank Herbert', 9.99, 7),
  ('Ender Game', 'Orson Scott Card', 7.99, 12),
  ('The Shining', 'Stephen King', 9.49, 6),
  ('It', 'Stephen King', 11.99, 5),
  ('American Gods', 'Neil Gaiman', 10.99, 8),
  ('The Handmaid Tale', 'Margaret Atwood', 9.99, 9),
  ('The Bell Jar', 'Sylvia Plath', 8.49, 7),
  ('The Goldfinch', 'Donna Tartt', 12.99, 4),
  ('Infinite Jest', 'David Foster Wallace', 13.99, 2),
  ('The Wind-Up Bird Chronicle', 'Haruki Murakami', 11.49, 5),
  ('The God of Small Things', 'Arundhati Roy', 9.99, 6),
  ('White Teeth', 'Zadie Smith', 8.99, 7),
  ('Atonement', 'Ian McEwan', 9.49, 8),
  ('Cloud Atlas', 'David Mitchell', 10.99, 5),
  ('The Shadow of the Wind', 'Carlos Ruiz Zafón', 9.99, 7),
  ('The Curious Incident of the Dog in the Night-Time', 'Mark Haddon', 7.99, 10),
  ('The Road Less Traveled', 'M. Scott Peck', 8.49, 9),
  ('Thinking, Fast and Slow', 'Daniel Kahneman', 12.99, 6),
  ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 14.99, 5),
  ('Educated', 'Tara Westover', 11.99, 7),
  ('Becoming', 'Michelle Obama', 16.99, 4),
  ('The Power of Habit', 'Charles Duhigg', 10.99, 8),
  ('Grit', 'Angela Duckworth', 9.99, 9),
  ('Atomic Habits', 'James Clear', 11.49, 10),
  ('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 12.99, 5),
  ('Normal People', 'Sally Rooney', 9.99, 8),
  ('Where the Crawdads Sing', 'Delia Owens', 14.99, 6),
  ('Circe', 'Madeline Miller', 13.99, 5),
  ('The Silent Patient', 'Alex Michaelides', 12.99, 7),
  ('Educated', 'Tara Westover', 11.99, 9);

