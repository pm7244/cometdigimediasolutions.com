import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";

const WebBlog = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    hero_title: "",
    meta_title: "",
    meta_des: "",
    status: 1
  });

  const [blogId, setBlogId] = useState(null);
  const [blogContent, setBlogContent] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);

  const fetchData = () => {
    console.log("Frontend: Fetching web_blog data from:", `${import.meta.env.VITE_CMS_URL}api/getallwebblog`);
    // Fetch web_blog data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallwebblog`)
      .then((res) => {
        console.log("Frontend: Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Frontend: Blog data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const blogData = data.data[0];

          // Store the blog ID for updates
          setBlogId(blogData.b_id);

          setValues({
            hero_title: blogData.hero_title || "",
            meta_title: blogData.meta_title || "",
            meta_des: blogData.meta_des || "",
            status: blogData.status || 1
          });
        } else {
          console.log("Frontend: No blog data found, using defaults");
          // Set a default ID if no data exists (for first time setup)
          setBlogId(2);
          setValues({
            hero_title: "",
            meta_title: "",
            meta_des: "",
            status: 1
          });
        }
      })
      .catch((err) => {
        console.error("Frontend: Fetch error:", err);
        toast.error("Failed to fetch blog data");
      });
  };

  const fetchBlogContent = () => {
    setContentLoading(true);
    console.log("Frontend: Fetching blog content from:", `${import.meta.env.VITE_CMS_URL}api/getallblog?all=true`);

    fetch(`${import.meta.env.VITE_CMS_URL}api/getallblog?all=true`)
      .then((res) => {
        console.log("Frontend: Content response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Frontend: Blog content received:", data);
        if (data.status && data.data) {
          setBlogContent(data.data);
          toast.success(`Loaded ${data.data.length} blogs`);
        } else {
          console.log("Frontend: No data found or invalid response format");
          setBlogContent([]);
          if (data.message) {
            toast.info(data.message);
          }
        }
      })
      .catch((err) => {
        console.error("Frontend: Content fetch error:", err);
        toast.error(`Failed to fetch blogs: ${err.message}`);
        setBlogContent([]);
      })
      .finally(() => {
        setContentLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    fetchBlogContent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Check if we have a blog ID
    if (!blogId) {
      toast.error("Blog ID not found. Please refresh the page.");
      return;
    }

    // Prepare payload
    const payload = { ...values };
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidwebblog/${blogId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Blog page updated successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to update blog page");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update blog page");
      });
  };

  // Blog content management functions
  const handleCreateContent = () => {
    navigate("/cms/pages/web_blog/create");
  };

  const handleEditContent = (id) => {
    navigate(`/cms/pages/web_blog/edit/${id}`);
   
  };

  const handleDeleteContent = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidblog/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        
        if (result.status) {
          toast.success("Blog deleted successfully");
          fetchBlogContent();
        } else {
          toast.error(result.message || "Failed to delete blog");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("An error occurred while deleting blog");
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

  return (
    <div>
      <PageHeader currentpage="Web Blog" activepage="Pages" mainpage="Web Blog" />
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column */}
        <div className="col-span-12 xxl:col-span-12">
          {/* Hero Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Hero Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Hero Title */}
              <div>
                <label className="ti-form-label">Hero Title</label>
                <input
                  type="text"
                  name="hero_title"
                  value={values.hero_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Hero Title"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-12">
          {/* Status */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Status</h5>
            </div>
            <div className="box-body">
              <Select
                value={{
                  value: values.status,
                  label: values.status === 1 ? "Enable" : "Disable"
                }}
                options={[
                  { value: 1, label: "Enable" },
                  { value: 0, label: "Disable" },
                ]}
                onChange={(selected) =>
                  setValues((prev) => ({ ...prev, status: selected.value }))
                }
              />
            </div>
          </div>

          {/* Meta Title */}
          <div className="box">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={values.meta_title || ""}
                onChange={handleInputChange}
                className="ti-form-input"
                placeholder="Enter Meta Title"
              />
            </div>
          </div>

          {/* Meta Description */}
          <div className="box">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Meta Description</label>
              <textarea
                name="meta_des"
                value={values.meta_des || ""}
                onChange={handleInputChange}
                className="ti-form-input"
                placeholder="Enter Meta Description"
                rows="4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Management Section */}
      <div className="grid grid-cols-12 gap-x-6 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Content Management</h5>
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
            <div className="box-body">
              {contentLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading blogs...</span>
                </div>
              ) : blogContent.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No blogs found. Click "Add New Content" to create your first blog.
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
                          BLOG NAME
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          SLUG
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          AUTHOR
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          TYPE
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
                      {blogContent.map((blog, index) => {
                        return (
                          <tr key={blog.blog_id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {blog.blog_name || "No name"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {blog.short_description ? blog.short_description.substring(0, 60) + "..." : "No description"}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {blog.blog_slug || "No slug"}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {blog.author_name || "No author"}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}>
                                {blog.type || "General"}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                blog.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {blog.status === 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEditContent(blog.blog_id)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                  title="Edit"
                                >
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteContent(blog.blog_id)}
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

      {/* Submit Button */}
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-footer bg-transparent">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ti-btn ti-btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebBlog;
