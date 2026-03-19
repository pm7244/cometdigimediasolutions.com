import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import Filemanagermain from "../../fileManager/filemanagermain";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateProjectContent = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    title: "",
    short_des: "",
    des: "",
    type: "",
    slug: "",
    image: "",
    status: 1
  });

  const [images, setImages] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (data) => {
    setValues(prev => ({ ...prev, des: data }));
  };

  const handleMediaSelect = (selectedMedia) => {
    // Format paths to match required format: ["images/pro/p1.png"] or ["video.mp4"]
    const formattedPaths = selectedMedia.map(path => {
      // Remove 'upload/' prefix if present and ensure proper format
      let cleanPath = path.replace(/^upload\//, '');
      return cleanPath;
    });
    
    setImages(formattedPaths);
    setManagerOpener(false);
  };

  const openFileManager = () => {
    setManagerOpener(true);
  };

  const removeMedia = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    // Validation
    if (!values.title.trim()) {
      toast.error("Please provide a title");
      return;
    }
    
    if (!values.short_des.trim()) {
      toast.error("Please provide a short description");
      return;
    }
    
    if (!values.des.trim()) {
      toast.error("Please provide a description");
      return;
    }
    
    if (!values.type.trim()) {
      toast.error("Please provide a type");
      return;
    }
    
    if (!values.slug.trim()) {
      toast.error("Please provide a slug");
      return;
    }

    try {
      // Prepare data for submission - send arrays instead of JSON strings
      const submitData = {
        ...values,
        list_img: images, // Send as array
        hero_image: "",
        hero_video: "",
        big_list_img: [],
        challenges_des: [],
        results_des: [],
        category: "",
        service: "",
        client: "",
        software: "",
        date: null,
        brand: ""
      };

      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/createproject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.status) {
        toast.success("Project content created successfully");
        navigate("/cms/pages/web_project");
      } else {
        toast.error(result.message || "Failed to create project content");
      }
    } catch (error) {
      console.error("Create error:", error);
      toast.error("An error occurred while creating project content");
    }
  };

  const handleCancel = () => {
    navigate("/cms/pages/web_project");
  };

  return (
    <div>
      <PageHeader currentpage="Create Project Content" activepage="Pages" mainpage="Web Project" />
      
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-12 xxl:col-span-6">
          {/* Basic Information */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Basic Information</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Title */}
              <div>
                <label className="ti-form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter project title"
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="ti-form-label">Short Description *</label>
                <textarea
                  name="short_des"
                  value={values.short_des}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter short description"
                  rows="3"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="ti-form-label">Type *</label>
                <input
                  type="text"
                  name="type"
                  value={values.type}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter project type (e.g., Web Design, Mobile App, etc.)"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="ti-form-label">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={values.slug}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter URL slug (e.g., my-project-name)"
                  required
                />
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

          {/* Description */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Full Description *</h5>
            </div>
            <div className="box-body">
              <CKEditor
                editor={ClassicEditor}
                data={values.des}
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
        </div>

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-6">
          {/* Images */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Project Images</h5>
            </div>
            <div className="box-body">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={openFileManager}
                  className="ti-btn ti-btn-primary w-full"
                >
                  Select Images
                </button>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}upload/${image}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          alt={`Project Image ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
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
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Manager Modal */}
      {managerOpener && (
        <Filemanagermain
          file={images}
          ratio={[16/9]}
          fileSetter={handleMediaSelect}
          opener={managerOpener}
          openSetter={setManagerOpener}
        />
      )}
    </div>
  );
};

export default CreateProjectContent;
