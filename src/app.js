import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/index.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test database connection
app.get('/api/db-test', async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ message: 'Database connected successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Simple GET route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Portfolio API!', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running!' });
});

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});