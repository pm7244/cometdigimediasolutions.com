import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditCareerContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    title: "",
    slug: "",
    date_display: "",
    des: "",
    job_req: "",
    job_qualification: "",
    job_type: "",
    exprience: "",
    location: "",
    meta_title: "",
    meta_des: "",
    status: 1
  });

  const [jobRequirements, setJobRequirements] = useState([]);
  const [jobQualifications, setJobQualifications] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch career content data
  const fetchCareerContent = () => {
    console.log("Fetching career content with ID:", id);
    console.log("API URL:", `${import.meta.env.VITE_CMS_URL}api/getbyidcareer/${id}`);
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/getbyidcareer/${id}`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data.status && data.data) {
          // Backend returns data as array, get first item
          const contentData = Array.isArray(data.data) ? data.data[0] : data.data;
          console.log("Career content data:", contentData);
          
          if (!contentData) {
            toast.error("Career content not found");
            navigate("/cms/pages/web_career");
            return;
          }
          
          setValues({
            title: contentData.title || "",
            slug: contentData.slug || "",
            date_display: contentData.date_display || "",
            des: contentData.des || "",
            job_req: contentData.job_req || "",
            job_qualification: contentData.job_qualification || "",
            job_type: contentData.job_type || "",
            exprience: contentData.exprience || "",
            location: contentData.location || "",
            meta_title: contentData.meta_title || "",
            meta_des: contentData.meta_des || "",
            status: contentData.status || 1
          });

          // Set date picker if date_display exists
          if (contentData.date_display) {
            const date = new Date(contentData.date_display);
            if (!isNaN(date.getTime())) {
              setSelectedDate(date);
            }
          }

          // Parse job requirements and qualifications
          if (contentData.job_req && contentData.job_req !== 'null' && contentData.job_req !== '') {
            try {
              // Handle case where it might be double-encoded JSON
              let parsedReq;
              if (typeof contentData.job_req === 'string') {
                parsedReq = JSON.parse(contentData.job_req);
                // If it's still a string after parsing, parse again
                if (typeof parsedReq === 'string') {
                  parsedReq = JSON.parse(parsedReq);
                }
              } else {
                parsedReq = contentData.job_req;
              }
              setJobRequirements(Array.isArray(parsedReq) ? parsedReq : []);
              console.log("Parsed job requirements:", parsedReq);
            } catch (e) {
              console.error("Error parsing job requirements:", e);
              console.log("Raw job_req data:", contentData.job_req);
              setJobRequirements([]);
            }
          } else {
            setJobRequirements([]);
          }

          if (contentData.job_qualification && contentData.job_qualification !== 'null' && contentData.job_qualification !== '') {
            try {
              // Handle case where it might be double-encoded JSON
              let parsedQual;
              if (typeof contentData.job_qualification === 'string') {
                parsedQual = JSON.parse(contentData.job_qualification);
                // If it's still a string after parsing, parse again
                if (typeof parsedQual === 'string') {
                  parsedQual = JSON.parse(parsedQual);
                }
              } else {
                parsedQual = contentData.job_qualification;
              }
              setJobQualifications(Array.isArray(parsedQual) ? parsedQual : []);
              console.log("Parsed job qualifications:", parsedQual);
            } catch (e) {
              console.error("Error parsing job qualifications:", e);
              console.log("Raw job_qualification data:", contentData.job_qualification);
              setJobQualifications([]);
            }
          } else {
            setJobQualifications([]);
          }
        } else {
          console.error("API returned error:", data);
          toast.error(data.message || "Career content not found");
          navigate("/cms/pages/web_career");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch career content:", err);
        toast.error("Failed to load career content: " + err.message);
        setLoading(false);
        navigate("/cms/pages/web_career");
      });
  };

  useEffect(() => {
    fetchCareerContent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => {
      const newState = { ...prev, [name]: value };
      if (name === "title") {
        newState.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/\?/g, "-");
      }
      return newState;
    });
  };

  const addJobRequirement = () => {
    if (newRequirement.trim()) {
      setJobRequirements(prev => [...prev, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeJobRequirement = (index) => {
    setJobRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const addJobQualification = () => {
    if (newQualification.trim()) {
      setJobQualifications(prev => [...prev, newQualification.trim()]);
      setNewQualification("");
    }
  };

  const removeJobQualification = (index) => {
    setJobQualifications(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Validation
    if (!values.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!values.des.trim()) {
      toast.error("Please enter a description");
      return;
    }

    // Prepare payload
    const payload = {
      ...values,
      job_req: jobRequirements.length > 0 ? JSON.stringify(jobRequirements) : "[]",
      job_qualification: jobQualifications.length > 0 ? JSON.stringify(jobQualifications) : "[]"
    };

    console.log("Updating career content with payload:", payload);
    console.log("Job Requirements Array:", jobRequirements);
    console.log("Job Qualifications Array:", jobQualifications);
    console.log("Update URL:", `${import.meta.env.VITE_CMS_URL}api/updatebyidcareer/${id}`);

    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidcareer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("Update response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Update result:", result);
        if (result.status) {
          toast.success("Career content updated successfully");
          navigate("/cms/pages/web_career");
        } else {
          toast.error(result.message || "Failed to update career content");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update career content: " + err.message);
      });
  };

  const handleCancel = () => {
    navigate("/cms/pages/web_career");
  };

  if (loading) {
    return (
      <div>
        <PageHeader currentpage="Edit Career Content" activepage="Pages" mainpage="Web Career" />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12">
            <div className="box">
              <div className="box-body">
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/cms/pages/web_career')}
          className="flex items-center gap-2 mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Careers
        </button>
      </div>
      <PageHeader currentpage="Edit Career Content" activepage="Pages" mainpage="Web Career" />

      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-12 xxl:col-span-12">
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
                  placeholder="Enter job title"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="ti-form-label">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={values.slug}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Auto-generated slug"
                  disabled
                />
              </div>

              {/* Date Display */}
              <div>
                <label className="ti-form-label">Date Display</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setValues(prev => ({
                      ...prev,
                      date_display: date ? date.toLocaleDateString() : ""
                    }));
                  }}
                  dateFormat="MMMM d, yyyy"
                  className="ti-form-input"
                  placeholderText="Select posting date"
                  isClearable
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="ti-form-label">Job Type</label>
                <select
                  name="job_type"
                  value={values.job_type}
                  onChange={handleInputChange}
                  className="ti-form-select"
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="ti-form-label">Experience</label>
                <input
                  type="text"
                  name="exprience"
                  value={values.exprience}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="e.g., 2-3 years"
                />
              </div>

              {/* Location */}
              <div>
                <label className="ti-form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter job location"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Job Description</h5>
            </div>
            <div className="box-body">
              <textarea
                name="des"
                value={values.des}
                onChange={handleInputChange}
                className="ti-form-input"
                placeholder="Enter detailed job description"
                rows="6"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-12">
          {/* Job Requirements */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Job Requirements</h5>
            </div>
            <div className="box-body space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  className="ti-form-input flex-1"
                  placeholder="Add a job requirement"
                  onKeyPress={(e) => e.key === 'Enter' && addJobRequirement()}
                />
                <button
                  type="button"
                  onClick={addJobRequirement}
                  className="ti-btn ti-btn-primary"
                >
                  Add
                </button>
              </div>

              {jobRequirements.length > 0 && (
                <div className="space-y-2">
                  {jobRequirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeJobRequirement(index)}
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

          {/* Job Qualifications */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Job Qualifications</h5>
            </div>
            <div className="box-body space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  className="ti-form-input flex-1"
                  placeholder="Add a job qualification"
                  onKeyPress={(e) => e.key === 'Enter' && addJobQualification()}
                />
                <button
                  type="button"
                  onClick={addJobQualification}
                  className="ti-btn ti-btn-primary"
                >
                  Add
                </button>
              </div>

              {jobQualifications.length > 0 && (
                <div className="space-y-2">
                  {jobQualifications.map((qual, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{qual}</span>
                      <button
                        type="button"
                        onClick={() => removeJobQualification(index)}
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

          {/* Status */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Status</h5>
            </div>
            <div className="box-body">
              <Select
                value={{
                  value: values.status,
                  label: values.status === 1 ? "Active" : "Inactive"
                }}
                options={[
                  { value: 1, label: "Active" },
                  { value: 0, label: "Inactive" },
                ]}
                onChange={(selected) =>
                  setValues((prev) => ({ ...prev, status: selected.value }))
                }
              />
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
                  Update Career Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCareerContent;
