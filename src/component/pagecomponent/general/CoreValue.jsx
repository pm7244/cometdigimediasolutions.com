import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';
import ImageManager from '../../common/ImageManager';
import Filemanagermain from '../fileManager/filemanagermain';

const CoreValue = () => {
  const [values, setValues] = useState({
    title: '',
    des: '',
    icon: '',
    status: 1
  });
  const [iconImages, setIconImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [managerOpener, setManagerOpener] = useState(false);

  // Fetch core value data on component mount
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallcore`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Core Value data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const coreData = data.data[0];
          
          // Parse icon data
          let iconData = [];
          try {
            if (coreData.icon) {
              iconData = Array.isArray(coreData.icon) 
                ? coreData.icon 
                : [coreData.icon];
            }
          } catch (e) {
            console.error("Error parsing icon data:", e);
          }
          
          setIconImages(iconData);
          setValues({
            title: coreData.title || "",
            des: coreData.des || "",
            icon: coreData.icon || "",
            status: coreData.status || 1
          });
        } else {
          console.log("No core value data found, using defaults");
        }
      })
      .catch((err) => {
        console.error("Error fetching core value data:", err);
        toast.error(`Failed to fetch core value data: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update values when icon changes
  useEffect(() => {
    if (iconImages && iconImages.length > 0) {
      setValues(prev => ({ ...prev, icon: iconImages[0] }));
    } else {
      setValues(prev => ({ ...prev, icon: "" }));
    }
  }, [iconImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Check if we have an existing core value (update) or creating new
    const hasExistingData = values.title || values.des;
    const url = hasExistingData 
      ? `${import.meta.env.VITE_CMS_URL}api/updatebyidcore/1`
      : `${import.meta.env.VITE_CMS_URL}api/createcore`;
    
    const method = hasExistingData ? "PUT" : "POST";
    
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Core Value data saved successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to save core value data");
        }
      })
      .catch((err) => {
        console.error("Save error:", err);
        toast.error("Failed to save core value data");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Core Value">
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
      file={iconImages}
      fileSetter={setIconImages}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={1}
      type="image"
    />
  ) : (
    <StandardPageLayout 
      pageTitle="Core Value" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Core Value Information */}
        <FormSection title="Core Value Information">
          <InputField
            label="Core Value Title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            placeholder="Enter Core Value Title"
            required
          />
          
          <InputField
            label="Core Value Description"
            type="textarea"
            name="des"
            value={values.des}
            onChange={handleInputChange}
            placeholder="Enter Core Value Description"
            rows={6}
            required
          />
        </FormSection>
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Icon */}
        <div className="box">
          <div className="box-header">
            <h5 className="box-title">Core Value Icon</h5>
          </div>
          <div className="box-body space-y-4">
            <button
              type="button"
              className="ti-btn ti-btn-outline-primary w-full"
              onClick={() => setManagerOpener(true)}
            >
              {iconImages.length > 0 ? "Change Icon" : "Select Icon"}
            </button>
            {iconImages.length > 0 && (
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_CMS_URL}api/transform/${iconImages[0]}`}
                  className="w-full h-32 rounded-sm object-cover border"
                  alt="Core Value Icon"
                />
                <button
                  type="button"
                  onClick={() => setIconImages([])}
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

export default CoreValue;
