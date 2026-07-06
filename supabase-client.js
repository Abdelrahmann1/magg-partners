/* ── Supabase client + projects data access ──────────────
   Loaded via CDN (window.supabase) before this file on every
   page that needs project data or dashboard auth. */
const SUPABASE_URL = 'https://kxuvoslscmkhcuoonzzg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dXZvc2xzY21raGN1b29uenpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzc5OTYsImV4cCI6MjA5ODkxMzk5Nn0.QkkhawnBJtnaI0qzKSSHBc9CEQqrDv61VR0vQQfxj_Q';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchProjectsFromDB(){
  const { data, error } = await supabaseClient.from('projects').select('data');
  if (error){
    console.error('Failed to load projects from Supabase:', error.message);
    return [];
  }
  return data
    .map(row => row.data)
    .sort((a, b) => (parseInt(a.num, 10) || 9999) - (parseInt(b.num, 10) || 9999));
}

async function upsertProjectToDB(project){
  const { error } = await supabaseClient.from('projects').upsert({ id: project.id, data: project });
  if (error) throw error;
}

async function deleteProjectFromDB(id){
  const { error } = await supabaseClient.from('projects').delete().eq('id', id);
  if (error) throw error;
}
