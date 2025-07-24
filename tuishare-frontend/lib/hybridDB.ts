import { 
  studentAPI as persistentStudentAPI, 
  schoolAPI as persistentSchoolAPI,
  supporterAPI as persistentSupporterAPI
} from './persistentDB';

// Simplified hybrid system - using persistent storage as primary
export const studentAPI = persistentStudentAPI;
export const schoolAPI = persistentSchoolAPI;
export const supporterAPI = persistentSupporterAPI;
    const supabaseModule = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    supabase = supabaseModule.createClient(supabaseUrl, supabaseAnonKey);
    supabaseAdmin = supabaseModule.createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Using Supabase database');
  }
} catch (error) {
  console.log('⚠️ Supabase not available, using file system fallback');
}

// Import the persistent DB as fallback
import { 
  studentAPI as persistentStudentAPI, 
  schoolAPI as persistentSchoolAPI,
  supporterAPI as persistentSupporterAPI
} from './persistentDB';

// Keep the same interfaces for compatibility
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

// Simple password hashing (for demo only - use bcrypt in production)
function hashPassword(password: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'tuishare_salt');
  return Buffer.from(data).toString('base64');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Convert database row to interface format (for Supabase)
function convertStudentRow(row: any): Student {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    schoolId: row.school_id,
    schoolName: row.school_name,
    password: row.password,
    course: row.course,
    story: row.story,
    walletId: row.wallet_id,
    walletAddress: row.wallet_address,
    createdAt: row.created_at
  };
}

function convertSchoolRow(row: any): School {
  return {
    id: row.id,
    email: row.email,
    schoolName: row.school_name,
    schoolAddress: row.school_address,
    contactPerson: row.contact_person,
    password: row.password,
    walletId: row.wallet_id,
    walletAddress: row.wallet_address,
    createdAt: row.created_at
  };
}

function convertSupporterRow(row: any): Supporter {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    country: row.country,
    password: row.password,
    occupation: row.occupation,
    motivation: row.motivation,
    walletId: row.wallet_id,
    walletAddress: row.wallet_address,
    createdAt: row.created_at
  };
}

// Simplified hybrid system - just use persistent storage for now
export const studentAPI = persistentStudentAPI;
export const schoolAPI = persistentSchoolAPI;
export const supporterAPI = persistentSupporterAPI;

// School operations with hybrid approach
export const schoolAPI = {
  create: async (schoolData: Omit<School, 'id' | 'createdAt'>): Promise<School> => {
    if (supabaseAdmin) {
      const schoolRow = {
        email: schoolData.email,
        school_name: schoolData.schoolName,
        school_address: schoolData.schoolAddress,
        contact_person: schoolData.contactPerson,
        password: hashPassword(schoolData.password),
        wallet_id: schoolData.walletId,
        wallet_address: schoolData.walletAddress
      };

      const { data, error } = await supabaseAdmin
        .from('schools')
        .insert([schoolRow])
        .select()
        .single();

      if (error) {
        console.error('Error creating school:', error);
        throw new Error(error.message);
      }

      return convertSchoolRow(data);
    } else {
      return persistentSchoolAPI.create(schoolData);
    }
  },

  findByEmail: async (email: string): Promise<School | null> => {
    if (supabase) {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error finding school:', error);
        throw new Error(error.message);
      }

      return convertSchoolRow(data);
    } else {
      return persistentSchoolAPI.findByEmail(email);
    }
  },

  authenticate: async (email: string, password: string): Promise<School | null> => {
    if (supabase) {
      const school = await schoolAPI.findByEmail(email);
      if (!school) return null;
      if (!verifyPassword(password, school.password)) return null;
      return school;
    } else {
      return persistentSchoolAPI.authenticate(email, password);
    }
  },

  exists: async (email: string): Promise<boolean> => {
    const school = await schoolAPI.findByEmail(email);
    return school !== null;
  },

  updateWallet: async (email: string, walletId: string, walletAddress: string): Promise<void> => {
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('schools')
        .update({ wallet_id: walletId, wallet_address: walletAddress })
        .eq('email', email);

      if (error) {
        console.error('Error updating school wallet:', error);
        throw new Error(error.message);
      }
    }
  }
};

// Supporter operations with hybrid approach  
export const supporterAPI = {
  create: async (supporterData: Omit<Supporter, 'id' | 'createdAt'>): Promise<Supporter> => {
    if (supabaseAdmin) {
      const supporterRow = {
        email: supporterData.email,
        full_name: supporterData.fullName,
        country: supporterData.country,
        password: hashPassword(supporterData.password),
        occupation: supporterData.occupation,
        motivation: supporterData.motivation,
        wallet_id: supporterData.walletId,
        wallet_address: supporterData.walletAddress
      };

      const { data, error } = await supabaseAdmin
        .from('supporters')
        .insert([supporterRow])
        .select()
        .single();

      if (error) {
        console.error('Error creating supporter:', error);
        throw new Error(error.message);
      }

      return convertSupporterRow(data);
    } else {
      return persistentSupporterAPI.create(supporterData);
    }
  },

  findByEmail: async (email: string): Promise<Supporter | null> => {
    if (supabase) {
      const { data, error } = await supabase
        .from('supporters')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error finding supporter:', error);
        throw new Error(error.message);
      }

      return convertSupporterRow(data);
    } else {
      return persistentSupporterAPI.findByEmail(email);
    }
  },

  authenticate: async (email: string, password: string): Promise<Supporter | null> => {
    if (supabase) {
      const supporter = await supporterAPI.findByEmail(email);
      if (!supporter) return null;
      if (!verifyPassword(password, supporter.password)) return null;
      return supporter;
    } else {
      return persistentSupporterAPI.authenticate(email, password);
    }
  },

  exists: async (email: string): Promise<boolean> => {
    const supporter = await supporterAPI.findByEmail(email);
    return supporter !== null;
  },

  updateWallet: async (email: string, walletId: string, walletAddress: string): Promise<void> => {
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('supporters')
        .update({ wallet_id: walletId, wallet_address: walletAddress })
        .eq('email', email);

      if (error) {
        console.error('Error updating supporter wallet:', error);
        throw new Error(error.message);
      }
    }
  }
};

export type { Student, School, Supporter };
