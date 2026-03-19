import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";

const BlogContent = () => {
  const navigate = useNavigate();
  
  const [blogContent, setBlogContent] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);

  const fetchBlogContent = () => {
    setContentLoading(true);
    console.log("Fetching blog content from:", `${import.meta.env.VITE_CMS_URL}api/getallblogcontent`);
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallblogcontent`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Blog content received:", data);
        if (data.status && data.data) {
          setBlogContent(data.data);
          toast.success(`Loaded ${data.data.length} blog content items`);
        } else {
          console.log("No data found or invalid response format");
          setBlogContent([]);
          if (data.message) {
            toast.info(data.message);
          }
        }
      })
      .catch((err) => {
        console.error("Content fetch error:", err);
        toast.error(`Failed to fetch blog content: ${err.message}`);
        setBlogContent([]);
      })
      .finally(() => {
        setContentLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogContent();
  }, []);

  // Blog content management functions
  const handleCreateContent = () => {
    navigate("/cms/pages/web_blog/content/create");
  };

  const handleEditContent = (id) => {
    navigate(`/cms/pages/web_blog/content/edit/${id}`);
  };

  const handleDeleteContent = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog content?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidblogcontent/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        
        if (result.status) {
          toast.success("Blog content deleted successfully");
          fetchBlogContent();
        } else {
          toast.error(result.message || "Failed to delete blog content");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("An error occurred while deleting blog content");
      }
    }
  };

  const parseImageArray = (imageString) => {
    if (!imageString) return [];
    try {
      const parsed = JSON.parse(imageString);
      return Array.isArray(parsed) ? parsed : [imageString];
    } catch {
      return [imageString];
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "-";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div>
      <PageHeader currentpage="Blog Content" activepage="Pages" mainpage="Web Blog" />
      
      {/* Content Management Section */}
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Blog Content Management</h5>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/cms/pages/web_blog/")}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blogs
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateContent}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Content
                  </button>
                </div>
              </div>
            </div>
            <div className="box-body">
              {contentLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading blog content...</span>
                </div>
              ) : blogContent.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No blog content found. Click "Add New Content" to create your first blog content item.
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
                          BLOG ID
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          TEXT CONTENT
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          QUOTE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          IMAGES
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
                      {blogContent.map((content, index) => {
                        const images = parseImageArray(content.image);
                        return (
                          <tr key={content.bc_id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              #{content.blog_id || "-"}
                            </td>
                            <td className="px-4 py-4 max-w-xs">
                              <div className="text-sm text-gray-900">
                                {truncateText(content.text, 80)}
                              </div>
                            </td>
                            <td className="px-4 py-4 max-w-xs">
                              <div className="text-sm text-gray-900 italic">
                                {truncateText(content.quote, 60)}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {images.length > 0 && images[0] ? (
                                <div className="flex items-center">
                                  <img
                                    className="h-10 w-10 rounded object-cover"
                                    src={`${import.meta.env.VITE_CMS_URL}api/transform/${images[0]}`}
                                    alt="Content"
                                    onError={(e) => {
                                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyNi42Mjc0IDMwIDMyIDI0LjYyNzQgMzIgMThDMzIgMTEuMzcyNiAyNi42Mjc0IDYgMjAgNkMxMy4zNzI2IDYgOCAxMS4zNzI2IDggMThDOCAyNC42Mjc0IDEzLjM3MjYgMzAgMjAgMzBaIiBzdHJva2U9IiNEMUQ1REIiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjAgMjJDMjIuMjA5MSAyMiAyNCAxOS4yMDkxIDI0IDE3QzI0IDE0Ljc5MDkgMjIuMjA5MSAxMyAyMCAxM0MxNy43OTA5IDEzIDE2IDE0Ljc5MDkgMTYgMTdDMTYgMTkuMjA5MSAxNy43OTA5IDIyIDIwIDIyWiIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4K";
                                    }}
                                  />
                                  {images.length > 1 && (
                                    <span className="ml-2 text-xs text-gray-500">
                                      +{images.length - 1} more
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No Image</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                content.status === 1 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {content.status === 1 ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEditContent(content.bc_id)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                  title="Edit"
                                >
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteContent(content.bc_id)}
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

export default BlogContent;
