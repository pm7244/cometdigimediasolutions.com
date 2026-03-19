import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';

const Testimonials = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    description: '',
    status: 1
  });

  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getalltestimonial`);
      if (response.ok) {
        const result = await response.json();
        setTestimonials(result.data || []);
        // If editing, populate form with current data
        if (editingId) {
          const editItem = result.data.find(item => item.testimonial_id === editingId);
          if (editItem) {
            setFormData({
              name: editItem.name || '',
              company: editItem.company || '',
              description: editItem.description || '',
              status: editItem.status || 1
            });
          }
        }
      } else {
        toast.error('Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const requestData = {
        name: formData.name,
        company: formData.company,
        description: formData.description,
        status: formData.status
      };

      const url = editingId 
        ? `${import.meta.env.VITE_CMS_URL}api/updatebyidtestimonial/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/createtestimonial`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success(editingId ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        setFormData({
          name: '',
          company: '',
          description: '',
          status: 1
        });
        setEditingId(null);
        fetchData();
      } else {
        toast.error('Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Error saving testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.testimonial_id);
    setFormData({
      name: testimonial.name || '',
      company: testimonial.company || '',
      description: testimonial.description || '',
      status: testimonial.status || 1
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidtestimonial/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Testimonial deleted successfully!');
          fetchData();
        } else {
          toast.error('Failed to delete testimonial');
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Error deleting testimonial');
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
      company: '',
      description: '',
      status: 1
    });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Testimonial Management">
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
      pageTitle="Testimonial Management" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Form Section */}
        <FormSection title="Testimonial Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Client Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter client name"
            />
            
            <InputField
              label="Company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </div>
          
          <InputField
            label="Testimonial Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Enter testimonial description"
            rows={5}
          />
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

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">        
        <StatusSelector
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        />
      </div>

      {/* Existing Testimonials Section - Full Width */}
      <div className="col-span-12">
        <FormSection title=" All Testimonials">
          {testimonials.length === 0 ? (
            <p className="text-gray-500">No testimonials found.</p>
          ) : (
            <div className="app-container">
              <table
                id="delete-datatable"
                className="ti-custom-table ti-custom-table-head ti-custom-table-hover"
              >
                <thead>
                  <tr className="border-b">
                    <th className="w-10 text-center">#</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <TestimonialRow
                      key={testimonial.testimonial_id}
                      testimonial={testimonial}
                      editingId={editingId}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
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

// Testimonial row component matching career enquiries structure
const TestimonialRow = ({ testimonial, editingId, onEdit, onDelete }) => {
  return (
    <tr className={editingId === testimonial.testimonial_id ? 'bg-blue-50' : ''}>
      <td className="text-center">{testimonial.testimonial_id}</td>
      <td className="">{testimonial.name}</td>
      <td className="">{testimonial.company || 'N/A'}</td>
      <td className="p-2 w-1/3">
        <textarea 
          rows={3} 
          value={testimonial.description || ''} 
          readOnly
          className="w-full resize-none border-none bg-transparent"
        />
      </td>
      <td className="">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          testimonial.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {testimonial.status === 1 ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="grid grid-cols-1 border-l">
        <div className="flex justify-center">
          <div className="hs-tooltip ti-main-tooltip">
            <button
              onClick={() => onEdit(testimonial)}
              className="hs-tooltip-toggle w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
            >
              <i className="ti ti-pencil"></i>
              <span
                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700 hidden"
                role="tooltip"
                data-popper-placement="top"
                style={{
                  position: "fixed",
                  inset: "auto auto 0px 0px",
                  margin: "0px",
                  transform: "translate(953px, -281px)",
                }}
              >
                Edit
              </span>
            </button>
          </div>
          <div className="hs-tooltip ti-main-tooltip">
            <button
              type="button"
              onClick={() => onDelete(testimonial.testimonial_id)}
              className="todo-remove hs-tooltip-toggle w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
            >
              <i className="ti ti-trash"></i>
              <span
                className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
                role="tooltip"
                data-popper-placement="top"
                style={{
                  position: "fixed",
                  inset: "auto auto 0px 0px",
                  margin: "0px",
                  transform: "translate(985px, -281px)",
                }}
              >
                Delete
              </span>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Testimonials;
