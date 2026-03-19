import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';
import ImageManager from '../../common/ImageManager';
import Filemanagermain from '../fileManager/filemanagermain';

const Portfolio = () => {
  const [values, setValues] = useState({
    hero_title: '',
    hero_image: '',
    date: '',
    brand: '',
    status: 1
  });
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [managerOpener, setManagerOpener] = useState(false);

  // Fetch portfolio data on component mount
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallportfolio`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Portfolio data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const portfolioData = data.data[0];
          
          // Parse image data
          let imageData = [];
          try {
            if (portfolioData.image) {
              imageData = Array.isArray(portfolioData.image) 
                ? portfolioData.image 
                : [portfolioData.image];
            }
          } catch (e) {
            console.error("Error parsing image data:", e);
          }
          
          setPortfolioImages(imageData);
          setValues({
            hero_title: portfolioData.hero_title || "",
            hero_image: portfolioData.hero_image || "",
            date: portfolioData.date ? portfolioData.date.split('T')[0] : "",
            brand: portfolioData.brand || "",
            status: portfolioData.status || 1
          });
        } else {
          console.log("No portfolio data found, using defaults");
        }
      })
      .catch((err) => {
        console.error("Error fetching portfolio data:", err);
        toast.error(`Failed to fetch portfolio data: ${err.message}`);
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
    if (portfolioImages && portfolioImages.length > 0) {
      setValues(prev => ({ ...prev, hero_image: portfolioImages[0] }));
    } else {
      setValues(prev => ({ ...prev, hero_image: "" }));
    }
  }, [portfolioImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Check if we have an existing portfolio (update) or creating new
    const hasExistingData = values.title || values.slug;
    const url = hasExistingData 
      ? `${import.meta.env.VITE_CMS_URL}api/updatebyidportfolio/1`
      : `${import.meta.env.VITE_CMS_URL}api/createportfolio`;
    
    const method = hasExistingData ? "PUT" : "POST";
    
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Portfolio data saved successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to save portfolio data");
        }
      })
      .catch((err) => {
        console.error("Save error:", err);
        toast.error("Failed to save portfolio data");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Portfolio">
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
      file={portfolioImages}
      fileSetter={setPortfolioImages}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16/9}
      type="image"
    />
  ) : (
    <StandardPageLayout 
      pageTitle="Portfolio" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Project Information */}
        <FormSection title="Portfolio Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Hero Title"
              name="hero_title"
              value={values.hero_title}
              onChange={handleInputChange}
              placeholder="Enter Hero Title"
              required
            />
            <InputField
              label="Brand Name"
              name="brand"
              value={values.brand}
              onChange={handleInputChange}
              placeholder="Enter Brand Name"
              required
            />
            <InputField
              label="Date"
              name="date"
              type="date"
              value={values.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </FormSection>
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Project Image */}
        <div className="box">
          <div className="box-header">
            <h5 className="box-title">Project Image</h5>
          </div>
          <div className="box-body space-y-4">
            <button
              type="button"
              className="ti-btn ti-btn-outline-primary w-full"
              onClick={() => setManagerOpener(true)}
            >
              {portfolioImages.length > 0 ? "Change Image" : "Select Image"}
            </button>
            {portfolioImages.length > 0 && (
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_CMS_URL}api/transform/${portfolioImages[0]}`}
                  className="w-full h-48 rounded-sm object-cover border"
                  alt="Portfolio Project"
                />
                <button
                  type="button"
                  onClick={() => setPortfolioImages([])}
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

export default Portfolio;
