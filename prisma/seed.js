import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/index.js';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = 'Administrator';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            isAdmin: true
        }
    });

    console.log('Admin user created:', {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });