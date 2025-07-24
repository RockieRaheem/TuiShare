-- TuiShare Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create students table
CREATE TABLE students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    school_id VARCHAR(255),
    school_name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    course VARCHAR(255),
    story TEXT,
    wallet_id VARCHAR(255),
    wallet_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schools table
CREATE TABLE schools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    school_address TEXT NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    wallet_id VARCHAR(255),
    wallet_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create supporters table
CREATE TABLE supporters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    occupation VARCHAR(255),
    motivation TEXT,
    wallet_id VARCHAR(255),
    wallet_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table for payment tracking
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    from_user_id UUID,
    to_user_id UUID,
    amount DECIMAL(20, 8) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'BTC',
    transaction_type VARCHAR(50) NOT NULL, -- 'bitcoin', 'mobile_money', 'wallet_transfer'
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    description TEXT,
    bitnob_tx_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_schools_email ON schools(email);
CREATE INDEX idx_supporters_email ON supporters(email);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Students can only see their own data
CREATE POLICY "Students can view own data" ON students
    FOR ALL USING (auth.jwt() ->> 'email' = email);

-- Schools can only see their own data
CREATE POLICY "Schools can view own data" ON schools
    FOR ALL USING (auth.jwt() ->> 'email' = email);

-- Supporters can only see their own data
CREATE POLICY "Supporters can view own data" ON supporters
    FOR ALL USING (auth.jwt() ->> 'email' = email);

-- Transactions can be viewed by involved parties
CREATE POLICY "Users can view related transactions" ON transactions
    FOR SELECT USING (
        auth.jwt() ->> 'sub' IN (
            SELECT id::text FROM students WHERE id = from_user_id OR id = to_user_id
            UNION
            SELECT id::text FROM schools WHERE id = from_user_id OR id = to_user_id
            UNION
            SELECT id::text FROM supporters WHERE id = from_user_id OR id = to_user_id
        )
    );

-- Allow service role to bypass RLS for API operations
CREATE POLICY "Service role bypass" ON students FOR ALL TO service_role USING (true);
CREATE POLICY "Service role bypass" ON schools FOR ALL TO service_role USING (true);
CREATE POLICY "Service role bypass" ON supporters FOR ALL TO service_role USING (true);
CREATE POLICY "Service role bypass" ON transactions FOR ALL TO service_role USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for transactions table
CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON transactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
