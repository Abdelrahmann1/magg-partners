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

const PROJECT_IMAGES_BUCKET = 'project-images';

async function uploadProjectImage(file){
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
  const { error } = await supabaseClient.storage.from(PROJECT_IMAGES_BUCKET).upload(path, file);
  if (error) throw error;
  const { data } = supabaseClient.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function deleteProjectImage(url){
  const marker = `/storage/v1/object/public/${PROJECT_IMAGES_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return; // not a file we host — nothing to clean up
  const path = url.slice(idx + marker.length);
  await supabaseClient.storage.from(PROJECT_IMAGES_BUCKET).remove([path]);
}

async function submitInquiry(payload){
  const { error } = await supabaseClient.from('inquiries').insert(payload);
  if (error) throw error;
}

async function fetchInquiries(){
  const { data, error } = await supabaseClient
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error){
    console.error('Failed to load inquiries from Supabase:', error.message);
    return [];
  }
  return data;
}

async function updateInquiryStatus(id, status){
  const { error } = await supabaseClient.from('inquiries').update({ status }).eq('id', id);
  if (error) throw error;
}

async function deleteInquiry(id){
  const { error } = await supabaseClient.from('inquiries').delete().eq('id', id);
  if (error) throw error;
}

async function fetchJobsFromDB(){
  const { data, error } = await supabaseClient.from('jobs').select('data');
  if (error){
    console.error('Failed to load jobs from Supabase:', error.message);
    return [];
  }
  return data.map(row => row.data);
}

async function upsertJobToDB(job){
  const { error } = await supabaseClient.from('jobs').upsert({ id: job.id, data: job });
  if (error) throw error;
}

async function deleteJobFromDB(id){
  const { error } = await supabaseClient.from('jobs').delete().eq('id', id);
  if (error) throw error;
}
