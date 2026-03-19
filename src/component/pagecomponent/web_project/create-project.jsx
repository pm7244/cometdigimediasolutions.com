import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Filemanagermain from "../fileManager/filemanagermain";

// ------------------ Create Project ------------------
const CreateProject = () => {
  const navigate = useNavigate();

  const [projectFormData, setProjectFormData] = useState({
    hero_image: "",
    hero_video: "",
    title: "",
    short_des: "",
    des: "",
    type: "",
    date: "",
    brand: "",
    status: 1,
    slug: "",
    category: "",
    service: "",
    client: "",
    software: "",
    list_img: "",
    big_list_img: "",
    results_des: "",
    challenges_des: "",
    sort_order: 0,
  });

  const [heroImages, setHeroImages] = useState([]);
  const [heroVideo, setHeroVideo] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [bigListImages, setBigListImages] = useState([]);
  const [managerOpener, setManagerOpener] = useState(0);
  const [saving, setSaving] = useState(false);

  // Dynamic lists for challenges and results
  const [challengesList, setChallengesList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [newChallenge, setNewChallenge] = useState("");
  const [newResult, setNewResult] = useState("");

  // Generate slug from title
  const generateSlug = (title) =>
    title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  // Challenges management
  const addChallenge = () => {
    if (newChallenge.trim()) {
      setChallengesList(prev => [...prev, newChallenge.trim()]);
      setNewChallenge("");
    }
  };

  const removeChallenge = (index) => {
    setChallengesList(prev => prev.filter((_, i) => i !== index));
  };

  // Results management
  const addResult = () => {
    if (newResult.trim()) {
      setResultsList(prev => [...prev, newResult.trim()]);
      setNewResult("");
    }
  };

  const removeResult = (index) => {
    setResultsList(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: generateSlug(value) }),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!projectFormData.title.trim()) {
      toast.error("Please enter a project title");
      setSaving(false);
      return;
    }
    if (!projectFormData.short_des.trim()) {
      toast.error("Please enter a short description");
      setSaving(false);
      return;
    }
    if (!projectFormData.des.trim()) {
      toast.error("Please enter a description");
      setSaving(false);
      return;
    }
    if (!projectFormData.type.trim()) {
      toast.error("Please enter a project type");
      setSaving(false);
      return;
    }
    if (!projectFormData.slug.trim()) {
      toast.error("Please enter a URL slug");
      setSaving(false);
      return;
    }

    try {
      console.log("Creating project data:", projectFormData);
      
      // Prepare data for submission - send arrays instead of JSON strings
      const submitData = {
        ...projectFormData,
        hero_image: heroImages,
        hero_video: heroVideo,
        list_img: listImages,
        big_list_img: bigListImages,
        challenges_des: challengesList,
        results_des: resultsList
      };
      
      console.log("Submit data:", submitData);
      
      const response = await fetch(
        `${import.meta.env.VITE_CMS_URL}api/createproject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        }
      );
      const result = await response.json();
      console.log("Create project response:", result);

      if (result.status) {
        toast.success("Project created successfully!");
        navigate("/cms/pages/web_project");
      } else {
        toast.error(result.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error creating project: " + error.message);
    } finally {
      setSaving(false);
    }
  };
 if (managerOpener === 1) {
    return (
      <Filemanagermain
        file={heroVideo}
        fileSetter={setHeroVideo}
        openSetter={setManagerOpener}
        maxFiles={1}
        ratio={16 / 9}
        type="video"
      />
    );
  } else if (managerOpener === 2) {
    return (
      <Filemanagermain
        file={heroImages}
        fileSetter={setHeroImages}
        openSetter={setManagerOpener}
        maxFiles={1}
        ratio={16 / 9}
        type="image"
      />
    );
  } else if (managerOpener === 3) {
    return (
      <Filemanagermain
        file={listImages}
        fileSetter={setListImages}
        openSetter={setManagerOpener}
        maxFiles={10}
        ratio={16 / 9}
        type="image"
      />
    );
  } else if (managerOpener === 4) {
    return (
      <Filemanagermain
        file={bigListImages}
        fileSetter={setBigListImages}
        openSetter={setManagerOpener}
        maxFiles={10}
        ratio={16 / 9}
        type="image"
      />
    );
  }
  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/cms/pages/web_project')}
          className="flex items-center gap-2 mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
      </div>
      <PageHeader
        currentpage="Create Project"
        activepage="Pages"
        mainpage="Web Project"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-x-6">
          {/* Left Column - Basic Information */}
          <div className="col-span-12 xxl:col-span-12">
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Basic Information</h5>
              </div>
              <div className="box-body space-y-5">
                {/* Title */}
                <div>
                  <label className="ti-form-label">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={projectFormData.title}
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
                    value={projectFormData.short_des}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    rows="3"
                    placeholder="Brief description of the project"
                    required
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="ti-form-label">Project Type *</label>
                  <input
                    type="text"
                    name="type"
                    value={projectFormData.type}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="e.g., Web Development, Mobile App"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="ti-form-label">Project Date</label>
                  <input
                    type="date"
                    name="date"
                    value={projectFormData.date}
                    onChange={handleInputChange}
                    className="ti-form-input"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="ti-form-label">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={projectFormData.brand}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Brand or company name"
                  />
                </div>

                {/* URL Slug */}
                <div>
                  <label className="ti-form-label">URL Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={projectFormData.slug}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Auto-generated from title"
                    required
                  />
                  <small className="text-gray-500">
                    URL friendly version of the title
                  </small>
                </div>

                {/* Category */}
                <div>
                  <label className="ti-form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={projectFormData.category}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="e.g., E-commerce, Corporate, Portfolio"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="ti-form-label">Service</label>
                  <input
                    type="text"
                    name="service"
                    value={projectFormData.service}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="e.g., Web Design, Development, SEO"
                  />
                </div>

                {/* Client */}
                <div>
                  <label className="ti-form-label">Client Name</label>
                  <input
                    type="text"
                    name="client"
                    value={projectFormData.client}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter client name"
                  />
                </div>

                {/* Software */}
                <div>
                  <label className="ti-form-label">Software/Technologies</label>
                  <input
                    type="text"
                    name="software"
                    value={projectFormData.software}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="ti-form-label">Status</label>
                  <select
                    name="status"
                    value={projectFormData.status}
                    onChange={handleInputChange}
                    className="ti-form-select"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
                {/* Sort Order */}
                <div>
                  <label className="ti-form-label">Sort Order</label>
                  <input
                    type="number"
                    name="sort_order"
                    value={projectFormData.sort_order}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter sort order"
                  />
                </div>
              </div>
            </div>
              <div className="col-span-12 xxl:col-span-6">
            {/* Challenges */}
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Project Challenges</h5>
              </div>
              <div className="box-body space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChallenge}
                    onChange={(e) => setNewChallenge(e.target.value)}
                    className="ti-form-input flex-1"
                    placeholder="Add a project challenge"
                    onKeyPress={(e) => e.key === 'Enter' && e.preventDefault() && addChallenge()}
                  />
                  <button
                    type="button"
                    onClick={addChallenge}
                    className="ti-btn ti-btn-primary"
                  >
                    Add
                  </button>
                </div>

                {challengesList.length > 0 && (
                  <div className="space-y-2">
                    {challengesList.map((challenge, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{challenge}</span>
                        <button
                          type="button"
                          onClick={() => removeChallenge(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ti ti-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Project Results</h5>
              </div>
              <div className="box-body space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    className="ti-form-input flex-1"
                    placeholder="Add a project result"
                    onKeyPress={(e) => e.key === 'Enter' && e.preventDefault() && addResult()}
                  />
                  <button
                    type="button"
                    onClick={addResult}
                    className="ti-btn ti-btn-primary"
                  >
                    Add
                  </button>
                </div>

                {resultsList.length > 0 && (
                  <div className="space-y-2">
                    {resultsList.map((result, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{result}</span>
                        <button
                          type="button"
                          onClick={() => removeResult(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ti ti-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

            {/* Full Description */}
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Full Description *</h5>
              </div>
              <div className="box-body">
                <textarea
                  name="des"
                  value={projectFormData.des}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  rows="8"
                  placeholder="Detailed description of the project"
                  required
                />
              </div>
            </div>
          </div>
          
        </div>

        {/* Media Upload Section */}
        <div className="grid grid-cols-12 gap-x-6 mt-6">
          {/* Hero Video */}
          <div className="col-span-12 xxl:col-span-6">
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Hero Video</h5>
              </div>
              <div className="box-body">
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Hero Video button clicked");
                      setManagerOpener(1);
                    }}
                    className="ti-btn ti-btn-primary w-full"
                  >
                    {heroVideo.length > 0 ? "Change Hero Video" : "Select Hero Video"}
                  </button>

                  {heroVideo.length > 0 && (
                    <div className="relative">
                      <video
                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${heroVideo[0]}`}
                        className="w-full h-48 object-cover border rounded"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => setHeroVideo([])}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Hero Image</h5>
              </div>
              <div className="box-body">
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Hero Image button clicked");
                      setManagerOpener(2);
                    }}
                    className="ti-btn ti-btn-primary w-full"
                  >
                    {heroImages.length > 0 ? "Change Hero Image" : "Select Hero Image"}
                  </button>

                  {heroImages.length > 0 && (
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${heroImages[0]}`}
                        className="w-full h-48 object-cover border rounded"
                        alt="Hero"
                      />
                      <button
                        type="button"
                        onClick={() => setHeroImages([])}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* List Images */}
          <div className="col-span-12 xxl:col-span-6">
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">List Images</h5>
              </div>
              <div className="box-body">
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("List Images button clicked");
                      setManagerOpener(3);
                    }}
                    className="ti-btn ti-btn-primary w-full"
                  >
                    {listImages.length > 0 ? "Change List Images" : "Select List Images"}
                  </button>

                  {listImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {listImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                            className="w-full h-32 object-cover border rounded"
                            alt={`List ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newListImages = listImages.filter((_, i) => i !== index);
                              setListImages(newListImages);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
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

            {/* Big List Images */}
            <div className="box">
              <div className="box-header">
                <h5 className="box-title">Big List Images</h5>
              </div>
              <div className="box-body">
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Big List Images button clicked");
                      setManagerOpener(4);
                    }}
                    className="ti-btn ti-btn-primary w-full"
                  >
                    {bigListImages.length > 0 ? "Change Big List Images" : "Select Big List Images"}
                  </button>

                  {bigListImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {bigListImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                            className="w-full h-32 object-cover border rounded"
                            alt={`Big List ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newBigListImages = bigListImages.filter((_, i) => i !== index);
                              setBigListImages(newBigListImages);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
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

        {/* Submit Button */}
        <div className="text-end mt-6">
          <button
            type="submit"
            className="ti-btn ti-btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <i className="ri-loader-2-line animate-spin"></i>
                Creating...
              </>
            ) : (
              <>
                <i className="ri-add-line"></i>
                Create Project
              </>
            )}
          </button>
        </div>
      </form>

      {/* File Manager Modals */}
      {managerOpener === 1 && (
        <Filemanagermain
          file={heroVideo}
          fileSetter={setHeroVideo}
          openSetter={setManagerOpener}
          maxFiles={1}
          ratio={16 / 9}
          type="video"
        />
      )}

      {managerOpener === 2 && (
        <Filemanagermain
          file={heroImages}
          fileSetter={setHeroImages}
          openSetter={setManagerOpener}
          maxFiles={1}
          ratio={16 / 9}
          type="image"
        />
      )}

      {managerOpener === 3 && (
        <Filemanagermain
          file={listImages}
          fileSetter={setListImages}
          openSetter={setManagerOpener}
          maxFiles={10}
          ratio={16 / 9}
          type="image"
        />
      )}

      {managerOpener === 4 && (
        <Filemanagermain
          file={bigListImages}
          fileSetter={setBigListImages}
          openSetter={setManagerOpener}
          maxFiles={10}
          ratio={16 / 9}
          type="image"
        />
      )}
    </div>
  );
};

export default CreateProject;