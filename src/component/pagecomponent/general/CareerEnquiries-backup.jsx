import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import StandardPageLayout from '../../common/StandardPageLayout';
import FormSection from '../../common/FormSection';


const CareerEnquiries = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    introduction: '',
    status: 1
  });

  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getalljob`);
      if (response.ok) {
        const result = await response.json();
        setJobApplications(result.data || []);
      } else {
        toast.error('Failed to fetch job applications');
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
      toast.error('Error fetching job applications');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId
        ? `${import.meta.env.VITE_CMS_URL}api/updatebyidjob/${editingId}`
        : `${import.meta.env.VITE_CMS_URL}api/createjob`;

      const method = editingId ? 'PUT' : 'POST';

      // Adjust form data to match backend expectations
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        introduction: formData.introduction,
        status: formData.status
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success(editingId ? 'Job application updated successfully!' : 'Job application created successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          introduction: '',
          status: 1
        });
        setEditingId(null);
        fetchData();
      } else {
        toast.error('Failed to save job application');
      }
    } catch (error) {
      console.error('Error saving job application:', error);
      toast.error('Error saving job application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (application) => {
    setEditingId(application.job_id);
    setFormData({
      name: application.name || '',
      email: application.email || '',
      phone: application.phone || '',
      experience: application.experience || '',
      introduction: application.introduction || '',
      status: application.status || 1
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidjob/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Job application deleted successfully!');
          fetchData();
        } else {
          toast.error('Failed to delete job application');
        }
      } catch (error) {
        console.error('Error deleting job application:', error);
        toast.error('Error deleting job application');
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
      experience: '',
      introduction: '',
      status: 1
    });
  };

  const handleDownloadResume = (resumeFilename) => {
    if (resumeFilename) {
      const resumeUrl = `${import.meta.env.VITE_CMS_URL}upload/resumes/${resumeFilename}`;
      window.open(resumeUrl, '_blank');
    } else {
      toast.error('Resume file not available');
    }
  };

  if (loading) {
    return (
      <StandardPageLayout pageTitle="Career Enquiries">
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
      pageTitle="Career Enquiries"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Left Column - Form */}
  

      {/* Right Column - Table */}
      <div className="col-span-12 xxl:col-span-12">
        <FormSection title="Job Applications">
          {jobApplications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No job applications found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left w-40">Name & Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-24">Phone</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-20">Experience</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Introduction</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-20">Resume</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-20">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((application) => (
                    <tr key={application.job_id} className={editingId === application.job_id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2">
                        <div>
                          <div className="font-semibold text-gray-900">{application.name}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="text-sm">{application.phone || 'N/A'}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className="text-sm">{application.experience || 'N/A'}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="max-w-xs" title={application.introduction}>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {application.introduction || 'No introduction'}
                          </p>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {application.resume ? (
                          <button
                            onClick={() => handleDownloadResume(application.resume)}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          >
                            📄 Download
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No resume</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                          application.status === 1
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            application.status === 1 ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          {application.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-2">
                         
                          <button
                            onClick={() => handleDelete(application.job_id)}
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

export default CareerEnquiries;
