import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';
import Filemanagermain from '../fileManager/filemanagermain';

const Blogs = () => {
  const [formData, setFormData] = useState({
    blog_name: '',
    blog_slug: '',
    short_description: '',
    long_description: '',
    display_date: '',
    author_name: '',
    type: 'blog',
    image: '',
    meta_title: '',
    meta_des: '',
    status: 1
  });

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogImages, setBlogImages] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh data when window gets focus
  useEffect(() => {
    const handleFocus = () => {
      fetchData();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Update form data image when blogImages changes
  useEffect(() => {
    if (blogImages && blogImages.length > 0) {
      setFormData(prev => ({ ...prev, image: JSON.stringify(blogImages) }));
    } else {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  }, [blogImages]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getallblog`);
      if (response.ok) {
        const result = await response.json();
        console.log("Blog data received:", result);
        setBlogs(result.data || []);
        
        // If editing, populate form with current data
        if (editingId) {
          const editItem = result.data.find(item => item.blog_id === editingId);
          if (editItem) {
            // Parse image data
            let imageData = [];
            try {
              if (editItem.image) {
                imageData = typeof editItem.image === 'string' 
                  ? JSON.parse(editItem.image) 
                  : editItem.image;
                imageData = Array.isArray(imageData) ? imageData : [imageData];
              }
            } catch (e) {
              console.error("Error parsing image data:", e);
            }
            
            setBlogImages(imageData);
            setFormData({
              blog_name: editItem.blog_name || '',
              blog_slug: editItem.blog_slug || '',
              short_description: editItem.short_description || '',
              long_description: editItem.long_description || '',
              display_date: editItem.display_date ? editItem.display_date.split('T')[0] : '',
              author_name: editItem.author_name || '',
              type: editItem.type || 'blog',
              image: editItem.image || '',
              meta_title: editItem.meta_title || '',
              meta_des: editItem.meta_des || '',
              status: editItem.status || 1
            });
          }
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error(`Failed to fetch blog data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingId 
        ? `${import.meta.env.VITE_CMS_URL}api/updatebyidblog/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/createblog`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingId ? 'Blog updated successfully!' : 'Blog created successfully!');
        handleCancel();
        await fetchData(); // Ensure data is refreshed
      } else {
        throw new Error('Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Error saving blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.blog_id);
    // Form data will be populated in fetchData when editingId changes
    fetchData();
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchData();
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidblog/${blogId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Blog deleted successfully!');
          await fetchData(); // Ensure data is refreshed
        } else {
          throw new Error('Failed to delete blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Error deleting blog');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from blog name
    if (name === 'blog_name') {
      const slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        blog_slug: slug
      }));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      blog_name: '',
      blog_slug: '',
      short_description: '',
      long_description: '',
      display_date: '',
      author_name: '',
      type: 'blog',
      image: '',
      meta_title: '',
      meta_des: '',
      status: 1
    });
    setBlogImages([]);
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Blog Management">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </StandardPageLayout>
    );
  }

  return managerOpener ? (
    <Filemanagermain
      file={blogImages}
      fileSetter={setBlogImages}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16/9}
      type="image"
    />
  ) : (
    <StandardPageLayout pageTitle="Blog Management">
      <div className="col-span-12">
        {/* Blog Form */}
        <FormSection 
          title={editingId ? "Edit Blog" : "Add New Blog"}
          onSubmit={handleSubmit}
          submitLabel={editingId ? "Update Blog" : "Create Blog"}
          isSubmitting={isSubmitting}
          showCancel={editingId}
          onCancel={handleCancel}
        >
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Blog Title"
              name="blog_name"
              value={formData.blog_name}
              onChange={handleInputChange}
              placeholder="Enter Blog Title"
              required
            />
            <InputField
              label="Blog Slug"
              name="blog_slug"
              value={formData.blog_slug}
              onChange={handleInputChange}
              placeholder="Enter URL Slug"
              required
            />
            <InputField
              label="Author Name"
              name="author_name"
              value={formData.author_name}
              onChange={handleInputChange}
              placeholder="Enter Author Name"
            />
            <InputField
              label="Display Date"
              type="date"
              name="display_date"
              value={formData.display_date}
              onChange={handleInputChange}
            />
          </div>

     

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Blog Image
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setManagerOpener(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {blogImages.length > 0 ? 'Change Image' : 'Select Image'}
              </button>
              {blogImages.length > 0 && (
                <div className="flex items-center space-x-2">
                  <img
                    src={`${import.meta.env.VITE_CMS_URL}upload/images/${blogImages[0]}`}
                    alt="Selected"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setBlogImages([])}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SEO Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">SEO Information</h3>
            <InputField
              label="Meta Title"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleInputChange}
              placeholder="Enter meta title"
            />
            <InputField
              label="Meta Description"
              type="textarea"
              name="meta_des"
              value={formData.meta_des}
              onChange={handleInputChange}
              placeholder="Enter meta description"
              rows={3}
            />
          </div>

          <StatusSelector
            value={formData.status}
            onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          />
        </FormSection>

        {/* Blog List */}
        <div className="box">
          <div className="box-header flex justify-between items-center">
            <h5 className="box-title">Existing Blogs</h5>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="box-body">
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No blogs found. Create your first blog above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Display Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.blog_id} className={editingId === blog.blog_id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2">
                        <div>
                          <div className="font-medium">{blog.blog_name}</div>
                          <div className="text-sm text-gray-500">{blog.blog_slug}</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{blog.author_name || 'Not specified'}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {blog.display_date ? new Date(blog.display_date).toLocaleDateString() : 'Not set'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          blog.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {blog.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog.blog_id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      </div>
    </StandardPageLayout>
  );
};

export default Blogs;
