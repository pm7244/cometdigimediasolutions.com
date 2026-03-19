import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';
import ImageManager from '../../common/ImageManager';
import Filemanagermain from '../fileManager/filemanagermain';

const Team = () => {
  const [values, setValues] = useState({
    image: '',
    name: '',
    post: '',
    des: '',
    email: '',
    phone_no: '',
    linkedin: '',
    instagram: '',
    status: 1
  });
  const [teamImages, setTeamImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [managerOpener, setManagerOpener] = useState(false);

  // Fetch team data on component mount
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallteam`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Team data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const teamData = data.data[0];
          
          // Parse image data
          let imageData = [];
          try {
            if (teamData.image) {
              imageData = Array.isArray(teamData.image) 
                ? teamData.image 
                : [teamData.image];
            }
          } catch (e) {
            console.error("Error parsing image data:", e);
          }
          
          setTeamImages(imageData);
          setValues({
            image: teamData.image || "",
            name: teamData.name || "",
            post: teamData.post || "",
            des: teamData.des || "",
            email: teamData.email || "",
            phone_no: teamData.phone_no || "",
            linkedin: teamData.linkedin || "",
            instagram: teamData.instagram || "",
            status: teamData.status || 1
          });
        } else {
          console.log("No team data found, using defaults");
        }
      })
      .catch((err) => {
        console.error("Error fetching team data:", err);
        toast.error(`Failed to fetch team data: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update values when image changes
  useEffect(() => {
    if (teamImages && teamImages.length > 0) {
      setValues(prev => ({ ...prev, image: teamImages[0] }));
    } else {
      setValues(prev => ({ ...prev, image: "" }));
    }
  }, [teamImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Check if we have an existing team member (update) or creating new
    const hasExistingData = values.name || values.email;
    const url = hasExistingData 
      ? `${import.meta.env.VITE_CMS_URL}api/updatebyidteam/1`
      : `${import.meta.env.VITE_CMS_URL}api/createteam`;
    
    const method = hasExistingData ? "PUT" : "POST";
    
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Team data saved successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to save team data");
        }
      })
      .catch((err) => {
        console.error("Save error:", err);
        toast.error("Failed to save team data");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Team">
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
      file={teamImages}
      fileSetter={setTeamImages}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={1}
      type="image"
    />
  ) : (
    <StandardPageLayout 
      pageTitle="Team" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Basic Information */}
        <FormSection title="Team Member Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              required
            />
            <InputField
              label="Position/Role"
              name="post"
              value={values.post}
              onChange={handleInputChange}
              placeholder="Enter Position (e.g., Senior Developer)"
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
            <InputField
              label="Phone Number"
              name="phone_no"
              value={values.phone_no}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
            />
          </div>
          
          <InputField
            label="Description"
            type="textarea"
            name="des"
            value={values.des}
            onChange={handleInputChange}
            placeholder="Enter team member description"
            rows={4}
          />
        </FormSection>

        {/* Social Media Links */}
        <FormSection title="Social Media Links">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="LinkedIn URL"
              name="linkedin"
              value={values.linkedin}
              onChange={handleInputChange}
              placeholder="Enter LinkedIn profile URL"
            />
            <InputField
              label="Instagram URL"
              name="instagram"
              value={values.instagram}
              onChange={handleInputChange}
              placeholder="Enter Instagram profile URL"
            />
          </div>
        </FormSection>
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Team Member Image */}
        <div className="box">
          <div className="box-header">
            <h5 className="box-title">Team Member Image</h5>
          </div>
          <div className="box-body space-y-4">
            <button
              type="button"
              className="ti-btn ti-btn-outline-primary w-full"
              onClick={() => setManagerOpener(true)}
            >
              {teamImages.length > 0 ? "Change Image" : "Select Image"}
            </button>
            {teamImages.length > 0 && (
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_CMS_URL}api/transform/${teamImages[0]}`}
                  className="w-full h-48 rounded-sm object-cover border"
                  alt="Team Member"
                />
                <button
                  type="button"
                  onClick={() => setTeamImages([])}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <StatusSelector
          value={values.status}
          onChange={(value) => setValues(prev => ({ ...prev, status: value }))}
        />
      </div>
    </StandardPageLayout>
  );
};

export default Team;
