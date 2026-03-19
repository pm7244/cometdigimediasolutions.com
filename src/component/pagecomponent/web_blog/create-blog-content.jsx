import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Filemanagermain from "../fileManager/filemanagermain";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateBlogContent = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    blog_id: "",
    text: "",
    quote: "",
    image: "",
    video: "",
    status: 1
  });

  const [blogs, setBlogs] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  const [currentMediaType, setCurrentMediaType] = useState(null);

  // Fetch available blogs for dropdown
  const fetchBlogs = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallblog`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setBlogs(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (data) => {
    setValues(prev => ({ ...prev, text: data }));
  };

  const handleMediaSelect = (selectedMedia) => {
    if (managerOpener === 1) {
      setImages(selectedMedia);
      setValues(prev => ({ ...prev, image: JSON.stringify(selectedMedia) }));
    } else if (managerOpener === 2) {
      setVideos(selectedMedia);
      setValues(prev => ({ ...prev, video: JSON.stringify(selectedMedia) }));
    }
    setManagerOpener(false);
  };

  const openFileManager = (mediaType) => {
    if (mediaType === 'image') {
      setManagerOpener(1);
    } else if (mediaType === 'video') {
      setManagerOpener(2);
    }
  };

  const removeMedia = (mediaType, index) => {
    if (mediaType === 'image') {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      setValues(prev => ({ ...prev, image: JSON.stringify(newImages) }));
    } else if (mediaType === 'video') {
      const newVideos = videos.filter((_, i) => i !== index);
      setVideos(newVideos);
      setValues(prev => ({ ...prev, video: JSON.stringify(newVideos) }));
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!values.blog_id) {
      toast.error("Please select a blog");
      return;
    }

    if (!values.text.trim() && !values.quote.trim()) {
      toast.error("Please provide either text content or a quote");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/createblogcontent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.status) {
        toast.success("Blog content created successfully");
        navigate("/cms/pages/web_blog");
      } else {
        toast.error(result.message || "Failed to create blog content");
      }
    } catch (error) {
      console.error("Create error:", error);
      toast.error("An error occurred while creating blog content");
    }
  };

  const handleCancel = () => {
    navigate("/cms/pages/web_blog");
  };

  return managerOpener === 1 ? (
    <Filemanagermain
      file={images}
      fileSetter={handleMediaSelect}
      openSetter={setManagerOpener}
      maxFiles={10}
      ratio={16/9}
      type="image"
    />
  ) : managerOpener === 2 ? (
    <Filemanagermain
      file={videos}
      fileSetter={handleMediaSelect}
      openSetter={setManagerOpener}
      maxFiles={5}
      ratio={16/9}
      type="video"
    />
  ) : (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/cms/pages/web_blog/content')}
          className="flex items-center gap-2 mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog Content
        </button>
      </div>
      <PageHeader currentpage="Create Blog Content" activepage="Pages" mainpage="Web Blog" />
      
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-12 xxl:col-span-6">
          {/* Basic Information */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Information</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Blog Selection */}
              <div>
                <label className="ti-form-label">Select Blog *</label>
                <select
                  name="blog_id"
                  value={values.blog_id}
                  onChange={handleInputChange}
                  className="ti-form-select"
                  required
                >
                  <option value="">Choose a blog...</option>
                  {blogs.map((blog) => (
                    <option key={blog.blog_id} value={blog.blog_id}>
                      {blog.blog_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="ti-form-label">Status</label>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleInputChange}
                  className="ti-form-select"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Text Content</h5>
            </div>
            <div className="box-body">
              <CKEditor
                editor={ClassicEditor}
                data={values.text}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleEditorChange(data);
                }}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'blockQuote', 'insertTable', 'undo', 'redo']
                }}
              />
            </div>
          </div>

          {/* Quote */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Quote</h5>
            </div>
            <div className="box-body">
              <textarea
                name="quote"
                value={values.quote}
                onChange={handleInputChange}
                className="ti-form-input"
                placeholder="Enter an inspirational quote or highlight text"
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-6">
          {/* Images */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Images</h5>
            </div>
            <div className="box-body">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => openFileManager('image')}
                  className="ti-btn ti-btn-primary"
                >
                  Select Images
                </button>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          alt={`Image ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia('image', index)}
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

          {/* Videos */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Videos</h5>
            </div>
            <div className="box-body">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => openFileManager('video')}
                  className="ti-btn ti-btn-primary"
                >
                  Select Videos
                </button>
                
                {videos.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative">
                        <video
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${video}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia('video', index)}
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
        </div>
      </div>

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
                  Create Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogContent;
