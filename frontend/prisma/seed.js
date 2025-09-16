import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@example.com';
  const studentEmail = 'student1@example.com';

  const adminHash = await bcrypt.hash('admin1234', 10);
  const studentHash = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin User',
      email: adminEmail,
      username: 'admin',
      role: 'admin',
      passwordHash: adminHash,
    },
  });

  await prisma.user.upsert({
    where: { email: studentEmail },
    update: {},
    create: {
      name: 'Student One',
      email: studentEmail,
      username: 'student1',
      role: 'student',
      passwordHash: studentHash,
    },
  });

  console.log('Seeded admin and student users.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});