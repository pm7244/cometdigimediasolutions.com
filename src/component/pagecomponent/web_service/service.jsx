import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import Filemanagermain from "../fileManager/filemanagermain";

const WebService = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    hero_title: "",
    hero_image: "",
    service_title: "",
    list_img: "",
    meta_title: "",
    meta_des: "",
    status: 1
  });
  
  const [heroImage, setHeroImage] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  
  // Services section
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const fetchData = () => {
    // Fetch web_service data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallwebservice`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Service data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const serviceData = data.data[0];
          
          // Parse arrays from JSON strings
          let heroImageData = [];
          let listImgData = [];
          
          try {
            if (serviceData.hero_image) {
              heroImageData = JSON.parse(serviceData.hero_image);
            }
            if (serviceData.list_img) {
              listImgData = JSON.parse(serviceData.list_img);
            }
          } catch (parseError) {
            console.warn("Error parsing JSON fields:", parseError);
          }
          
          setHeroImage(heroImageData);
          setListImg(listImgData);
          
          setValues({
            hero_title: serviceData.hero_title || "",
            hero_image: serviceData.hero_image || "",
            service_title: serviceData.service_title || "",
            list_img: serviceData.list_img || "",
            meta_title: serviceData.meta_title || "",
            meta_des: serviceData.meta_des || "",
            status: serviceData.status || 1
          });
        } else {
          console.log("No service data found, using defaults");
          setValues({
            hero_title: "",
            hero_image: "",
            service_title: "",
            list_img: "",
            meta_title: "",
            meta_des: "",
            status: 1
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch service data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // Update values when image states change
  useEffect(() => {
    if (heroImage && heroImage.length > 0) {
      setValues(prev => ({ ...prev, hero_image: heroImage[0] }));
    } else {
      setValues(prev => ({ ...prev, hero_image: "" }));
    }
  }, [heroImage]);

  useEffect(() => {
    if (listImg && listImg.length > 0) {
      setValues(prev => ({ ...prev, list_img: listImg[0] }));
    } else {
      setValues(prev => ({ ...prev, list_img: "" }));
    }
  }, [listImg]);

  const handleSubmit = () => {
    // Prepare payload - convert arrays to JSON strings for database storage
    const payload = {
      ...values,
      hero_image: JSON.stringify(heroImage),
      list_img: JSON.stringify(listImg)
    };
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidwebservice/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Service page updated successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to update service page");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update service page");
      });
  };

  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" }
  ];

  // Fetch services function
  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getallservice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.status) {
        setServices(result.data || []);
      } else {
        toast.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
    } finally {
      setServicesLoading(false);
    }
  };

  // Delete service
  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidservice/${serviceId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        
        if (result.status) {
          toast.success("Service deleted successfully");
          fetchServices();
        } else {
          toast.error(result.message || "Failed to delete service");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Error deleting service");
      }
    }
  };

  // Navigate to create service page
  const handleAddNewService = () => {
    navigate("/cms/pages/web_service/create");
  };

  // Navigate to edit service page
  const handleEditService = (service) => {
    navigate(`/cms/pages/web_service/edit/${service.s_id}`);
  };

  // Initialize services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  return managerOpener === 2 ? (
    <Filemanagermain
      file={heroImage}
      fileSetter={setHeroImage}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : managerOpener === 3 ? (
    <Filemanagermain
      file={listImg}
      fileSetter={setListImg}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : (
    <div>
      <PageHeader currentpage="Web Service" activepage="Pages" mainpage="Web Service" />
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-12 xxl:col-span-12">
          {/* Hero Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Hero Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Hero Title */}
              <div>
                <label className="ti-form-label">Hero Title</label>
                <input
                  type="text"
                  name="hero_title"
                  value={values.hero_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Hero Title"
                />
              </div>

              {/* Hero Image */}
              <div>
                <label className="ti-form-label">Hero Image</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="ti-btn ti-btn-outline-primary w-full"
                    onClick={() => setManagerOpener(2)}
                  >
                    {heroImage.length > 0 ? "Change Hero Image" : "Select Hero Image"}
                  </button>
                  {heroImage.length > 0 && (
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${heroImage[0]}`}
                        className="w-full h-32 rounded-sm object-cover border"
                        alt="Hero"
                      />
                      <button
                        type="button"
                        onClick={() => setHeroImage([])}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Service Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Service Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Service Title */}
              <div>
                <label className="ti-form-label">Service Title</label>
                <input
                  type="text"
                  name="service_title"
                  value={values.service_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Service Title"
                />
              </div>

              {/* List Image */}
              <div>
                <label className="ti-form-label">List Image</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="ti-btn ti-btn-outline-primary w-full"
                    onClick={() => setManagerOpener(3)}
                  >
                    {listImg.length > 0 ? "Change List Image" : "Select List Image"}
                  </button>
                  {listImg.length > 0 && (
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${listImg[0]}`}
                        className="w-full h-32 rounded-sm object-cover border"
                        alt="List"
                      />
                      <button
                        type="button"
                        onClick={() => setListImg([])}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-12">
          {/* Status */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Status</h5>
            </div>
            <div className="box-body">
              <Select
                value={{
                  value: values.status,
                  label: values.status === 1 ? "Enable" : "Disable"
                }}
                options={[
                  { value: 1, label: "Enable" },
                  { value: 0, label: "Disable" },
                ]}
                onChange={(selected) =>
                  setValues((prev) => ({ ...prev, status: selected.value }))
                }
              />
            </div>
          </div>

          {/* Meta Title */}
          <div className="box">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={values.meta_title || ""}
                onChange={handleInputChange}
                className="ti-form-input"
                placeholder="Enter Meta Title"
              />
            </div>
          </div>

          {/* Meta Description */}
          <div className="box">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Meta Description</label>
              <textarea
                name="meta_des"
                value={values.meta_des || ""}
                onChange={handleInputChange}
                className="ti-form-input"
                placeholder="Enter Meta Description"
                rows="4"
              />
            </div>
          </div>
        </div>
      </div>
       <div className="grid grid-cols-12 gap-x-6 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Content Management</h5>
                <button
                  type="button"
                  onClick={handleAddNewService}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Content
                </button>
              </div>
            </div>
            <div className="box-body">
              {servicesLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading services...</span>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No services found. Click "Add New Content" to create your first service.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          #
                        </th>
                    
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          TITLE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          DESCRIPTION
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          META TITLE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          META DESCRIPTION
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {services.map((service, index) => (
                        <tr key={service.s_id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {index + 1}
                          </td>
                  
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {service.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {service.slug}
                            </div>
                          </td>
                          <td className="px-4 py-4 max-w-xs">
                            <div className="text-sm text-gray-900">
                              {service.short_des && service.short_des.length > 60 
                                ? `${service.short_des.substring(0, 60)}...` 
                                : service.short_des || 'No description'
                              }
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {service.title || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4 max-w-xs">
                            <div className="text-sm text-gray-900">
                              {service.short_des && service.short_des.length > 50 
                                ? `${service.short_des.substring(0, 50)}...` 
                                : service.short_des || '-'
                              }
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditService(service)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.s_id)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded bg-red-50 hover:bg-red-100 transition-colors"
                                title="Delete"
                              >
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-footer bg-transparent">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ti-btn ti-btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default WebService;
