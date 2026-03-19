import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';

const Address = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone_no: '',
    latitude: '',
    longitude: '',
    status: 1
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch address data on component mount
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getalladdress`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Address data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const addressData = data.data[0];
          setValues({
            name: addressData.name || "",
            email: addressData.email || "",
            address: addressData.address || "",
            city: addressData.city || "",
            phone_no: addressData.phone_no || "",
            latitude: addressData.latitude || "",
            longitude: addressData.longitude || "",
            status: addressData.status || 1
          });
        } else {
          console.log("No address data found, using defaults");
        }
      })
      .catch((err) => {
        console.error("Error fetching address data:", err);
        toast.error(`Failed to fetch address data: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Check if we have an existing address (update) or creating new
    const hasExistingData = values.name || values.email || values.address;
    const url = hasExistingData 
      ? `${import.meta.env.VITE_CMS_URL}api/updatebyidaddress/1`
      : `${import.meta.env.VITE_CMS_URL}api/createaddress`;
    
    const method = hasExistingData ? "PUT" : "POST";
    
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Address data saved successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to save address data");
        }
      })
      .catch((err) => {
        console.error("Save error:", err);
        toast.error("Failed to save address data");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Address">
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

  return (
    <StandardPageLayout 
      pageTitle="Address" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Contact Information */}
        <FormSection title="Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
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
            <InputField
              label="City"
              name="city"
              value={values.city}
              onChange={handleInputChange}
              placeholder="Enter City"
            />
          </div>
          
          <InputField
            label="Address"
            type="textarea"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            placeholder="Enter Address"
            rows={3}
          />
        </FormSection>

        {/* Location Coordinates */}
     
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        <StatusSelector
          value={values.status}
          onChange={(value) => setValues(prev => ({ ...prev, status: value }))}
        />
      </div>
    </StandardPageLayout>
  );
};

export default Address;