// Server-side database utility for TuiShare API routes
// Uses in-memory storage for demo purposes (resets on server restart)
// In production, use a real database like PostgreSQL, MongoDB, etc.

interface Student {
  id: string;
  email: string;
  fullName: string;
  schoolId: string;
  schoolName: string;
  password: string;
  course?: string;
  story?: string;
  createdAt: string;
}

interface School {
  id: string;
  email: string;
  schoolName: string;
  schoolAddress: string;
  contactPerson: string;
  password: string;
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
  createdAt: string;
}

// In-memory storage (will reset on server restart)
const storage = {
  students: new Map<string, Student>(),
  schools: new Map<string, School>(),
  supporters: new Map<string, Supporter>()
};

// Simple password hashing (for demo only - use bcrypt in production)
function hashPassword(password: string): string {
  // This is NOT secure - use bcrypt or similar in production
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
    storage.students.set(student.email, student);
    return student;
  },

  findByEmail: (email: string): Student | null => {
    return storage.students.get(email) || null;
  },

  authenticate: (email: string, password: string): Student | null => {
    const student = storage.students.get(email);
    if (!student) return null;
    if (!verifyPassword(password, student.password)) return null;
    return student;
  },

  exists: (email: string): boolean => {
    return storage.students.has(email);
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
    storage.schools.set(school.email, school);
    return school;
  },

  findByEmail: (email: string): School | null => {
    return storage.schools.get(email) || null;
  },

  authenticate: (email: string, password: string): School | null => {
    const school = storage.schools.get(email);
    if (!school) return null;
    if (!verifyPassword(password, school.password)) return null;
    return school;
  },

  exists: (email: string): boolean => {
    return storage.schools.has(email);
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
    storage.supporters.set(supporter.email, supporter);
    return supporter;
  },

  findByEmail: (email: string): Supporter | null => {
    return storage.supporters.get(email) || null;
  },

  authenticate: (email: string, password: string): Supporter | null => {
    const supporter = storage.supporters.get(email);
    if (!supporter) return null;
    if (!verifyPassword(password, supporter.password)) return null;
    return supporter;
  },

  exists: (email: string): boolean => {
    return storage.supporters.has(email);
  }
};

export type { Student, School, Supporter };
