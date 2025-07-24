// Database utility for TuiShare
// Uses localStorage for persistence in browser environment

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

class TuiShareDB {
  private getKey(type: 'students' | 'schools' | 'supporters'): string {
    return `tuishare_${type}`;
  }

  // Simple password hashing (for demo only - use bcrypt in production)
  private hashPassword(password: string): string {
    // This is NOT secure - use bcrypt or similar in production
    return btoa(password + 'tuishare_salt');
  }

  private verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }

  // Generic CRUD operations
  private getAll<T>(type: 'students' | 'schools' | 'supporters'): T[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.getKey(type));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private save<T>(type: 'students' | 'schools' | 'supporters', data: T[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.getKey(type), JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  private findByEmail<T extends { email: string }>(
    type: 'students' | 'schools' | 'supporters',
    email: string
  ): T | null {
    const items = this.getAll<T>(type);
    return items.find(item => item.email === email) || null;
  }

  // Student operations
  createStudent(studentData: Omit<Student, 'id' | 'createdAt'>): Student {
    const students = this.getAll<Student>('students');
    const newStudent: Student = {
      ...studentData,
      password: this.hashPassword(studentData.password),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    students.push(newStudent);
    this.save('students', students);
    return newStudent;
  }

  findStudentByEmail(email: string): Student | null {
    return this.findByEmail<Student>('students', email);
  }

  authenticateStudent(email: string, password: string): Student | null {
    const student = this.findStudentByEmail(email);
    if (!student) return null;
    if (!this.verifyPassword(password, student.password)) return null;
    return student;
  }

  getAllStudents(): Student[] {
    return this.getAll<Student>('students');
  }

  // School operations
  createSchool(schoolData: Omit<School, 'id' | 'createdAt'>): School {
    const schools = this.getAll<School>('schools');
    const newSchool: School = {
      ...schoolData,
      password: this.hashPassword(schoolData.password),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    schools.push(newSchool);
    this.save('schools', schools);
    return newSchool;
  }

  findSchoolByEmail(email: string): School | null {
    return this.findByEmail<School>('schools', email);
  }

  authenticateSchool(email: string, password: string): School | null {
    const school = this.findSchoolByEmail(email);
    if (!school) return null;
    if (!this.verifyPassword(password, school.password)) return null;
    return school;
  }

  getAllSchools(): School[] {
    return this.getAll<School>('schools');
  }

  // Supporter operations
  createSupporter(supporterData: Omit<Supporter, 'id' | 'createdAt'>): Supporter {
    const supporters = this.getAll<Supporter>('supporters');
    const newSupporter: Supporter = {
      ...supporterData,
      password: this.hashPassword(supporterData.password),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    supporters.push(newSupporter);
    this.save('supporters', supporters);
    return newSupporter;
  }

  findSupporterByEmail(email: string): Supporter | null {
    return this.findByEmail<Supporter>('supporters', email);
  }

  authenticateSupporter(email: string, password: string): Supporter | null {
    const supporter = this.findSupporterByEmail(email);
    if (!supporter) return null;
    if (!this.verifyPassword(password, supporter.password)) return null;
    return supporter;
  }

  getAllSupporters(): Supporter[] {
    return this.getAll<Supporter>('supporters');
  }

  // Statistics
  getStats() {
    return {
      students: this.getAllStudents().length,
      schools: this.getAllSchools().length,
      supporters: this.getAllSupporters().length,
      totalFunding: this.getAllSupporters().length * 1500 // Mock calculation
    };
  }

  // Clear all data (for testing)
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.getKey('students'));
    localStorage.removeItem(this.getKey('schools'));
    localStorage.removeItem(this.getKey('supporters'));
  }
}

export const db = new TuiShareDB();
export type { Student, School, Supporter };
