"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors")); // Import the CORS package
// Set up the Express app
const app = (0, express_1.default)();
const PORT = 2000;
// Configure CORS to allow requests from http://localhost:5173
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
}));
// Configure the PostgreSQL connection
const pool = new pg_1.Pool({
    user: 'book_admin',
    host: 'localhost', // or '127.0.0.1'
    database: 'books_db',
    password: 'abc', // the password you set in docker-compose
    port: 5432, // the port PostgreSQL is running on
});
// Endpoint to get all books from the database
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM books');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Error querying the database');
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running quickly on http://localhost:${PORT}`);
});
