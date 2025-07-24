// Persistent database utility using file system for demo purposes
// In production, use a real database like PostgreSQL, MongoDB, etc.

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Student {
  id: string;
  email: string;
  fullName: string;
  schoolId: string;
  schoolName: string;
  password: string;
  course?: string;
  story?: string;
  walletId?: string;
  walletAddress?: string;
  createdAt: string;
}

interface School {
  id: string;
  email: string;
  schoolName: string;
  schoolAddress: string;
  contactPerson: string;
  password: string;
  walletId?: string;
  walletAddress?: string;
  createdAt: string;
}

interface Supporter {
  id: string;
  email: string;
  fullName: string;
  country: string;
  password: string;
  occupation?: string;
  motivation?: string;
  walletId?: string;
  walletAddress?: string;
  createdAt: string;
}

// File paths for storing data
const DATA_DIR = '/tmp/tuishare';
const STUDENTS_FILE = join(DATA_DIR, 'students.json');
const SCHOOLS_FILE = join(DATA_DIR, 'schools.json');
const SUPPORTERS_FILE = join(DATA_DIR, 'supporters.json');

// Ensure data directory exists
try {
  if (!existsSync(DATA_DIR)) {
    require('fs').mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (error) {
  console.log('Using in-memory storage as fallback');
}

// In-memory fallback storage
const memoryStorage = {
  students: new Map<string, Student>(),
  schools: new Map<string, School>(),
  supporters: new Map<string, Supporter>()
};

// Helper functions for file operations
function readData<T>(filePath: string): Map<string, T> {
  try {
    if (existsSync(filePath)) {
      const data = JSON.parse(readFileSync(filePath, 'utf8'));
      return new Map(data);
    }
  } catch (error) {
    console.error('Error reading data file:', error);
  }
  return new Map();
}

function writeData<T>(filePath: string, data: Map<string, T>): void {
  try {
    writeFileSync(filePath, JSON.stringify(Array.from(data.entries())), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error);
  }
}

// Simple password hashing (for demo only - use bcrypt in production)
function hashPassword(password: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'tuishare_salt');
  return Buffer.from(data).toString('base64');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Student operations
export const studentAPI = {
  create: (studentData: Omit<Student, 'id' | 'createdAt'>): Student => {
    const student: Student = {
      ...studentData,
      password: hashPassword(studentData.password),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    try {
      const students = readData<Student>(STUDENTS_FILE);
      students.set(student.email, student);
      writeData(STUDENTS_FILE, students);
    } catch {
      memoryStorage.students.set(student.email, student);
    }
    
    return student;
  },

  findByEmail: (email: string): Student | null => {
    try {
      const students = readData<Student>(STUDENTS_FILE);
      return students.get(email) || null;
    } catch {
      return memoryStorage.students.get(email) || null;
    }
  },

  authenticate: (email: string, password: string): Student | null => {
    const student = studentAPI.findByEmail(email);
    if (!student) return null;
    if (!verifyPassword(password, student.password)) return null;
    return student;
  },

  exists: (email: string): boolean => {
    return studentAPI.findByEmail(email) !== null;
  }
};

// School operations
export const schoolAPI = {
  create: (schoolData: Omit<School, 'id' | 'createdAt'>): School => {
    const school: School = {
      ...schoolData,
      password: hashPassword(schoolData.password),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    try {
      const schools = readData<School>(SCHOOLS_FILE);
      schools.set(school.email, school);
      writeData(SCHOOLS_FILE, schools);
    } catch {
      memoryStorage.schools.set(school.email, school);
    }
    
    return school;
  },

  findByEmail: (email: string): School | null => {
    try {
      const schools = readData<School>(SCHOOLS_FILE);
      return schools.get(email) || null;
    } catch {
      return memoryStorage.schools.get(email) || null;
    }
  },

  authenticate: (email: string, password: string): School | null => {
    const school = schoolAPI.findByEmail(email);
    if (!school) return null;
    if (!verifyPassword(password, school.password)) return null;
    return school;
  },

  exists: (email: string): boolean => {
    return schoolAPI.findByEmail(email) !== null;
  }
};

// Supporter operations
export const supporterAPI = {
  create: (supporterData: Omit<Supporter, 'id' | 'createdAt'>): Supporter => {
    const supporter: Supporter = {
      ...supporterData,
      password: hashPassword(supporterData.password),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    try {
      const supporters = readData<Supporter>(SUPPORTERS_FILE);
      supporters.set(supporter.email, supporter);
      writeData(SUPPORTERS_FILE, supporters);
    } catch {
      memoryStorage.supporters.set(supporter.email, supporter);
    }
    
    return supporter;
  },

  findByEmail: (email: string): Supporter | null => {
    try {
      const supporters = readData<Supporter>(SUPPORTERS_FILE);
      return supporters.get(email) || null;
    } catch {
      return memoryStorage.supporters.get(email) || null;
    }
  },

  authenticate: (email: string, password: string): Supporter | null => {
    const supporter = supporterAPI.findByEmail(email);
    if (!supporter) return null;
    if (!verifyPassword(password, supporter.password)) return null;
    return supporter;
  },

  exists: (email: string): boolean => {
    return supporterAPI.findByEmail(email) !== null;
  }
};

export type { Student, School, Supporter };
