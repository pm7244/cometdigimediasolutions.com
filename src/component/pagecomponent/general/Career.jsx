import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';
import InputField from '../../common/InputField';
import StatusSelector from '../../common/StatusSelector';

const Career = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date_display: '',
    des: '',
    job_req: '',
    job_qualification: '',
    job_type: 'Full-time',
    exprience: '',
    location: '',
    meta_title: '',
    meta_des: '',
    status: 1
  });

  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/career`);
      if (response.ok) {
        const result = await response.json();
        setCareers(result.data || []);
        // If editing, populate form with current data
        if (editingId) {
          const editItem = result.data.find(item => item.id === editingId);
          if (editItem) {
            setFormData({
              title: editItem.title || '',
              slug: editItem.slug || '',
              date_display: editItem.date_display ? editItem.date_display.split('T')[0] : '',
              des: editItem.des || '',
              job_req: editItem.job_req || '',
              job_qualification: editItem.job_qualification || '',
              job_type: editItem.job_type || 'Full-time',
              exprience: editItem.exprience || '',
              location: editItem.location || '',
              meta_title: editItem.meta_title || '',
              meta_des: editItem.meta_des || '',
              status: editItem.status || 1
            });
          }
        }
      } else {
        toast.error('Failed to fetch careers');
      }
    } catch (error) {
      console.error('Error fetching careers:', error);
      toast.error('Error fetching careers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingId 
        ? `${import.meta.env.VITE_CMS_URL}api/career/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/career`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingId ? 'Career updated successfully!' : 'Career created successfully!');
        setFormData({
          title: '',
          slug: '',
          date_display: '',
          des: '',
          job_req: '',
          job_qualification: '',
          job_type: 'Full-time',
          exprience: '',
          location: '',
          meta_title: '',
          meta_des: '',
          status: 1
        });
        setEditingId(null);
        fetchData();
      } else {
        toast.error('Failed to save career');
      }
    } catch (error) {
      console.error('Error saving career:', error);
      toast.error('Error saving career');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (career) => {
    setEditingId(career.id);
    setFormData({
      title: career.title || '',
      slug: career.slug || '',
      date_display: career.date_display ? career.date_display.split('T')[0] : '',
      des: career.des || '',
      job_req: career.job_req || '',
      job_qualification: career.job_qualification || '',
      job_type: career.job_type || 'Full-time',
      exprience: career.exprience || '',
      location: career.location || '',
      meta_title: career.meta_title || '',
      meta_des: career.meta_des || '',
      status: career.status || 1
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this career?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/career/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Career deleted successfully!');
          fetchData();
        } else {
          toast.error('Failed to delete career');
        }
      } catch (error) {
        console.error('Error deleting career:', error);
        toast.error('Error deleting career');
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
      slug: '',
      date_display: '',
      des: '',
      job_req: '',
      job_qualification: '',
      job_type: 'Full-time',
      exprience: '',
      location: '',
      meta_title: '',
      meta_des: '',
      status: 1
    });
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Career Management">
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
      pageTitle="Career Management" 
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column */}
      <div className="col-span-12 xxl:col-span-12">
        {/* Career Information */}
        <FormSection title="Career Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter job title"
            />
            
            <InputField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="job-title-slug"
            />
            
            <InputField
              label="Job Type"
              name="job_type"
              value={formData.job_type}
              onChange={handleInputChange}
              placeholder="e.g., Full-time, Part-time"
            />
            
            <InputField
              label="Experience Required"
              name="exprience"
              value={formData.exprience}
              onChange={handleInputChange}
              placeholder="e.g., 2-3 years"
            />
            
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Job location"
            />
            
            <InputField
              label="Display Date"
              type="date"
              name="date_display"
              value={formData.date_display}
              onChange={handleInputChange}
            />
          </div>
          
          <InputField
            label="Job Description"
            type="textarea"
            name="des"
            value={formData.des}
            onChange={handleInputChange}
            placeholder="Enter job description"
            rows={4}
          />
          
          <InputField
            label="Job Requirements"
            type="textarea"
            name="job_req"
            value={formData.job_req}
            onChange={handleInputChange}
            placeholder="Enter job requirements"
            rows={4}
          />
          
          <InputField
            label="Job Qualifications"
            type="textarea"
            name="job_qualification"
            value={formData.job_qualification}
            onChange={handleInputChange}
            placeholder="Enter job qualifications"
            rows={4}
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
      </div>

      {/* Right Column */}
      <div className="col-span-12 xxl:col-span-12">
        <StatusSelector
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        />
      </div>

      {/* Existing Careers Section - Full Width */}
      <div className="col-span-12">
        <FormSection title="Existing Careers">
          {careers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No careers found. Create your first career posting above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Job Title</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careers.map((career) => (
                    <tr key={career.career_id} className={editingId === career.career_id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2">
                        <div>
                          <div className="font-medium">{career.title}</div>
                          <div className="text-sm text-gray-500">{career.slug}</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{career.job_type}</td>
                      <td className="border border-gray-300 px-4 py-2">{career.location || 'Not specified'}</td>
                      <td className="border border-gray-300 px-4 py-2">{career.exprience || 'Not specified'}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          career.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {career.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(career)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(career.id)}
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
    </StandardPageLayout>
  );
};

export default Career;
