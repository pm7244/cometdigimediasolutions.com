import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";

const CareerEnquiries = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/getalljob`);
      if (response.ok) {
        const result = await response.json();
        if (result.status && result.data) {
          setJobApplications(result.data);
        } else {
          setJobApplications([]);
        }
      } else {
        toast.error('Failed to fetch career enquiries');
        setJobApplications([]);
      }
    } catch (error) {
      console.error('Error fetching career enquiries:', error);
      toast.error('Error fetching career enquiries');
      setJobApplications([]);
    } finally {
      setLoading(false);
    }
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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidjobstatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_status: newStatus }),
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

  const handleDownloadResume = async (fileName, applicationId) => {
    if (!fileName) {
      toast.error('No resume file found');
      return;
    }

    try {
      console.log('=== DOWNLOAD DEBUG START ===');
      console.log('📥 Original filename from DB:', fileName);
      console.log('🆔 Application ID:', applicationId);
      
      const baseUrl = import.meta.env.VITE_CMS_URL;
      console.log('🌐 Base URL:', baseUrl);
      
      // Clean the filename - extract just the filename if it's a path
      const cleanFileName = fileName.split('/').pop().split('\\').pop();
      console.log('🧹 Clean filename:', cleanFileName);
      
      // Check what encoding the filename already has
      const hasPercentEncoding = cleanFileName.includes('%');
      console.log('🔍 Has % encoding?', hasPercentEncoding);
      
      // DECODE the filename first (important!)
      let decodedFileName = cleanFileName;
      if (hasPercentEncoding) {
        try {
          decodedFileName = decodeURIComponent(cleanFileName);
          console.log('🔓 Decoded filename:', decodedFileName);
        } catch (error) {
          console.log('❌ Failed to decode, using original');
        }
      }
      
      // Now we have the actual filename that should be on disk
      console.log('🎯 Actual filename on disk should be:', decodedFileName);
      
      // Try different URL strategies
      const testStrategies = [];
      
      // Strategy 1: Try with the original encoded filename (as stored in DB)
      testStrategies.push({
        name: 'Original DB filename',
        url: `${baseUrl}api/download/${cleanFileName}`
      });
      
      // Strategy 2: Try with decoded filename (actual filename with spaces)
      testStrategies.push({
        name: 'Decoded filename (spaces)',
        url: `${baseUrl}api/download/${decodedFileName}`
      });
      
      // Strategy 3: Try with properly encoded spaces
      const properlyEncoded = decodedFileName.replace(/ /g, '%20');
      testStrategies.push({
        name: 'Properly encoded spaces',
        url: `${baseUrl}api/download/${properlyEncoded}`
      });
      
      // Strategy 4: Try uploads directory with decoded filename
      testStrategies.push({
        name: 'Uploads with decoded',
        url: `${baseUrl}uploads/${decodedFileName}`
      });
      
      // Strategy 5: Try uploads with properly encoded
      testStrategies.push({
        name: 'Uploads with encoded',
        url: `${baseUrl}uploads/${properlyEncoded}`
      });
      
      // Strategy 6: Try by application ID
      testStrategies.push({
        name: 'By application ID',
        url: `${baseUrl}api/download-resume/${applicationId}`
      });
      
      // Strategy 7: Try download-by-id
      testStrategies.push({
        name: 'Download by ID',
        url: `${baseUrl}api/download-by-id/${applicationId}`
      });
      
      // Strategy 8: Try with underscores (some systems save with underscores)
      const withUnderscores = decodedFileName.replace(/ /g, '_');
      testStrategies.push({
        name: 'With underscores',
        url: `${baseUrl}uploads/${withUnderscores}`
      });
      
      console.log('\n🚀 Testing strategies:');
      
      let workingUrl = null;
      
      // First, test each URL to see which one works
      for (const strategy of testStrategies) {
        try {
          console.log(`\n🔍 Testing: ${strategy.name}`);
          console.log(`   URL: ${strategy.url}`);
          
          // Use HEAD request to check if file exists
          const response = await fetch(strategy.url, { 
            method: 'HEAD',
            mode: 'cors'
          });
          
          console.log(`   Status: ${response.status} ${response.statusText}`);
          
          if (response.ok) {
            console.log(`   ✅ WORKING!`);
            workingUrl = strategy.url;
            break;
          }
        } catch (error) {
          console.log(`   ❌ Error: ${error.message}`);
        }
      }
      
      if (workingUrl) {
        console.log(`\n🎯 Found working URL: ${workingUrl}`);
        
        // Now actually download the file
        const response = await fetch(workingUrl);
        
        if (response.ok) {
          const blob = await response.blob();
          
          // Create blob URL
          const blobUrl = window.URL.createObjectURL(blob);
          
          // Create download link
          const link = document.createElement('a');
          link.href = blobUrl;
          
          // Get filename for download
          let downloadName = decodedFileName;
          const contentDisposition = response.headers.get('content-disposition');
          
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
              downloadName = match[1];
            }
          }
          
          // Clean filename for download
          const safeFileName = downloadName.replace(/[^a-zA-Z0-9.-]/g, '_');
          link.download = safeFileName;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up
          setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
          }, 100);
          
          toast.success('✅ Resume downloaded successfully!');
          console.log('=== DOWNLOAD DEBUG END: SUCCESS ===');
          return;
        }
      }
      
      // If no working URL found, try direct opening
      console.log('\n🔄 No working URL found via fetch, trying direct open...');
      
      // Try most likely URLs for direct opening
      const directUrls = [
        `${baseUrl}uploads/${decodedFileName.replace(/ /g, '%20')}`,
        `${baseUrl}api/download/${decodedFileName.replace(/ /g, '%20')}`,
        `${baseUrl}uploads/${cleanFileName}`,
        `${baseUrl}api/download/${cleanFileName}`
      ];
      
      for (const url of directUrls) {
        try {
          console.log(`Trying direct open: ${url}`);
          window.open(url, '_blank');
          toast.info('📄 Opening resume in new tab...');
          console.log('=== DOWNLOAD DEBUG END: DIRECT OPEN ===');
          return;
        } catch (error) {
          console.log('Direct open failed:', error);
        }
      }
      
      console.log('=== DOWNLOAD DEBUG END: ALL FAILED ===');
      toast.error('❌ Could not download resume. Check console for details.');
      
    } catch (error) {
      console.error('🔥 Download error:', error);
      toast.error('❌ Error downloading resume');
    }
  };

  // SIMPLE FIXED VERSION - Try this if above doesn't work
  const handleDownloadFixed = (fileName, applicationId) => {
    if (!fileName) {
      toast.error('No resume file found');
      return;
    }
    
    const baseUrl = import.meta.env.VITE_CMS_URL;
    
    // Extract just filename
    const cleanFileName = fileName.split('/').pop().split('\\').pop();
    
    // DECODE the filename if it has %20
    let actualFileName = cleanFileName;
    if (cleanFileName.includes('%20')) {
      try {
        actualFileName = decodeURIComponent(cleanFileName);
      } catch (e) {
        // If decode fails, replace %20 with space manually
        actualFileName = cleanFileName.replace(/%20/g, ' ');
      }
    }
    
    console.log('Fixed download attempt:');
    console.log('Original:', cleanFileName);
    console.log('Actual:', actualFileName);
    
    // The file on disk PROBABLY has spaces, not %20
    // So we need to send: 1759390448088-SHAMA1 CV - Copy (1).pdf
    // But URL needs to encode spaces as %20
    
    const encodedForUrl = actualFileName.replace(/ /g, '%20');
    
    // Try these URLs
    const urlsToTry = [
      `${baseUrl}api/download/${encodedForUrl}`,
      `${baseUrl}uploads/${encodedForUrl}`,
      `${baseUrl}api/download-resume/${applicationId}`,
      `${baseUrl}uploads/${actualFileName}`,
      `${baseUrl}api/download/${actualFileName}`
    ];
    
    console.log('Trying URLs:', urlsToTry);
    
    for (const url of urlsToTry) {
      try {
        window.open(url, '_blank');
        toast.info('Opening resume...');
        return;
      } catch (error) {
        console.log('Failed:', url);
      }
    }
    
    toast.error('Could not open resume');
  };

  // ULTRA SIMPLE VERSION - Just for testing
  const handleDownloadTest = (fileName) => {
    const baseUrl = import.meta.env.VITE_CMS_URL;
    
    // Remove any %20 encoding and replace with spaces
    const testFileName = fileName.replace(/%20/g, ' ');
    
    // Then encode spaces back to %20 for URL
    const urlFileName = testFileName.replace(/ /g, '%20');
    
    const testUrl = `${baseUrl}uploads/${urlFileName}`;
    
    console.log('Test URL:', testUrl);
    window.open(testUrl, '_blank');
    toast.info('Testing download...');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      0: { label: 'New', color: 'bg-blue-100 text-blue-800' },
      1: { label: 'Reviewed', color: 'bg-yellow-100 text-yellow-800' },
      2: { label: 'Shortlisted', color: 'bg-green-100 text-green-800' },
      3: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status] || statusConfig[0];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${config.color}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
          status === 0 ? 'bg-blue-500' : 
          status === 1 ? 'bg-yellow-500' : 
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
      <PageHeader currentpage="Career Enquiry Management" activepage="General" mainpage="Career Enquiries" />
      
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Career Enquiry Management</h5>
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
                  <span className="ml-2">Loading career enquiries...</span>
                </div>
              ) : jobApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No career enquiries found.
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
                          EXPERIENCE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          INTRODUCTION
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          RESUME
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
                      {jobApplications.map((application, index) => {
                        const fileName = application.resume;
                        const isEncoded = fileName && fileName.includes('%20');
                        
                        return (
                          <tr key={application.job_id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {application.name || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {application.email || 'N/A'}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm text-gray-900">
                                {application.phone || 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm text-gray-900">
                                {application.experience || 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-4 max-w-xs">
                              <div className="text-sm text-gray-900" title={application.introduction}>
                                {application.introduction && application.introduction.length > 60 
                                  ? `${application.introduction.substring(0, 60)}...` 
                                  : application.introduction || 'No introduction'
                                }
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {fileName ? (
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex items-center gap-1">
                                    {/* <span className="text-xs text-gray-500 truncate max-w-[120px]" title={fileName}>
                                      {fileName.length > 15 
                                        ? `${fileName.substring(0, 15)}...` 
                                        : fileName}
                                    </span> */}
                                    {isEncoded && (
                                      <span className="text-xs bg-red-100 text-red-800 px-1 rounded" title="Encoded filename">
                                        ⚠️
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleDownloadResume(fileName, application.job_id)}
                                      className="inline-flex items-center px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded transition-colors"
                                      title="Download Resume"
                                    >
                                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Download
                                    </button>
                                    {/* <button
                                      onClick={() => handleDownloadFixed(fileName, application.job_id)}
                                      className="inline-flex items-center px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-medium rounded transition-colors"
                                      title="Fixed Download"
                                    >
                                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                      Fixed
                                    </button> */}
                                  </div>
                                  {isEncoded && (
                                    <div className="text-xs text-gray-400 italic">
                                      Note: Filename is stored with %20 encoding
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">No resume</span>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm text-gray-900">
                                {formatDate(application.created_at)}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {getStatusBadge(application.job_status)}
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
                                      onClick={() => handleStatusUpdate(application.job_id, 0)}
                                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Mark New
                                    </button>
                                    <button
                                      onClick={() => handleStatusUpdate(application.job_id, 1)}
                                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Mark Reviewed
                                    </button>
                                    <button
                                      onClick={() => handleStatusUpdate(application.job_id, 2)}
                                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Shortlist
                                    </button>
                                    <button
                                      onClick={() => handleStatusUpdate(application.job_id, 3)}
                                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => handleDelete(application.job_id)}
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
                        );
                      })}
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

export default CareerEnquiries;