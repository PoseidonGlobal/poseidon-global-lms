import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPasswordHash = await bcrypt.hash('admin1234', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      username: 'admin',
      passwordHash: adminPasswordHash,
      role: 'admin',
    },
  });

  // Create student user
  const studentPasswordHash = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'student1@example.com' },
    update: {},
    create: {
      email: 'student1@example.com',
      name: 'Student One',
      username: 'student1',
      passwordHash: studentPasswordHash,
      role: 'student',
    },
  });

  console.log('Seed complete: admin@example.com / admin1234 and student1@example.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
