const SUPABASE_URL = 'https://llgcliefipivxvdghigq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZ2NsaWVmaXBpdnh2ZGdoaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMDcxMDAsImV4cCI6MjA4ODg4MzEwMH0.jz2UUpQsCbSjy2-oytq2cneezU5gANJeqKgy-V7Yhgk';

const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

async function checkRoutes() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/routes?select=*`, { headers: HEADERS });
  return res.status;
}

async function seedRoutes() {
  const routes = [
    { key: 'ekenwan', name: 'Ekenwan Road', to_fro: 50000, to_only: 30000, fro_only: 30000, status: 'Active' },
    { key: 'sapele', name: 'Sapele Road', to_fro: 50000, to_only: 30000, fro_only: 30000, status: 'Active' },
    { key: 'siluko', name: 'Siluko', to_fro: 45000, to_only: 25000, fro_only: 25000, status: 'Active' },
    { key: 'airport', name: 'Airport Road', to_fro: 55000, to_only: 35000, fro_only: 35000, status: 'Active' },
    { key: 'uselu', name: 'Uselu - Ugbowo', to_fro: 40000, to_only: 25000, fro_only: 25000, status: 'Active' },
  ];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/routes`, {
    method: 'POST',
    headers: { ...HEADERS, 'Prefer': 'return=representation,resolution=ignore-duplicates' },
    body: JSON.stringify(routes),
  });
  console.log('Seed routes status:', res.status);
  const body = await res.text();
  console.log('Seed routes response:', body.substring(0, 500));
  return res.status;
}

async function main() {
  console.log('Checking if routes table exists...');
  const status = await checkRoutes();

  if (status === 200) {
    console.log('Tables already exist! Seeding routes...');
    await seedRoutes();
    console.log('Done!');
  } else if (status === 404) {
    console.log('\n=== TABLES NOT CREATED YET ===');
    console.log('You need to run the SQL migration manually.');
    console.log('1. Open your Supabase dashboard SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/llgcliefipivxvdghigq/sql/new');
    console.log('2. Paste the contents of setup.sql and click "Run"');
    console.log('3. Then re-run this script: node setup_db.js');
  } else {
    console.log('Unexpected status:', status);
  }
}

main();
