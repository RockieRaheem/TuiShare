export interface Student {
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

export interface School {
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

export interface Supporter {
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
