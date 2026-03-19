import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getallenquiries`);
      if (response.ok) {
        const result = await response.json();
        if (result.status && result.data) {
          setEnquiries(result.data);
        } else {
          setEnquiries([]);
        }
      } else {
        toast.error('Failed to fetch enquiries');
        setEnquiries([]);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Error fetching enquiries');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidenquirystatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enquiry_status: newStatus }),
      });

      if (response.ok) {
        toast.success('Status updated successfully!');
        fetchData();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      0: { label: 'Unread', color: 'bg-yellow-100 text-yellow-800' },
      1: { label: 'Read', color: 'bg-blue-100 text-blue-800' },
      2: { label: 'Accepted', color: 'bg-green-100 text-green-800' },
      3: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status] || statusConfig[0];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${config.color}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
          status === 0 ? 'bg-yellow-500' : 
          status === 1 ? 'bg-blue-500' : 
          status === 2 ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div>
      <PageHeader currentpage="Enquiry Management" activepage="General" mainpage="Enquiries" />
      
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Enquiry Management</h5>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={fetchData}
                    className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className="box-body">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading enquiries...</span>
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No enquiries found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          NAME & EMAIL
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          PHONE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          MESSAGE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          FORM LOCATION
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          DATE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          STATUS
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {enquiries.map((enquiry, index) => (
                        <tr key={enquiry.enquiry_id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {enquiry.name || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {enquiry.email || 'N/A'}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {enquiry.phone_no || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-4 max-w-xs">
                            <div className="text-sm text-gray-900" title={enquiry.message}>
                              {enquiry.message && enquiry.message.length > 60 
                                ? `${enquiry.message.substring(0, 60)}...` 
                                : enquiry.message || 'No message'
                              }
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {enquiry.form_location || 'N/A'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {formatDate(enquiry.created_at)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(enquiry.enquiry_status)}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              {/* Status Update Dropdown */}
                              <div className="relative group">
                                <button
                                  className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                  title="Update Status"
                                >
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                </button>
                                <div className="invisible group-hover:visible absolute right-0 top-8 z-10 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                                  <button
                                    onClick={() => handleStatusUpdate(enquiry.enquiry_id, 0)}
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Mark Unread
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(enquiry.enquiry_id, 1)}
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Mark Read
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(enquiry.enquiry_id, 2)}
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(enquiry.enquiry_id, 3)}
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => handleDelete(enquiry.enquiry_id)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded bg-red-50 hover:bg-red-100 transition-colors"
                                title="Delete"
                              >
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
