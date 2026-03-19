import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Filemanagermain from "../fileManager/filemanagermain";



const StandardPageLayout = ({ children, pageTitle }) => (
  <div className="space-y-6">
    <PageHeader currentpage={pageTitle} activepage="Pages" mainpage="Web Project" />
    {children}
  </div>
);

const FormSection = ({ title, children, className = "" }) => (
  <div className="box">
    <div className="box-header">
      <h5 className="box-title">{title}</h5>
    </div>
    <div className={`box-body ${className}`}>{children}</div>
  </div>
);

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  disabled = false,
  rows = 3,
}) => {
  return (
    <div>
      <label className="ti-form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="ti-form-input"
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="ti-form-input"
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      )}
    </div>
  );
};

const StatusSelector = ({ value, onChange }) => {
  const options = [
    { value: 1, label: "Enable" },
    { value: 0, label: "Disable" },
  ];

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <div>
      <label className="ti-form-label">Status</label>
      <Select
        value={current}
        options={options}
        onChange={(selected) => onChange(selected.value)}
      />
    </div>
  );
};

const WebProject = () => {
  const navigate = useNavigate();

  // Hero/meta values for the web project page
  const [values, setValues] = useState({
    hero_title: "",
    meta_title: "",
    meta_des: "",
    status: 1,
  });
  const [projectId, setProjectId] = useState(null);

  // Projects list & loading
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Inline edit/create project states
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    type: "",
    slug: "",
    image: [], // store filenames or ids as array
    status: 1,
  });
  const [selectedImage, setSelectedImage] = useState([]); // array of selected images
  const [managerOpener, setManagerOpener] = useState(0); // 1 opens file manager
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CMS_BASE = import.meta.env.VITE_CMS_URL || "";

  /* ------------------- Fetch CMS page data ------------------- */
  const fetchData = async () => {
    try {
      console.log("Frontend: Fetching web_project data from:", `${CMS_BASE}api/getallwebproject`);
      const res = await fetch(`${CMS_BASE}api/getallwebproject`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log("Frontend: Project data received:", data);
      if (data.status && Array.isArray(data.data) && data.data.length > 0) {
        const projectData = data.data[0];
        setProjectId(projectData.p_id || 1);
        setValues({
          hero_title: projectData.hero_title || "",
          meta_title: projectData.meta_title || "",
          meta_des: projectData.meta_des || "",
          status: projectData.status ?? 1,
        });
      } else {
        // no data, set defaults
        setProjectId(1);
        setValues({
          hero_title: "",
          meta_title: "",
          meta_des: "",
          status: 1,
        });
      }
    } catch (err) {
      console.error("Frontend: Fetch error:", err);
      toast.error("Failed to fetch project data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ------------------- Projects CRUD ------------------- */
  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await fetch(`${CMS_BASE}api/getallproject`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.status) {
        setProjects(result.data || []);
      } else {
        toast.error(result.message || "Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Error fetching projects");
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`${CMS_BASE}api/deletebtidproject/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.status) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        toast.error(result.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project");
    }
  };

  /* ------------------- Hero/meta update ------------------- */
  const handleInputChangeValues = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitValues = async () => {
    if (!projectId) {
      toast.error("Project ID not found. Please refresh the page.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = { ...values };
      const res = await fetch(`${CMS_BASE}api/updatebyidwebproject/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.status) {
        toast.success("Project page updated successfully");
        fetchData();
      } else {
        toast.error(result.message || "Failed to update project page");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update project page");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------- Inline project edit/create handlers ------------------- */
  const handleEdit = (project) => {
    setEditingId(project.p_id);
    setFormData({
      title: project.title || "",
      des: project.des || "",
      type: project.type || "",
      slug: project.slug || "",
      image: project.list_img ? parseImageArray(project.list_img) : [],
      status: project.status ?? 1,
    });
    setSelectedImage(project.list_img ? parseImageArray(project.list_img) : []);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      des: "",
      type: "",
      slug: "",
      image: [],
      status: 1,
    });
    setSelectedImage([]);
  };

  const handleInputChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSaveProject = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        des: formData.des,
        short_des: formData.des, // Use same description for short_des
        type: formData.type,
        slug: formData.slug,
        status: formData.status,
        list_img: Array.isArray(selectedImage) ? selectedImage : [selectedImage],
        // Add other required fields with default values
        hero_image: [],
        hero_video: [],
        big_list_img: [],
        challenges_des: [],
        results_des: [],
        category: "",
        service: "",
        client: "",
        software: "",
        date: null,
        brand: ""
      };

      const url = editingId
        ? `${CMS_BASE}api/updateproject/${editingId}`
        : `${CMS_BASE}api/createproject`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status) {
        toast.success(editingId ? "Project updated successfully" : "Project created successfully");
        setEditingId(null);
        handleCancelEdit();
        fetchProjects();
      } else {
        toast.error(result.message || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Error saving project");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------- Helper utilities ------------------- */
  const parseImageArray = (imageString) => {
    if (!imageString) return [];
    try {
      const parsed = JSON.parse(imageString);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // if invalid JSON, return as single string array
      return [imageString];
    }
  };

  /* ------------------- Navigation helpers ------------------- */
  const handleAddNewProject = () => {
    navigate("/cms/pages/web_project/create");
  };

  const handleEditProject = (project) => {
    navigate(`/cms/pages/web_project/edit/${project.p_id}`);
  };

  /* ------------------- JSX ------------------- */
  if (projectsLoading) {
    return (
      <StandardPageLayout pageTitle="Project Management">
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
    <StandardPageLayout pageTitle="Project Management">
      <div className="grid grid-cols-12 gap-x-6">
        {/* Left Column - Hero */}
        <div className="col-span-12 xxl:col-span-12">
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Hero Section</h5>
            </div>
            <div className="box-body space-y-5">
              <div>
                <label className="ti-form-label">Hero Title</label>
                <input
                  type="text"
                  name="hero_title"
                  value={values.hero_title || ""}
                  onChange={handleInputChangeValues}
                  className="ti-form-input"
                  placeholder="Enter Hero Title"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status / Meta */}
        <div className="col-span-12 xxl:col-span-12">
          <div className="box mb-4">
            <div className="box-header">
              <h5 className="box-title">Status</h5>
            </div>
            <div className="box-body">
              <StatusSelector
                value={values.status}
                onChange={(val) => setValues((prev) => ({ ...prev, status: val }))}
              />
            </div>
          </div>

          <div className="box mb-4">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={values.meta_title || ""}
                onChange={handleInputChangeValues}
                className="ti-form-input"
                placeholder="Enter Meta Title"
              />
            </div>
          </div>

          <div className="box">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Meta Description</label>
              <textarea
                name="meta_des"
                value={values.meta_des || ""}
                onChange={handleInputChangeValues}
                className="ti-form-input"
                placeholder="Enter Meta Description"
                rows="4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Hero/Meta */}
     

      {/* Inline Project Edit/Create Form */}
      <div className="grid grid-cols-12 gap-x-6 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header flex justify-between items-center">
              <h5 className="box-title">Project Content Management</h5>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddNewProject}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                  type="button"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Project
                </button>
                <button
                  onClick={() => fetchProjects()}
                  className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-md"
                  type="button"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="box-body">
              {/* If editingId is set (including 'new'), show inline editor */}
              {(editingId || editingId === "new") && (
                <div className="mb-6 border p-4 rounded">
                  <h6 className="font-semibold mb-3">{editingId === "new" ? "Create Project" : "Edit Project"}</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChangeForm}
                      required
                      placeholder="Enter project title"
                    />
                    <InputField
                      label="Slug"
                      name="slug"
                      type="text"
                      value={formData.slug}
                      onChange={handleInputChangeForm}
                      required
                      placeholder="Auto-generated from title"
                    />
                    <InputField
                      label="Type"
                      name="type"
                      type="text"
                      value={formData.type}
                      onChange={handleInputChangeForm}
                      required
                      placeholder="e.g. Web Development"
                    />
                    <div>
                      <label className="ti-form-label">Description</label>
                      <textarea
                        name="des"
                        value={formData.des}
                        onChange={handleInputChangeForm}
                        className="ti-form-input"
                        rows={4}
                        placeholder="Enter project description"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="ti-form-label">Project Image</label>
                      <button
                        type="button"
                        onClick={() => setManagerOpener(1)}
                        className="ti-btn ti-btn-outline-primary w-full"
                      >
                        {selectedImage.length > 0 ? "Change Project Image" : "Select Project Image"}
                      </button>

                      {selectedImage.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedImage.map((img, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={`${CMS_BASE}api/transform/${img}`}
                                className="w-20 h-20 rounded object-cover border"
                                alt={`Project ${idx + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = selectedImage.filter((_, i) => i !== idx);
                                  setSelectedImage(newImages);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <StatusSelector
                        value={formData.status}
                        onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      type="button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : editingId === "new" ? "Create" : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}

              {/* Projects list */}
              {projects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No projects found. Create your first project above.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">IMAGE</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">TITLE</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">TYPE</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">DESCRIPTION</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">SLUG</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {projects.map((project, index) => {
                        const projectImages = parseImageArray(project.list_img);
                        return (
                          <tr key={project.p_id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-4 text-sm text-gray-900">{index + 1}</td>
                            <td className="px-4 py-4">
                              {projectImages.length > 0 && projectImages[0] ? (
                                <img
                                  className="h-12 w-16 rounded object-cover"
                                  src={`${CMS_BASE}api/transform/${projectImages[0]}`}
                                  alt={project.title}
                                  onError={(e) => {
                                    e.target.src =
                                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zMiAzNkMzOC42Mjc0IDM2IDQ0IDMwLjYyNzQgNDQgMjRDNDQgMTcuMzcyNiAzOC42Mjc0IDEyIDMyIDEyQzI1LjM3MjYgMTIgMjAgMTcuMzcyNiAyMCAyNEMyMCAzMC42Mjc0IDI1LjM3MjYgMzYgMzIgMzZaIiBzdHJva2U9IiNEMUQ1REIiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMzIgMjhDMzQuMjA5MSAyOCAzNiAyNi4yMDkxIDM2IDI0QzM2IDIxLjc5MDkgMzQuMjA5MSAyMCAzMiAyMEMyOS43OTA5IDIwIDI4IDIxLjc5MDkgMjggMjRDMjggMjYuMjA5MSAyOS43OTA5IDI4IDMyIDI4WiIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4K";
                                  }}
                                />
                              ) : (
                                <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No Image</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm font-medium text-gray-900">{project.title || "Untitled"}</div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">{project.type || "-"}</td>
                            <td className="px-4 py-4 max-w-xs">
                              <div className="text-sm text-gray-900">
                                {project.short_des && project.short_des.length > 60
                                  ? `${project.short_des.substring(0, 60)}...`
                                  : project.short_des || "No description"}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">{project.slug || "-"}</td>
                            <td className="px-4 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                  title="Edit Project"
                                >
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>

                                <button
                                  onClick={() => handleDeleteProject(project.p_id)}
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
 <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-footer bg-transparent">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSubmitValues}
                  className="ti-btn ti-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Page Settings"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* File manager modal (renders when managerOpener === 1) */}
      {managerOpener === 1 && (
        <Filemanagermain
          file={selectedImage}
          fileSetter={(files) => {
            // ensure array
            const arr = Array.isArray(files) ? files : [files];
            setSelectedImage(arr);
            setFormData((prev) => ({ ...prev, image: arr }));
          }}
          openSetter={setManagerOpener}
          maxFiles={1}
          ratio={16 / 9}
          type="image"
        />
      )}
    </StandardPageLayout>
  );
};

export default WebProject;
