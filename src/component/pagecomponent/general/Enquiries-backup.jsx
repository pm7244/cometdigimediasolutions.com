import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';


const Enquiries = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    status: 1
  });

  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getallenquiries`);
      if (response.ok) {
        const result = await response.json();
        setEnquiries(result.data || []);
        // If editing, populate form with current data
        if (editingId) {
          const editItem = data.find(item => item.enquiry_id === editingId);
          if (editItem) {
            setFormData({
              name: editItem.name || '',
              email: editItem.email || '',
              phone: editItem.phone || '',
              subject: editItem.subject || '',
              message: editItem.message || '',
              status: editItem.status || 1
            });
          }
        }
      } else {
        toast.error('Failed to fetch enquiries');
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Error fetching enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingId 
        ? `${import.meta.env.VITE_CMS_URL}api/updatebyidenquiries/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/createenquiries`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      // Adjust form data to match backend expectations
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone_no: formData.phone,
        message: formData.subject + (formData.message ? ': ' + formData.message : ''),
        form_location: 'CMS',
        enquiry_status: formData.status
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success(editingId ? 'Enquiry updated successfully!' : 'Enquiry created successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          status: 1
        });
        setEditingId(null);
        fetchData();
      } else {
        toast.error('Failed to save enquiry');
      }
    } catch (error) {
      console.error('Error saving enquiry:', error);
      toast.error('Error saving enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (enquiry) => {
    setEditingId(enquiry.enquiry_id);
    // Parse the message to extract subject and message parts
    const messageParts = enquiry.message ? enquiry.message.split(':') : ['', ''];
    const subject = messageParts.length > 1 ? messageParts[0] : '';
    const message = messageParts.length > 1 ? messageParts.slice(1).join(':').trim() : enquiry.message || '';
    
    setFormData({
      name: enquiry.name || '',
      email: enquiry.email || '',
      phone: enquiry.phone_no || '',
      subject: subject,
      message: message,
      status: enquiry.enquiry_status || 1
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidenquiries/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Enquiry deleted successfully!');
          fetchData();
        } else {
          toast.error('Failed to delete enquiry');
        }
      } catch (error) {
        console.error('Error deleting enquiry:', error);
        toast.error('Error deleting enquiry');
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
      email: '',
      phone: '',
      subject: '',
      message: '',
      status: 1
    });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Enquiry Management">
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
      pageTitle="Enquiry Management" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Form Section */}
      
        
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

      {/* Right Column */}
    

      {/* Existing Enquiries Section - Full Width */}
      <div className="col-span-12">
        <FormSection title="Existing Enquiries">
          {enquiries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No enquiries found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left w-48">Name & Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-32">Phone</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-40">Subject</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-24">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.enquiry_id} className={editingId === enquiry.enquiry_id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2">
                        <div>
                          <div className="font-semibold text-gray-900">{enquiry.name}</div>
                          <div className="text-sm text-gray-500">{enquiry.email}</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="text-sm">{enquiry.phone_no || 'N/A'}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="text-sm">{enquiry.message?.split(':')[0] || 'No subject'}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="max-w-md" title={enquiry.message}>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {enquiry.message?.includes(':') 
                              ? enquiry.message.split(':', 2)[1]?.trim() || 'No message'
                              : enquiry.message || 'No message'
                            }
                          </p>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                          enquiry.enquiry_status === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            enquiry.enquiry_status === 1 ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          {enquiry.enquiry_status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                         
                          <button
                            onClick={() => handleDelete(enquiry.enquiry_id)}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
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
    
    </StandardPageLayout>
  );
};

export default Enquiries;
