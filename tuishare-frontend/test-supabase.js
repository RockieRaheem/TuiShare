import { supabase } from '../lib/supabase';

async function testSupabaseConnection() {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('students').select('count');
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log('📊 Database is ready for use');
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}

// Run the test
testSupabaseConnection();
