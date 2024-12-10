import { supabase } from '@/lib/supabase';
import type { Project, CreateProjectData } from '@/types/project';

export async function getRecentProjects(userId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projets')
    .select(`
      id,
      user_id,
      titre,
      description,
      statut,
      types_contenus,
      sous_types_contenus,
      progression,
      date_creation,
      date_modification
    `)
    .eq('user_id', userId)
    .order('date_modification', { ascending: false });

  if (error) {
    console.error('Error fetching recent projects:', error);
    throw error;
  }

  return data.map(project => ({
    ...project,
    contentCount: project.sous_types_contenus ? 
      (project.sous_types_contenus as any[]).reduce((sum, type) => 
        sum + (type.subtype_ids?.length || 0), 0
      ) : 0,
    types_contenus: project.sous_types_contenus || []
  }));
}

export async function createProject(userId: string, data: CreateProjectData): Promise<Project> {
  console.log('Creating project with data:', { userId, data });

  const projectData = {
    user_id: userId,
    titre: data.titre,
    description: data.description,
    statut: data.statut,
    types_contenus: data.types_contenus.map(type => type.type_id),
    sous_types_contenus: data.types_contenus,
    progression: 0,
    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString()
  };

  console.log('Formatted project data:', projectData);

  const { data: project, error } = await supabase
    .from('projets')
    .insert([projectData])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  console.log('Project created successfully:', project);

  return {
    ...project,
    contentCount: project.sous_types_contenus ? 
      (project.sous_types_contenus as any[]).reduce((sum, type) => 
        sum + (type.subtype_ids?.length || 0), 0
      ) : 0,
    types_contenus: project.sous_types_contenus || []
  };
}

export async function updateProject(
  projectId: string, 
  data: Partial<CreateProjectData>
): Promise<Project> {
  const updateData: any = {
    ...data,
    date_modification: new Date().toISOString()
  };

  if (data.types_contenus) {
    updateData.types_contenus = data.types_contenus.map(type => type.type_id);
    updateData.sous_types_contenus = data.types_contenus;
  }

  console.log('Updating project with data:', updateData);

  const { data: project, error } = await supabase
    .from('projets')
    .update(updateData)
    .eq('id', projectId)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return {
    ...project,
    contentCount: project.sous_types_contenus ? 
      (project.sous_types_contenus as any[]).reduce((sum, type) => 
        sum + (type.subtype_ids?.length || 0), 0
      ) : 0,
    types_contenus: project.sous_types_contenus || []
  };
}

export async function getProjectDetails(projectId: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projets')
    .select(`
      id,
      user_id,
      titre,
      description,
      statut,
      types_contenus,
      sous_types_contenus,
      progression,
      date_creation,
      date_modification
    `)
    .eq('id', projectId)
    .single();

  if (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }

  if (!data) {
    throw new Error('Project not found');
  }

  return {
    ...data,
    contentCount: data.sous_types_contenus ? 
      (data.sous_types_contenus as any[]).reduce((sum, type) => 
        sum + (type.subtype_ids?.length || 0), 0
      ) : 0,
    types_contenus: data.sous_types_contenus || []
  };
}