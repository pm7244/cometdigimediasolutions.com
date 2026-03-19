import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import Filemanagermain from "../fileManager/filemanagermain";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    des: '',
    short_des: '',
    slug: '',
    icon: '',
    logo: '',
    stack_title: '',
    cover_img: '',
    a_title: '',
    a_des: '',
    video: '',
    benefits: '',
    meta_title: '',
    meta_des: '',
    status: 1
  });
  
  const [serviceIcon, setServiceIcon] = useState([]);
  const [serviceLogo, setServiceLogo] = useState([]);
  const [serviceCoverImage, setServiceCoverImage] = useState([]);
  const [serviceVideo, setServiceVideo] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  const [loading, setLoading] = useState(true);

  // Benefits management
  const [benefitsList, setBenefitsList] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getbyid_service/${id}`);
        const result = await response.json();
        
        if (result.status && result.data && result.data.length > 0) {
          const service = result.data[0];
          setServiceFormData({
            title: service.title || '',
            des: service.des || '',
            short_des: service.short_des || '',
            slug: service.slug || '',
            icon: service.icon || '',
            logo: service.logo || '',
            stack_title: service.stack_title || '',
            cover_img: service.cover_img || '',
            a_title: service.a_title || '',
            a_des: service.a_des || '',
            video: service.video || '',
            benefits: service.benefits || '',
            meta_title: service.meta_title || '',
            meta_des: service.meta_des || '',
            status: service.status || 1
          });
          
          // Parse arrays from JSON strings
          try {
            if (service.icon) {
              const iconData = JSON.parse(service.icon);
              setServiceIcon(Array.isArray(iconData) ? iconData : [service.icon]);
            }
            if (service.logo) {
              const logoData = JSON.parse(service.logo);
              setServiceLogo(Array.isArray(logoData) ? logoData : [service.logo]);
            }
            if (service.cover_img) {
              const coverData = JSON.parse(service.cover_img);
              setServiceCoverImage(Array.isArray(coverData) ? coverData : [service.cover_img]);
            }
            if (service.video) {
              const videoData = JSON.parse(service.video);
              setServiceVideo(Array.isArray(videoData) ? videoData : [service.video]);
            }
            if (service.benefits) {
              const benefitsData = JSON.parse(service.benefits);
              setBenefitsList(Array.isArray(benefitsData) ? benefitsData : [service.benefits]);
            }
          } catch (parseError) {
            console.warn("Error parsing JSON fields, using as strings:", parseError);
            if (service.icon) setServiceIcon([service.icon]);
            if (service.logo) setServiceLogo([service.logo]);
            if (service.cover_img) setServiceCoverImage([service.cover_img]);
            if (service.video) setServiceVideo([service.video]);
            if (service.benefits) setBenefitsList([service.benefits]);
          }
        } else {
          toast.error("Service not found");
          navigate("/cms/pages/web_service");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("Error loading service data");
        navigate("/cms/pages/web_service");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, navigate]);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }));
  };

  // Benefits management functions
  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefitsList(prev => [...prev, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index) => {
    setBenefitsList(prev => prev.filter((_, i) => i !== index));
  };

  // Update form data when images change
  useEffect(() => {
    if (serviceIcon.length > 0) {
      setServiceFormData(prev => ({ ...prev, icon: JSON.stringify(serviceIcon) }));
    } else {
      setServiceFormData(prev => ({ ...prev, icon: "" }));
    }
  }, [serviceIcon]);

  useEffect(() => {
    if (serviceLogo.length > 0) {
      setServiceFormData(prev => ({ ...prev, logo: JSON.stringify(serviceLogo) }));
    } else {
      setServiceFormData(prev => ({ ...prev, logo: "" }));
    }
  }, [serviceLogo]);

  useEffect(() => {
    if (serviceCoverImage.length > 0) {
      setServiceFormData(prev => ({ ...prev, cover_img: JSON.stringify(serviceCoverImage) }));
    } else {
      setServiceFormData(prev => ({ ...prev, cover_img: "" }));
    }
  }, [serviceCoverImage]);

  useEffect(() => {
    if (serviceVideo.length > 0) {
      setServiceFormData(prev => ({ ...prev, video: JSON.stringify(serviceVideo) }));
    } else {
      setServiceFormData(prev => ({ ...prev, video: "" }));
    }
  }, [serviceVideo]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for submission
      const submitData = {
        ...serviceFormData,
        benefits: benefitsList
      };
      
      console.log("Submit data:", submitData);
      
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidservice/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      
      if (result.status) {
        toast.success("Service updated successfully");
        navigate("/cms/pages/web_service");
      } else {
        toast.error(result.message || "Failed to update service");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating service");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/cms/pages/web_service");
  };

  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];

  if (loading) {
    return (
      <div>
        <PageHeader currentpage="Edit Service" activepage="Pages" mainpage="Web Service" />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return managerOpener === 1 ? (
    <Filemanagermain
      file={serviceIcon}
      fileSetter={setServiceIcon}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={1 / 1}
      type="image"
    />
  ) : managerOpener === 2 ? (
    <Filemanagermain
      file={serviceLogo}
      fileSetter={setServiceLogo}
      openSetter={setManagerOpener}
      maxFiles={5}
      ratio={1 / 1}
      type="image"
    />
  ) : managerOpener === 3 ? (
    <Filemanagermain
      file={serviceCoverImage}
      fileSetter={setServiceCoverImage}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : managerOpener === 4 ? (
    <Filemanagermain
      file={serviceVideo}
      fileSetter={setServiceVideo}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="video"
    />
  ) : (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/cms/pages/web_service')}
          className="flex items-center gap-2 mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </button>
      </div>
      <PageHeader currentpage="Edit Service" activepage="Pages" mainpage="Web Service" />
      
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Edit Service</h5>
            </div>
            <div className="box-body">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="ti-form-label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={serviceFormData.title}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter service title"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="ti-form-label">Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={serviceFormData.slug}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter service slug"
                    required
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="ti-form-label">Short Description</label>
                  <textarea
                    name="short_des"
                    value={serviceFormData.short_des}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter short description"
                    rows={3}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="ti-form-label">Description</label>
                  <textarea
                    name="des"
                    value={serviceFormData.des}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter full description"
                    rows={5}
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="ti-form-label">Icon</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(1)}
                    >
                      {serviceIcon.length > 0 ? "Change Icon" : "Select Icon"}
                    </button>
                    {serviceIcon.length > 0 && (
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${serviceIcon[0]}`}
                          className="w-20 h-20 rounded-sm object-cover border"
                          alt="Icon"
                        />
                        <button
                          type="button"
                          onClick={() => setServiceIcon([])}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Logo */}
                <div>
                  <label className="ti-form-label">Logo</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(2)}
                    >
                      {serviceLogo.length > 0 ? `Change Logos (${serviceLogo.length})` : "Select Logos"}
                    </button>
                    {serviceLogo.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mt-2 " style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {serviceLogo.map((logo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={`${import.meta.env.VITE_CMS_URL}api/transform/${logo}`}
                              className="w-20  rounded-sm object-cover border"
                              alt={`Logo ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newLogos = serviceLogo.filter((_, i) => i !== index);
                                setServiceLogo(newLogos);
                              }}
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

                {/* Stack Title */}
                <div>
                  <label className="ti-form-label">Stack Title</label>
                  <input
                    type="text"
                    name="stack_title"
                    value={serviceFormData.stack_title}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter stack title"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="ti-form-label">Cover Image</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(3)}
                    >
                      {serviceCoverImage.length > 0 ? "Change Cover Image" : "Select Cover Image"}
                    </button>
                    {serviceCoverImage.length > 0 && (
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${serviceCoverImage[0]}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          alt="Cover"
                        />
                        <button
                          type="button"
                          onClick={() => setServiceCoverImage([])}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Approach Title */}
                <div>
                  <label className="ti-form-label">Approach Title</label>
                  <input
                    type="text"
                    name="a_title"
                    value={serviceFormData.a_title}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter approach title"
                  />
                </div>

                {/* Approach Description */}
                <div>
                  <label className="ti-form-label">Approach Description</label>
                  <textarea
                    name="a_des"
                    value={serviceFormData.a_des}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter approach description"
                    rows={4}
                  />
                </div>

                {/* Benefits */}
                <div>
                  <label className="ti-form-label">Benefits</label>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        className="ti-form-input flex-1"
                        placeholder="Add a benefit"
                        onKeyPress={(e) => e.key === 'Enter' && e.preventDefault() && addBenefit()}
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="ti-btn ti-btn-primary"
                      >
                        Add
                      </button>
                    </div>

                    {benefitsList.length > 0 && (
                      <div className="space-y-2">
                        {benefitsList.map((benefit, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{benefit}</span>
                            <button
                              type="button"
                              onClick={() => removeBenefit(index)}
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

                {/* Video */}
                <div>
                  <label className="ti-form-label">Video</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(4)}
                    >
                      {serviceVideo.length > 0 ? "Change Video" : "Select Video"}
                    </button>
                    {serviceVideo.length > 0 && (
                      <div className="relative">
                        <video
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${serviceVideo[0]}`}
                          className="w-full h-32 rounded-sm object-cover border"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => setServiceVideo([])}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Meta Title */}
                <div>
                  <label className="ti-form-label">Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    value={serviceFormData.meta_title}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter meta title for SEO"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="ti-form-label">Meta Description</label>
                  <textarea
                    name="meta_des"
                    value={serviceFormData.meta_des}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter meta description for SEO"
                    rows={3}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="ti-form-label">Status</label>
                  <Select
                    value={statusOptions.find(option => option.value === serviceFormData.status)}
                    onChange={(selectedOption) => 
                      setServiceFormData(prev => ({ ...prev, status: selectedOption.value }))
                    }
                    options={statusOptions}
                    className="ti-form-select"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="ti-btn ti-btn-primary"
                  >
                    Update Service
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="ti-btn ti-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
