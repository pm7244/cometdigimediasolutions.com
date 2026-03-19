import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCareerContent = () => {
  const navigate = useNavigate();

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

    console.log("Creating career with payload:", payload);
    console.log("Job Requirements Array:", jobRequirements);
    console.log("Job Qualifications Array:", jobQualifications);

    fetch(`${import.meta.env.VITE_CMS_URL}api/createcareer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Career content created successfully");
          navigate("/cms/pages/web_career");
        } else {
          toast.error(result.message || "Failed to create career content");
        }
      })
      .catch((err) => {
        console.error("Create error:", err);
        toast.error("Failed to create career content");
      });
  };

  const handleCancel = () => {
    navigate("/cms/pages/web_career");
  };

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
      <PageHeader currentpage="Create Career Content" activepage="Pages" mainpage="Web Career" />

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
        <div className="col-span-12 xxl:col-span-6">
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
                  Create Career Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCareerContent;
