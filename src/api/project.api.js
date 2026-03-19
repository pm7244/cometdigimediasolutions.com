const API_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3002/';

export const projectApi = {
  getAllProjects: async () => {
    const response = await fetch(`${API_URL}api/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  getProjectById: async (id) => {
    const response = await fetch(`${API_URL}api/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },

  createProject: async (projectData) => {
    const response = await fetch(`${API_URL}api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  updateProject: async (id, projectData) => {
    const response = await fetch(`${API_URL}api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  updateProjectStatus: async (id, status) => {
    const response = await fetch(`${API_URL}api/projects/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update project status');
    return response.json();
  },

  deleteProject: async (id) => {
    const response = await fetch(`${API_URL}api/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return response.json();
  },

  // Legacy API compatibility - for existing frontend that uses old endpoints
  legacy: {
    getAllProjects: async () => {
      const response = await fetch(`${API_URL}api/getallproject`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },

    getProjectById: async (id) => {
      const response = await fetch(`${API_URL}api/getbyidproject/${id}`);
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json();
    },

    createProject: async (projectData) => {
      const response = await fetch(`${API_URL}api/createproject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error('Failed to create project');
      return response.json();
    },

    updateProject: async (id, projectData) => {
      const response = await fetch(`${API_URL}api/updateproject/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error('Failed to update project');
      return response.json();
    },

    deleteProject: async (id) => {
      const response = await fetch(`${API_URL}api/deletebtidproject/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      return response.json();
    },
  }
};
