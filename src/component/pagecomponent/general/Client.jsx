import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';
import ImageManager from '../../common/ImageManager';

const Client = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    meta_title: '',
    meta_des: '',
    status: 1
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/clients`);
      if (response.ok) {
        const result = await response.json();
        setClients(result.data || []);
        // If editing, populate form with current data
        if (editingId) {
          const editItem = result.data.find(item => item.client_id === editingId);
          if (editItem) {
            setFormData({
              name: editItem.name || '',
              description: editItem.description || '',
              website: editItem.website || '',
              meta_title: editItem.meta_title || '',
              meta_des: editItem.meta_des || '',
              status: editItem.status || 1
            });
            setSelectedImage(editItem.logo ? `${import.meta.env.VITE_CMS_URL}uploads/client/${editItem.logo}` : null);
          }
        }
      } else {
        toast.error('Failed to fetch clients');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error fetching clients');
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
      
      // Append image if selected
      if (selectedImage && typeof selectedImage === 'object') {
        formDataToSend.append('logo', selectedImage);
      }

      const url = editingId 
        ? `${import.meta.env.VITE_CMS_URL}api/clients/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/clients`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(editingId ? 'Client updated successfully!' : 'Client created successfully!');
        setFormData({
          name: '',
          description: '',
          website: '',
          meta_title: '',
          meta_des: '',
          status: 1
        });
        setSelectedImage(null);
        setEditingId(null);
        fetchData();
      } else {
        toast.error('Failed to save client');
      }
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Error saving client');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.client_id);
    setFormData({
      name: client.name || '',
      description: client.description || '',
      website: client.website || '',
      meta_title: client.meta_title || '',
      meta_des: client.meta_des || '',
      status: client.status || 1
    });
    setSelectedImage(client.logo ? `${import.meta.env.VITE_CMS_URL}uploads/client/${client.logo}` : null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/clients/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Client deleted successfully!');
          fetchData();
        } else {
          toast.error('Failed to delete client');
        }
      } catch (error) {
        console.error('Error deleting client:', error);
        toast.error('Error deleting client');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      website: '',
      meta_title: '',
      meta_des: '',
      status: 1
    });
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Client Management">
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
      pageTitle="Client Management" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Client Information */}
        <FormSection title="Client Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Client Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter client name"
            />
            
            <InputField
              label="Website"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://client-website.com"
            />
          </div>
          
          <InputField
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter client description"
            rows={4}
          />
        </FormSection>

        {/* Client Logo */}
        <FormSection title="Client Logo">
          <ImageManager
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            accept="image/*"
            maxSize={5}
            label="Upload Client Logo"
          />
        </FormSection>

        {/* SEO Information */}
        <FormSection title="SEO Information">
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Meta Title"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleInputChange}
              placeholder="Enter meta title"
            />
            
            <InputField
              label="Meta Description"
              type="textarea"
              name="meta_des"
              value={formData.meta_des}
              onChange={handleInputChange}
              placeholder="Enter meta description"
              rows={3}
            />
          </div>
        </FormSection>

        {/* Data List Section */}
        <FormSection title="Existing Clients">
          {clients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No clients found. Create your first client above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Logo</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Client Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Website</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.client_id} className={editingId === client.client_id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2">
                        {client.logo ? (
                          <img 
                            src={`${import.meta.env.VITE_CMS_URL}uploads/client/${client.logo}`}
                            alt={client.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                            No Logo
                          </div>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{client.name}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {client.website ? (
                          <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {client.website}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="max-w-xs truncate" title={client.description}>
                          {client.description || 'No description'}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          client.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {client.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(client)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(client.client_id)}
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
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        <StatusSelector
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        />
      </div>
    </StandardPageLayout>
  );
};

export default Client;
