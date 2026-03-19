const API_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3002/';

export const blogApi = {
  getAllBlogs: async () => {
    const response = await fetch(`${API_URL}api/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  },

  getBlogById: async (id) => {
    const response = await fetch(`${API_URL}api/blogs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return response.json();
  },

  getBlogBySlug: async (slug) => {
    const response = await fetch(`${API_URL}api/blogs/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return response.json();
  },

  createBlog: async (blogData) => {
    const response = await fetch(`${API_URL}api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
  },

  updateBlog: async (id, blogData) => {
    const response = await fetch(`${API_URL}api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error('Failed to update blog');
    return response.json();
  },

  updateBlogStatus: async (id, status) => {
    const response = await fetch(`${API_URL}api/blogs/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update blog status');
    return response.json();
  },

  deleteBlog: async (id) => {
    const response = await fetch(`${API_URL}api/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete blog');
    return response.json();
  },

  // Legacy API compatibility - for existing frontend that uses old endpoints
  legacy: {
    getAllBlogs: async () => {
      const response = await fetch(`${API_URL}api/getallblog`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json();
    },

    getBlogById: async (id) => {
      const response = await fetch(`${API_URL}api/getbyidblog/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      return response.json();
    },

    createBlog: async (blogData) => {
      const response = await fetch(`${API_URL}api/createblog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) throw new Error('Failed to create blog');
      return response.json();
    },

    updateBlog: async (id, blogData) => {
      const response = await fetch(`${API_URL}api/updatebyidblog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) throw new Error('Failed to update blog');
      return response.json();
    },

    updateBlogStatus: async (id, status) => {
      const response = await fetch(`${API_URL}api/updateblog-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update blog status');
      return response.json();
    },

    deleteBlog: async (id) => {
      const response = await fetch(`${API_URL}api/deletebyidblog/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      return response.json();
    },
  }
};
