import React, { useEffect, useState } from "react";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";

const WebContact = () => {
  const [values, setValues] = useState({
    hero_title: "",
    meta_title: "",
    meta_des: "",
    status: 1,
    form_title: "",
    form_des: "",
    iframe: ""
  });

  const [iframeError, setIframeError] = useState(false);

  const fetchData = () => {
    // Fetch web_contact data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallcontact`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Contact data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const contactData = data.data[0];
          
          setValues({
            hero_title: contactData.hero_title || "",
            meta_title: contactData.meta_title || "",
            meta_des: contactData.meta_des || "",
            status: contactData.status || 1,
            form_title: contactData.form_title || "",
            form_des: contactData.form_des || "",
            iframe: contactData.iframe || ""
          });
        } else {
          console.log("No contact data found, using defaults");
          setValues({
            hero_title: "",
            meta_title: "",
            meta_des: "",
            status: 1,
            form_title: "",
            form_des: "",
            iframe: ""
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch contact data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate iframe if it's being changed
    if (name === "iframe") {
      if (value.trim()) {
        // Basic validation for iframe tag
        const iframeRegex = /<iframe[^>]*>.*?<\/iframe>/i;
        setIframeError(!iframeRegex.test(value.trim()));
      } else {
        setIframeError(false);
      }
    }
  };

  const handleSubmit = () => {
    // Prepare payload
    const payload = { ...values };
    console.log("Submitting payload:", payload);
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidcontact/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((result) => {
        console.log("Update result:", result);
        if (result.status) {
          toast.success("Contact page updated successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to update contact page");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update contact page");
      });
  };

  return (
    <div>
      <PageHeader currentpage="Web Contact" activepage="Pages" mainpage="Web Contact" />
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
            </div>
          </div>

          {/* Form Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Contact Form Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Form Title */}
              <div>
                <label className="ti-form-label">Form Title</label>
                <input
                  type="text"
                  name="form_title"
                  value={values.form_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Form Title"
                />
              </div>

              {/* Form Description */}
              <div>
                <label className="ti-form-label">Form Description</label>
                <textarea
                  name="form_des"
                  value={values.form_des || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Form Description"
                  rows="4"
                />
              </div>

              {/* Iframe */}
              <div >
                <label className="ti-form-label">Map Iframe</label>
                <textarea
                  name="iframe"
                  value={values.iframe || ""}
                  onChange={handleInputChange}
                  className={`ti-form-input ${iframeError ? 'border-red-500' : ''}`}
                  placeholder="Enter Google Map Iframe Code (e.g., <iframe src='...'></iframe>)"
                  rows="4"
                />
                <small className={`mt-1 block ${iframeError ? 'text-red-500' : 'text-gray-500'}`}>
                  {iframeError 
                    ? "Invalid iframe format. Please ensure you have a complete <iframe>...</iframe> tag."
                    : "Paste your Google Maps embed iframe code here. Changes will be reflected in the preview below."
                  }
                </small>
              </div>

              {/* Live Iframe Preview */}
              <div className="col-span-full">
                <label className="ti-form-label">Map Preview</label>
                <div className="border rounded-lg p-2 bg-gray-50 w-full">
                  {values.iframe && !iframeError ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: values.iframe }}
                      className="w-full h-[400px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 [&>iframe]:rounded"
                      style={{ 
                        display: 'block',
                        width: '100%',
                        minHeight: '400px'
                      }}
                    />
                  ) : values.iframe && iframeError ? (
                    <div className="flex items-center justify-center h-[400px] text-red-500">
                      <div className="text-center">
                        <i className="ti ti-alert-triangle text-4xl mb-2"></i>
                        <p>Invalid iframe format</p>
                        <p className="text-sm">Please check your iframe code above</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px] text-gray-500">
                      <div className="text-center">
                        <i className="ti ti-map-pin text-4xl mb-2"></i>
                        <p>No map iframe provided</p>
                        <p className="text-sm">Add iframe code above to see live preview</p>
                      </div>
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

export default WebContact;
