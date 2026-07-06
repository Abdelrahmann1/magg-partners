/* ── Live Projects Store ──────────────────────────────────
   Every page fetches the current project list from Supabase
   via loadProjects(), which populates the global PROJECTS
   array used throughout the site. */
let PROJECTS = [];

async function loadProjects(){
  PROJECTS = await fetchProjectsFromDB();
  return PROJECTS;
}
