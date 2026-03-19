import React, { useEffect, useState } from "react";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Filemanagermain from "../fileManager/filemanagermain";

const WebCareer = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    hero_title: "",
    hero_image: "",
    career_title: "",
    list_img: "",
    meta_title: "",
    meta_des: "",
    status: 1
  });

  // Content management state
  const [contentData, setContentData] = useState([]);

  // File manager state
  const [heroImage, setHeroImage] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);

  const fetchData = () => {
    // Fetch web_career data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallwebcareer`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Career data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const careerData = data.data[0];
          
          // Parse hero_image if it's a JSON string
          let heroImageData = [];
          if (careerData.hero_image) {
            try {
              heroImageData = JSON.parse(careerData.hero_image);
            } catch (e) {
              console.error("Error parsing hero_image:", e);
            }
          }
          
          setHeroImage(heroImageData);
          setValues({
            hero_title: careerData.hero_title || "",
            hero_image: careerData.hero_image || "",
            career_title: careerData.career_title || "",
            meta_title: careerData.meta_title || "",
            meta_des: careerData.meta_des || "",
            status: careerData.status || 1
          });
        } else {
          console.log("No career data found, using defaults");
          setValues({
            hero_title: "",
            hero_image: "",
            career_title: "",
            list_img: "",
            meta_title: "",
            meta_des: "",
            status: 1
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch career data");
      });
  };

  const fetchContentData = () => {
    console.log("Fetching career content from:", `${import.meta.env.VITE_CMS_URL}api/getallcareer`);
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallcareer`)
      .then((res) => {
        console.log("Content response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Career content received:", data);
        if (data.status && data.data) {
          setContentData(data.data);
          console.log(`Loaded ${data.data.length} career content items`);
        } else {
          console.log("No content data found or invalid response format");
          setContentData([]);
          if (data.message) {
            toast.info(data.message);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch content data:", err);
        toast.error(`Failed to fetch content data: ${err.message}`);
        setContentData([]);
      });
  };

  useEffect(() => {
    fetchData();
    fetchContentData();
  }, []);

  useEffect(() => {
    setValues((prev) => ({ ...prev, hero_image: JSON.stringify(heroImage) }));
  }, [heroImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Prepare payload
    const payload = { 
      ...values,
      hero_image: JSON.stringify(heroImage)
    };
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidwebcareer/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Career page updated successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to update career page");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update career page");
      });
  };

  // Content management functions
  const handleEditContent = (c_id) => {
    console.log("Edit career content clicked with ID:", c_id);
    navigate(`/cms/pages/web_career/edit/${c_id}`);
  };

  const handleDeleteContent = (c_id) => {
    if (window.confirm("Are you sure you want to delete this career content?")) {
      console.log("Deleting career content with ID:", c_id);
      fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidcareer/${c_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status) {
            toast.success("Career content deleted successfully");
            fetchContentData(); // Refresh data
          } else {
            toast.error(result.message || "Failed to delete content");
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          toast.error("Failed to delete content");
        });
    }
  };

  const handleMediaSelect = (selectedMedia) => {
    setHeroImage(selectedMedia);
    setManagerOpener(false);
  };

  const removeHeroImage = (index) => {
    const newImages = heroImage.filter((_, i) => i !== index);
    setHeroImage(newImages);
  };

  return (
    <div>
      <PageHeader currentpage="Web Career" activepage="Pages" mainpage="Web Career" />
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
                    onClick={() => setManagerOpener(true)}
                    className="ti-btn ti-btn-outline-primary"
                  >
                    {heroImage.length > 0 ? "Change Image" : "Select Image"}
                  </button>
                  {heroImage.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {heroImage.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                            className="h-16 w-20 rounded-sm object-cover border"
                            alt="Hero"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.png';
                              console.error('Failed to load hero image:', image);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeHeroImage(index)}
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

          {/* Career Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Career Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Career Title */}
              <div>
                <label className="ti-form-label">Career Title</label>
                <input
                  type="text"
                  name="career_title"
                  value={values.career_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Career Title"
                />
              </div>
            </div>
          </div>
        </div>
      {/*}  


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

      {/* Content Management Section */}
      <div className="grid grid-cols-12 gap-x-6 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header flex justify-between items-center">
              <h5 className="box-title">Career Content Management</h5>
              <button
                type="button"
                onClick={() => navigate("/cms/pages/web_career/create")}
                className="ti-btn ti-btn-primary"
              >
                <i className="ti ti-plus mr-2"></i>Add New Career Content
              </button>
            </div>

            {/* Content Table */}
            <div className="overflow-auto table-bordered">
              <table className="ti-custom-table ti-custom-table-head">
                <thead className="border">
                  <tr>
                    <th className="w-1">#</th>
                    <th>Title</th>
                    <th>Job Type</th>
                    <th>Location</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentData.map((item, index) => (
                    <tr key={item.c_id || index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="max-w-48 truncate text-sm">
                          {item.title || "No title"}
                        </div>
                      </td>
                      <td>
                        <div className="max-w-32 truncate text-sm">
                          {item.job_type || "N/A"}
                        </div>
                      </td>
                      <td>
                        <div className="max-w-32 truncate text-sm">
                          {item.location || "N/A"}
                        </div>
                      </td>
                      <td>
                        <div className="max-w-32 truncate text-sm">
                          {item.exprience || "N/A"}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${item.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                          {item.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditContent(item.c_id)}
                            className="ti-btn ti-btn-soft-primary ti-btn-sm"
                            title="Edit"
                          >
                            <i className="ti ti-edit"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteContent(item.c_id)}
                            className="ti-btn ti-btn-soft-danger ti-btn-sm"
                            title="Delete"
                          >
                            <i className="ti ti-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contentData.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center text-gray-500 py-8"
                      >
                        No career content available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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

      {/* File Manager Modal */}
      {managerOpener && (
        <Filemanagermain
          file={heroImage}
          ratio={16 / 9}
          fileSetter={handleMediaSelect}
          openSetter={setManagerOpener}
          maxFiles={5}
          type="image"
        />
      )}
    </div>
  );
};

export default WebCareer;
