// Simple in-memory user store for development when Prisma is not available
import bcrypt from 'bcryptjs';

// Temporary in-memory storage - replace with real database
let users = [];

// Initialize with demo users if empty
async function initUsers() {
  if (users.length === 0) {
    const adminHash = await bcrypt.hash('admin1234', 10);
    const studentHash = await bcrypt.hash('password123', 10);
    
    users = [
      {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        username: 'admin',
        passwordHash: adminHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'student1@example.com',
        name: 'Student One',
        username: 'student1',
        passwordHash: studentHash,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
  }
}

const mockPrisma = {
  user: {
    async findUnique({ where }) {
      await initUsers();
      return users.find(u => 
        (where.email && u.email === where.email) ||
        (where.username && u.username === where.username)
      ) || null;
    },
    
    async create({ data, select }) {
      await initUsers();
      const newUser = {
        id: String(users.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      
      if (select) {
        const result = {};
        Object.keys(select).forEach(key => {
          if (select[key] && newUser[key] !== undefined) {
            result[key] = newUser[key];
          }
        });
        return result;
      }
      
      return newUser;
    }
  }
};

export { mockPrisma as prisma };