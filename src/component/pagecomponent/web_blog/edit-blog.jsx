import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Filemanagermain from "../fileManager/filemanagermain";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Helper function to strip HTML tags
const stripHTMLTags = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [values, setValues] = useState({
    blog_name: "",
    blog_slug: "",
    short_description: "",
    overview: "",
    quote: "",
    display_date: "",
    author_name: "",
    type: "",
    hero_image: "",
    list_image: "",
    meta_title: "",
    meta_des: "",
    status: 1,
    related_blog: [],
    sort_order: 0,
    blog_content: []
  });

  const [heroImages, setHeroImages] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Blog Content Management States
  const [blogContents, setBlogContents] = useState([]);
  const [showContentForm, setShowContentForm] = useState(false);
  const [editingContentId, setEditingContentId] = useState(null);
  const [contentForm, setContentForm] = useState({
    type: "",
    title: "",
    text: "",
    quote: "",
    image: "",
    video: "",
    sort_order: 0
  });
  const [contentImages, setContentImages] = useState([]);
  const [contentVideos, setContentVideos] = useState([]);
  
  // Related Blog States
  const [availableBlogs, setAvailableBlogs] = useState([]);
  const [selectedRelatedBlogs, setSelectedRelatedBlogs] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getbyidblog/${id}`);
      const result = await response.json();

      if (result.status && result.data) {
        const blogData = result.data;
        
        // Parse image arrays
        let heroImageData = [];
        let listImageData = [];
        let blogContentData = [];
        
        try {
          if (blogData.hero_image) {
            heroImageData = JSON.parse(blogData.hero_image);
          }
          if (blogData.list_image) {
            listImageData = JSON.parse(blogData.list_image);
          }
          if (blogData.blog_content) {
            blogContentData = JSON.parse(blogData.blog_content);
          }
        } catch (parseError) {
          console.warn("Error parsing JSON fields:", parseError);
        }

        setHeroImages(Array.isArray(heroImageData) ? heroImageData : []);
        setListImages(Array.isArray(listImageData) ? listImageData : []);
        setBlogContents(Array.isArray(blogContentData) ? blogContentData : []);

        // Parse JSON fields if they are strings
        let parsedRelatedBlog = [];
        if (blogData.related_blog) {
          try {
            parsedRelatedBlog = typeof blogData.related_blog === 'string' 
              ? JSON.parse(blogData.related_blog) 
              : blogData.related_blog;
          } catch (e) {
            parsedRelatedBlog = [];
          }
        }

        setValues({
          blog_name: blogData.blog_name || "",
          blog_slug: blogData.blog_slug || "",
          short_description: blogData.short_description || "",
          overview: blogData.overview || "",
          quote: blogData.quote || "",
          display_date: blogData.display_date ? blogData.display_date.split('T')[0] : "",
          author_name: blogData.author_name || "",
          type: blogData.type || "",
          hero_image: blogData.hero_image || "",
          list_image: blogData.list_image || "",
          meta_title: blogData.meta_title || "",
          meta_des: blogData.meta_des || "",
          status: blogData.status || 1,
          related_blog: parsedRelatedBlog,
          sort_order: blogData.sort_order || 0,
          blog_content: blogData.blog_content || []
        });
      } else {
        toast.error("Failed to fetch blog data");
        navigate("/cms/pages/web_blog/");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred while fetching blog data");
      navigate("/cms/pages/web_blog/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  // Update values when images change
  useEffect(() => {
    if (heroImages && heroImages.length > 0) {
      setValues(prev => ({ ...prev, hero_image: JSON.stringify(heroImages) }));
    } else {
      setValues(prev => ({ ...prev, hero_image: "" }));
    }
  }, [heroImages]);

  useEffect(() => {
    if (listImages && listImages.length > 0) {
      setValues(prev => ({ ...prev, list_image: JSON.stringify(listImages) }));
    } else {
      setValues(prev => ({ ...prev, list_image: "" }));
    }
  }, [listImages]);

  useEffect(() => {
    if (contentImages && contentImages.length > 0) {
      setContentForm(prev => ({ ...prev, image: JSON.stringify(contentImages) }));
    } else {
      setContentForm(prev => ({ ...prev, image: "" }));
    }
  }, [contentImages]);

  useEffect(() => {
    if (contentVideos && contentVideos.length > 0) {
      setContentForm(prev => ({ ...prev, video: JSON.stringify(contentVideos) }));
    } else {
      setContentForm(prev => ({ ...prev, video: "" }));
    }
  }, [contentVideos]);

  // Fetch available blogs for related blog selection
  const fetchAvailableBlogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getallblog?all=true`);
      const result = await response.json();
      if (result.status && result.data) {
        // Filter out current blog from available blogs
        const otherBlogs = result.data.filter(blog => blog.blog_id.toString() !== id);
        setAvailableBlogs(otherBlogs);
      }
    } catch (error) {
      console.error("Error fetching available blogs:", error);
    }
  };

  useEffect(() => {
    fetchAvailableBlogs();
  }, [id]);

  useEffect(() => {
    if (values.related_blog && Array.isArray(values.related_blog)) {
      setSelectedRelatedBlogs(values.related_blog);
    }
  }, [values.related_blog]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (data, fieldName) => {
    setValues(prev => ({ ...prev, [fieldName]: data }));
  };

  const removeImage = (imageType, index) => {
    if (imageType === 'hero') {
      const newImages = heroImages.filter((_, i) => i !== index);
      setHeroImages(newImages);
    } else if (imageType === 'list') {
      const newImages = listImages.filter((_, i) => i !== index);
      setListImages(newImages);
    }
  };

  const removeContentImage = (index) => {
    const newImages = contentImages.filter((_, i) => i !== index);
    setContentImages(newImages);
  };

  const removeContentVideo = (index) => {
    const newVideos = contentVideos.filter((_, i) => i !== index);
    setContentVideos(newVideos);
  };

  // Blog Content Management Functions
  const handleAddContentClick = () => {
    resetContentForm();
    setShowContentForm(true);
  };

  const resetContentForm = () => {
    setContentForm({
      type: "",
      title: "",
      text: "",
      quote: "",
      image: "",
      video: "",
      sort_order: blogContents.length
    });
    setContentImages([]);
    setContentVideos([]);
    setEditingContentId(null);
  };

  const handleContentFormChange = (e) => {
    const { name, value } = e.target;
    setContentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContentEditorChange = (data, fieldName) => {
    setContentForm(prev => ({ ...prev, [fieldName]: data }));
  };

  const handleContentSubmit = () => {
    // Validation
    if (!contentForm.type) {
      toast.error("Please select content type");
      return;
    }

    if (contentForm.type === "text" && (!contentForm.title || !contentForm.text)) {
      toast.error("Title and text are required for text content");
      return;
    }

    if (contentForm.type === "quote" && !contentForm.quote) {
      toast.error("Quote text is required");
      return;
    }

    if (contentForm.type === "image" && contentImages.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    if (contentForm.type === "video" && contentVideos.length === 0) {
      toast.error("Please select at least one video");
      return;
    }

    const newContent = {
      id: editingContentId || Date.now(),
      ...contentForm,
      image: contentForm.type === "image" ? JSON.stringify(contentImages) : "",
      video: contentForm.type === "video" ? JSON.stringify(contentVideos) : contentForm.video,
      created_at: new Date().toISOString()
    };

    if (editingContentId) {
      setBlogContents(prev => prev.map(content => 
        content.id === editingContentId ? newContent : content
      ));
      toast.success("Content updated successfully");
    } else {
      setBlogContents(prev => [...prev, newContent]);
      toast.success("Content added successfully");
    }

    setShowContentForm(false);
    resetContentForm();
  };

  const handleEditContent = (content) => {
    setContentForm({
      type: content.type,
      title: content.title || "",
      text: content.text || "",
      quote: content.quote || "",
      image: content.image || "",
      video: content.video || "",
      sort_order: content.sort_order || 0
    });

    // Parse and set images if available
    if (content.image) {
      try {
        const images = JSON.parse(content.image);
        setContentImages(Array.isArray(images) ? images : []);
      } catch (e) {
        setContentImages([]);
      }
    }

    // Parse and set videos if available
    if (content.video) {
      try {
        const videos = JSON.parse(content.video);
        if (Array.isArray(videos)) {
          setContentVideos(videos);
        } else {
          // Handle old URL format
          setContentVideos([]);
        }
      } catch (e) {
        setContentVideos([]);
      }
    }

    setEditingContentId(content.id);
    setShowContentForm(true);
  };

  const handleDeleteContent = (contentId) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      setBlogContents(prev => prev.filter(content => content.id !== contentId));
      toast.success("Content deleted successfully");
    }
  };

  const handleCancelContentForm = () => {
    setShowContentForm(false);
    resetContentForm();
  };

  const handleSubmit = async () => {
    // Validation
    if (!values.blog_name.trim()) {
      toast.error("Blog name is required");
      return;
    }

    if (!values.blog_slug.trim()) {
      toast.error("Blog slug is required");
      return;
    }

    // Format blog_content to match API expectations
    const formattedBlogContent = blogContents.map(content => ({
      text: content.text || "",
      quote: content.quote || "",
      image: content.image ? (typeof content.image === 'string' ? JSON.parse(content.image) : content.image) : [],
      video: content.video ? (
        typeof content.video === 'string' && content.video.startsWith('http') 
          ? [content.video]  // Old URL format
          : (typeof content.video === 'string' ? JSON.parse(content.video) : content.video)  // New file format
      ) : [],
      status: 1
    }));

    // Prepare payload with blog contents and related blogs
    const payload = {
      ...values,
      related_blog: selectedRelatedBlogs,
      blog_content: formattedBlogContent
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidblog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status) {
        toast.success("Blog content updated successfully");
        navigate("/cms/pages/web_blog/");
      } else {
        toast.error(result.message || "Failed to update blog content");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating blog content");
    }
  };

  const handleCancel = () => {
    navigate("/cms/pages/web_blog/");
  };

  if (loading) {
    return (
      <div>
        <PageHeader currentpage="Edit Blog" activepage="Pages" mainpage="Web Blog" />
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading blog data...</span>
        </div>
      </div>
    );
  }

  return managerOpener === 1 ? (
    <Filemanagermain
      file={heroImages}
      fileSetter={setHeroImages}
      openSetter={setManagerOpener}
      ratio={16/9}
      type="image"
      maxFiles={5}
    />
  ) : managerOpener === 2 ? (
    <Filemanagermain
      file={listImages}
      fileSetter={setListImages}
      openSetter={setManagerOpener}
      ratio={4/3}
      type="image"
      maxFiles={5}
    />
  ) : managerOpener === 3 ? (
    <Filemanagermain
      file={contentImages}
      fileSetter={setContentImages}
      openSetter={setManagerOpener}
      ratio={[16/9, 4/3, 1/1]}
      type="image"
      maxFiles={10}
    />
  ) : managerOpener === 4 ? (
    <Filemanagermain
      file={contentVideos}
      fileSetter={setContentVideos}
      openSetter={setManagerOpener}
      type="video"
      maxFiles={5}
    />
  ) : (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/cms/pages/web_blog')}
          className="flex items-center gap-2 mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </button>
      </div>
      <PageHeader currentpage="Edit Blog" activepage="Pages" mainpage="Web Blog" />
      
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-12 xxl:col-span-6">
          {/* Basic Information */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Information</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Blog Name */}
              <div>
                <label className="ti-form-label">Blog Name *</label>
                <input
                  type="text"
                  name="blog_name"
                  value={values.blog_name}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter blog name"
                  required
                />
              </div>

              {/* Blog Slug */}
              <div>
                <label className="ti-form-label">Blog Slug *</label>
                <input
                  type="text"
                  name="blog_slug"
                  value={values.blog_slug}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter blog slug"
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="ti-form-label">Short Description</label>
                <textarea
                  name="short_description"
                  value={values.short_description}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter short description"
                  rows="3"
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="ti-form-label">Author Name</label>
                <input
                  type="text"
                  name="author_name"
                  value={values.author_name}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter author name"
                />
              </div>

              {/* Type */}
              <div>
                <label className="ti-form-label">Type/Category</label>
                <input
                  type="text"
                  name="type"
                  value={values.type}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter blog type or category"
                />
              </div>

              {/* Display Date */}
              <div>
                <label className="ti-form-label">Display Date</label>
                <input
                  type="date"
                  name="display_date"
                  value={values.display_date}
                  onChange={handleInputChange}
                  className="ti-form-input"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="ti-form-label">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={values.sort_order}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter sort order (0 for default)"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Overview</h5>
            </div>
            <div className="box-body">
              <CKEditor
                editor={ClassicEditor}
                data={values.overview}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleEditorChange(data, 'overview');
                }}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'blockQuote', 'undo', 'redo']
                }}
              />
            </div>
          </div>


         <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Related Blogs</h5>
            </div>
            <div className="box-body">
              <div className="space-y-4">
                <label className="ti-form-label">Select Related Blogs (Optional)</label>
                {availableBlogs.length > 0 ? (
                  <div className="space-y-2">
                    {availableBlogs.map((blog) => (
                      <div key={blog.blog_id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`blog-${blog.blog_id}`}
                          checked={selectedRelatedBlogs.includes(blog.blog_id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRelatedBlogs(prev => [...prev, blog.blog_id]);
                            } else {
                              setSelectedRelatedBlogs(prev => prev.filter(id => id !== blog.blog_id));
                            }
                          }}
                          className="ti-form-checkbox"
                        />
                        <label htmlFor={`blog-${blog.blog_id}`} className="cursor-pointer">
                          <span className="font-medium">{blog.blog_name}</span>
                          <span className="text-gray-500 ml-2">(ID: {blog.blog_id})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No other blogs available for selection.</p>
                )}
                
                {selectedRelatedBlogs.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium mb-2">Selected Related Blogs:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRelatedBlogs.map(blogId => {
                        const blog = availableBlogs.find(b => b.blog_id === blogId);
                        return blog ? (
                          <span key={blogId} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {blog.blog_name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-6">
          {/* Hero Images */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Hero Images</h5>
            </div>
            <div className="box-body">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setManagerOpener(1)}
                  className="ti-btn ti-btn-primary"
                >
                  Select Hero Images
                </button>
                
                {heroImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {heroImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          alt={`Hero ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('hero', index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* List Images */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">List Images</h5>
            </div>
            <div className="box-body">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setManagerOpener(2)}
                  className="ti-btn ti-btn-primary"
                >
                  Select List Images
                </button>
                
                {listImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {listImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          alt={`List ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('list', index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Status</h5>
            </div>
            <div className="box-body">
              <select
                name="status"
                value={values.status}
                onChange={handleInputChange}
                className="ti-form-select"
              >
                <option value={1}>Enable</option>
                <option value={0}>Disable</option>
              </select>
            </div>
          </div>

          {/* Meta Information */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Meta Information</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Meta Title */}
              <div>
                <label className="ti-form-label">Meta Title</label>
                <input
                  type="text"
                  name="meta_title"
                  value={values.meta_title}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter meta title"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="ti-form-label">Meta Description</label>
                <textarea
                  name="meta_des"
                  value={values.meta_des}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter meta description"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content Management Section */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Blog Content Management</h5>
                <button
                  type="button"
                  onClick={handleAddContentClick}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Blog Content
                </button>
              </div>
            </div>
            <div className="box-body">
              {/* Content Form */}
              {showContentForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h6 className="text-lg font-medium mb-4">
                    {editingContentId ? 'Edit' : 'Add'} Blog Content
                  </h6>
                  
                  {/* Content Type Selection */}
                  <div className="mb-4">
                    <label className="ti-form-label">Content Type *</label>
                    <select
                      name="type"
                      value={contentForm.type}
                      onChange={handleContentFormChange}
                      className="ti-form-select"
                      required
                    >
                      <option value="">Select content type...</option>
                      <option value="text">Text</option>
                      <option value="quote">Quote</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  {/* Text Content Fields */}
                  {contentForm.type === "text" && (
                    <div className="space-y-4">
                      <div>
                        <label className="ti-form-label">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={contentForm.title}
                          onChange={handleContentFormChange}
                          className="ti-form-input"
                          placeholder="Enter title"
                          required
                        />
                      </div>
                      <div>
                        <label className="ti-form-label">Text Content *</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={contentForm.text}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            handleContentEditorChange(data, 'text');
                          }}
                          config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'blockQuote', 'undo', 'redo']
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Quote Content Field */}
                  {contentForm.type === "quote" && (
                    <div>
                      <label className="ti-form-label">Quote Text *</label>
                      <textarea
                        name="quote"
                        value={contentForm.quote}
                        onChange={handleContentFormChange}
                        className="ti-form-input"
                        placeholder="Enter quote text"
                        rows="4"
                        required
                      />
                    </div>
                  )}

                  {/* Image Content Field */}
                  {contentForm.type === "image" && (
                    <div>
                      <label className="ti-form-label">Images *</label>
                      <div className="space-y-4">
                        <button
                          type="button"
                          onClick={() => setManagerOpener(3)}
                          className="ti-btn ti-btn-primary"
                        >
                          Select Images
                        </button>
                        
                        {contentImages.length > 0 && (
                          <div className="grid grid-cols-3 gap-4">
                            {contentImages.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                                  className="w-full h-24 rounded-sm object-cover border"
                                  alt={`Content ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeContentImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Video Content Field */}
                  {contentForm.type === "video" && (
                    <div>
                      <label className="ti-form-label">Videos *</label>
                      <div className="space-y-4">
                        <button
                          type="button"
                          onClick={() => setManagerOpener(4)}
                          className="ti-btn ti-btn-primary"
                        >
                          Select Videos
                        </button>
                        
                        {contentVideos.length > 0 && (
                          <div className="grid grid-cols-2 gap-4">
                            {contentVideos.map((video, index) => (
                              <div key={index} className="relative">
                                <video
                                  src={`${import.meta.env.VITE_CMS_URL}api/transform/${video}`}
                                  className="w-full h-32 rounded-sm object-cover border"
                                  controls
                                />
                                <button
                                  type="button"
                                  onClick={() => removeContentVideo(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Sort Order */}
                  <div className="mt-4">
                    <label className="ti-form-label">Sort Order</label>
                    <input
                      type="number"
                      name="sort_order"
                      value={contentForm.sort_order}
                      onChange={handleContentFormChange}
                      className="ti-form-input"
                      placeholder="Enter sort order"
                      min="0"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={handleCancelContentForm}
                      className="ti-btn ti-btn-light"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleContentSubmit}
                      className="ti-btn ti-btn-primary"
                    >
                      {editingContentId ? 'Update' : 'Add'} Content
                    </button>
                  </div>
                </div>
              )}

              {/* Content Table */}
              {blogContents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Content</th>
                        <th scope="col" className="px-6 py-3">Sort Order</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogContents
                        .sort((a, b) => a.sort_order - b.sort_order)
                        .map((content) => (
                        <tr key={content.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              content.type === 'text' ? 'bg-blue-100 text-blue-800' :
                              content.type === 'quote' ? 'bg-purple-100 text-purple-800' :
                              content.type === 'image' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {content.type === 'text' && (
                              <div>
                                <div className="font-medium">{content.title}</div>
                                <div className="text-gray-500 text-sm">
                                  {stripHTMLTags(content.text)?.substring(0, 100) + '...'}
                                </div>
                              </div>
                            )}
                            {content.type === 'quote' && (
                              <div className="italic text-gray-600">
                                "{content.quote?.substring(0, 100)}{content.quote?.length > 100 ? '...' : ''}"
                              </div>
                            )}
                            {content.type === 'image' && (
                              <div>
                                {(() => {
                                  try {
                                    const images = JSON.parse(content.image || '[]');
                                    return (
                                      <div className="flex gap-1">
                                        {images.slice(0, 3).map((img, idx) => (
                                          <img
                                            key={idx}
                                            src={`${import.meta.env.VITE_CMS_URL}api/transform/${img}`}
                                            className="w-12 h-12 object-cover rounded border"
                                            alt={`Preview ${idx + 1}`}
                                          />
                                        ))}
                                        {images.length > 3 && (
                                          <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs">
                                            +{images.length - 3}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  } catch (e) {
                                    return <span className="text-gray-500">Invalid image data</span>;
                                  }
                                })()}
                              </div>
                            )}
                            {content.type === 'video' && (
                              <div className="text-blue-600">
                                {(() => {
                                  try {
                                    // Handle new video file format
                                    if (content.video && content.video.startsWith('[')) {
                                      const videos = JSON.parse(content.video);
                                      if (Array.isArray(videos) && videos.length > 0) {
                                        return (
                                          <div className="space-y-1">
                                            {videos.slice(0, 2).map((video, index) => (
                                              <div key={index} className="text-sm">
                                                🎥 {video.split('/').pop()}
                                              </div>
                                            ))}
                                            {videos.length > 2 && (
                                              <div className="text-xs text-gray-500">+{videos.length - 2} more</div>
                                            )}
                                          </div>
                                        );
                                      }
                                    }
                                    // Handle old URL format
                                    return <span>{content.video?.substring(0, 50)}{content.video?.length > 50 ? '...' : ''}</span>;
                                  } catch (e) {
                                    return <span className="text-gray-500">Invalid video data</span>;
                                  }
                                })()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {content.sort_order}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditContent(content)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteContent(content.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : !showContentForm && (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No content blocks added yet.</p>
                  <p className="text-sm">Click "Add Blog Content" to create content blocks with text, quotes, images, and videos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
     

      {/* Action Buttons */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-footer bg-transparent">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="ti-btn ti-btn-light"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ti-btn ti-btn-primary"
                >
                  Update Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
