import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';
import Filemanagermain from '../fileManager/filemanagermain';

const Service = () => {
  const [formData, setFormData] = useState({
    title: '',
    short_des: '',
    Description: '',
    slug: '',
    icon: '',
    cover_img: '',
    approach: '',
    video: '',
    benefits: '',
    status: 1
  });

  const [selectedIcon, setSelectedIcon] = useState([]);
  const [selectedCoverImage, setSelectedCoverImage] = useState([]);
  const [managerOpener, setManagerOpener] = useState(0);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getallservice`);
      if (response.ok) {
        const result = await response.json();
        setServices(result.data || []);
        // If editing, populate form with current data
        if (editingId) {
          const editItem = result.data.find(item => item.s_id === editingId);
          if (editItem) {
            setFormData({
              title: editItem.title || '',
              short_des: editItem.short_des || '',
              Description: editItem.des || '',  // Note: backend uses 'des' not 'Description'
              slug: editItem.slug || '',
              icon: editItem.icon || '',
              cover_img: editItem.cover_img || '',
              approach: editItem.approach || '',
              video: editItem.video || '',
              benefits: editItem.benefits || '',
              status: editItem.status || 1
            });
            // Handle icon array
            setSelectedIcon(editItem.icon ? [editItem.icon] : []);
            
            // Handle cover image array
            let coverImages = [];
            if (editItem.cover_img) {
              try {
                const parsed = JSON.parse(editItem.cover_img);
                coverImages = Array.isArray(parsed) ? parsed : [editItem.cover_img];
              } catch (e) {
                coverImages = [editItem.cover_img];
              }
            }
            setSelectedCoverImage(coverImages);
          }
        }
      } else {
        toast.error('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append images if selected
      if (selectedIcon && selectedIcon.length > 0) {
        formDataToSend.append('icon', JSON.stringify(selectedIcon));
      }
      
      if (selectedCoverImage && selectedCoverImage.length > 0) {
        formDataToSend.append('cover_img', JSON.stringify(selectedCoverImage));
      }

      const url = editingId 
        ? `${import.meta.env.VITE_CMS_URL}api/updatebyidservice/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/createservice`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(editingId ? 'Service updated successfully!' : 'Service created successfully!');
        setFormData({
          title: '',
          short_des: '',
          Description: '',
          slug: '',
          icon: '',
          cover_img: '',
          approach: '',
          video: '',
          benefits: '',
          status: 1
        });
        setSelectedIcon([]);
        setSelectedCoverImage([]);
        setEditingId(null);
        fetchData();
      } else {
        toast.error('Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Error saving service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.s_id);
    setFormData({
      title: service.title || '',
      short_des: service.short_des || '',
      Description: service.Description || '',
      slug: service.slug || '',
      icon: service.icon || '',
      cover_img: service.cover_img || '',
      approach: service.approach || '',
      video: service.video || '',
      benefits: service.benefits || '',
      status: service.status || 1
    });
    setSelectedIcon(service.icon ? `${import.meta.env.VITE_CMS_URL}uploads/service/${service.icon}` : null);
    setSelectedCoverImage(service.cover_img ? `${import.meta.env.VITE_CMS_URL}uploads/service/${service.cover_img}` : null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidservice/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Service deleted successfully!');
          fetchData();
        } else {
          toast.error('Failed to delete service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Error deleting service');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      short_des: '',
      Description: '',
      slug: '',
      icon: '',
      cover_img: '',
      approach: '',
      video: '',
      benefits: '',
      status: 1
    });
    setSelectedIcon([]);
    setSelectedCoverImage([]);
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Service Management">
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
    <>
      {managerOpener === 1 ? (
        <Filemanagermain
          file={selectedIcon}
          fileSetter={setSelectedIcon}
          openSetter={setManagerOpener}
          maxFiles={1}
          ratio={1}
          type="image"
        />
      ) : managerOpener === 2 ? (
        <Filemanagermain
          file={selectedCoverImage}
          fileSetter={setSelectedCoverImage}
          openSetter={setManagerOpener}
          maxFiles={1}
          ratio={16 / 9}
          type="image"
        />
      ) : (
        <StandardPageLayout 
      pageTitle="Service Management" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Form Section */}
        <FormSection title="Service Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter service title"
            />
            
            <InputField
              label="Slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleInputChange}
              required
              placeholder="Enter service slug"
            />
          </div>
          
          <InputField
            label="Short Description"
            name="short_des"
            type="textarea"
            value={formData.short_des}
            onChange={handleInputChange}
            placeholder="Enter short description"
            rows={3}
          />
          
          <InputField
            label="Description"
            name="Description"
            type="textarea"
            value={formData.Description}
            onChange={handleInputChange}
            placeholder="Enter full description"
            rows={5}
          />
          
          <InputField
            label="Approach"
            name="approach"
            type="textarea"
            value={formData.approach}
            onChange={handleInputChange}
            placeholder="Enter service approach"
            rows={4}
          />
          
          <InputField
            label="Benefits"
            name="benefits"
            type="textarea"
            value={formData.benefits}
            onChange={handleInputChange}
            placeholder="Enter service benefits"
            rows={4}
          />
          
          <InputField
            label="Video URL"
            name="video"
            type="url"
            value={formData.video}
            onChange={handleInputChange}
            placeholder="Enter video URL (optional)"
          />
        </FormSection>
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        <FormSection title="Service Icon" className="space-y-2">
          <button
            type="button"
            onClick={() => setManagerOpener(1)}
            className="ti-btn ti-btn-outline-primary w-full"
          >
            {selectedIcon.length > 0 ? "Change Service Icon" : "Select Service Icon"}
          </button>
          {selectedIcon.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedIcon.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={`${import.meta.env.VITE_CMS_URL}api/transform/${img}`}
                    className="w-20 h-20 rounded object-cover border"
                    alt={`Icon ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = selectedIcon.filter((_, i) => i !== index);
                      setSelectedIcon(newImages);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormSection>
        
        <FormSection title="Cover Image" className="space-y-2">
          <button
            type="button"
            onClick={() => setManagerOpener(2)}
            className="ti-btn ti-btn-outline-primary w-full"
          >
            {selectedCoverImage.length > 0 ? "Change Cover Image" : "Select Cover Image"}
          </button>
          {selectedCoverImage.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCoverImage.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={`${import.meta.env.VITE_CMS_URL}api/transform/${img}`}
                    className="w-20 h-20 rounded object-cover border"
                    alt={`Cover ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = selectedCoverImage.filter((_, i) => i !== index);
                      setSelectedCoverImage(newImages);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormSection>
        
        <StatusSelector
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        />
      </div>

      {/* Existing Services Section - Full Width */}
      <div className="col-span-12">
        <FormSection title="Existing Services">
          {services.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No services found. Create your first service above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Icon</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Service Title</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Short Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.s_id} className={editingId === service.s_id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2">
                        {service.icon ? (
                          <img 
                            src={`${import.meta.env.VITE_CMS_URL}uploads/service/${service.icon}`}
                            alt={service.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                            No Icon
                          </div>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div>
                          <div className="font-medium">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.slug}</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="max-w-xs truncate" title={service.short_des}>
                          {service.short_des || 'Not specified'}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          service.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {service.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service.s_id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </FormSection>
        
        {editingId && (
          <div className="mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          </div>
        )}
      </div>
    </StandardPageLayout>
      )}
    </>
  );
};

export default Service;
