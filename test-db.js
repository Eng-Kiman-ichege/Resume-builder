const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('cover_letters').select('*').limit(1);
  console.log("Cover letters table:", error ? error.message : "Exists!");
  
  const { data: resData, error: resError } = await supabase.from('resumes').select('*').limit(1);
  console.log("Resumes table columns:", resData && resData[0] ? Object.keys(resData[0]) : "Empty");
}
test();
