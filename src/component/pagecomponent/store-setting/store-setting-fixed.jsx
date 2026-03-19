import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import Select from "react-select";
import { toast } from "react-toastify";
import Filemanagermain from "../fileManager/filemanagermain";

const StoreSetting = () => {
  const [input, setInput] = useState(null);
  const [logo1, setLogo1] = useState("");
  const [logo2, setLogo2] = useState("");
  const [managerOpener, setManagerOpener] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    console.log("Fetching store setting data...");
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallstore_setting`)
      .then((res) => {
        console.log("Fetch response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Store setting data received:", data);
        
        if (data.status && data.data && data.data.length > 0) {
          const storeData = data.data[0];
          
          // Parse JSON fields safely
          let rawLogo1, rawLogo2;
          try {
            rawLogo1 = typeof storeData.logo1 === 'string' ? JSON.parse(storeData.logo1) : storeData.logo1 || [];
            rawLogo2 = typeof storeData.logo2 === 'string' ? JSON.parse(storeData.logo2) : storeData.logo2 || [];
          } catch (parseError) {
            console.warn("Error parsing logo JSON:", parseError);
            rawLogo1 = [];
            rawLogo2 = [];
          }
          
          setLogo1(rawLogo1);
          setLogo2(rawLogo2);
          setInput({ ...storeData, logo1: rawLogo1, logo2: rawLogo2 });
        } else {
          console.error("No store setting data found");
          toast.error("No store setting data found");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch store settings: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const SubmitData = (id) => {
    console.log("Submitting data for store_id:", id);
    const newData = {
      ...input,
      logo1: JSON.stringify(input.logo1),
      logo2: JSON.stringify(input.logo2),
    };
    console.log("Payload being sent:", newData);
    
    return fetch(`${import.meta.env.VITE_CMS_URL}api/update-store_setting/${id}`, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("Update response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Update result:", result);
        if (result.status) {
          toast.success("Store Settings updated successfully");
          fetchData();
          return result;
        } else {
          throw new Error(result.message || "Failed to update store settings");
        }
      });
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = {
      name: "Name",
      tagline: "Tagline",
      meta_title: "Meta Title",
      meta_desc: "Meta Description",
      overview: "Overview",
      notify_email: "Notify Email",
      career_email: "Career Email",
      conf_email: "Configuration Email",
      conf_password: "Configuration Password",
      conf_host: "Configuration Host",
      conf_secure: "Configuration Secure"
    };

    const missingFields = [];
    for (const [key, label] of Object.entries(requiredFields)) {
      if (!input[key] || input[key].toString().trim() === '') {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.notify_email)) {
      toast.error("Please enter a valid notify email address");
      return;
    }
    if (!emailRegex.test(input.career_email)) {
      toast.error("Please enter a valid career email address");
      return;
    }
    if (!emailRegex.test(input.conf_email)) {
      toast.error("Please enter a valid configuration email address");
      return;
    }

    setSubmitting(true);
    SubmitData(input.store_id)
      .catch((error) => {
        console.error("Submit error:", error);
        toast.error(error.message || "Failed to update store settings");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (logo1 && logo2) {
      setInput(prev => ({ ...prev, logo1: [...logo1], logo2: [...logo2] }));
    }
  }, [logo1, logo2]);

  return (
    <div>
      {managerOpener === 1 ? (
        <Filemanagermain
          file={logo1}
          ratio={input?.dimension}
          fileSetter={setLogo1}
          openSetter={setManagerOpener}
        />
      ) : managerOpener === 2 ? (
        <Filemanagermain
          file={logo2}
          ratio={input?.dimension}
          fileSetter={setLogo2}
          openSetter={setManagerOpener}
        />
      ) : (
        <>
          <PageHeader
            currentpage="Store Setting"
            activepage="Settings"
            mainpage="Store Setting"
          />
          
          {loading ? (
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-body">
                    <div className="flex items-center justify-center py-20">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading store settings...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : !input ? (
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-body">
                    <div className="flex items-center justify-center py-20">
                      <div className="text-center">
                        <i className="ti ti-alert-circle text-4xl text-red-500 mb-4"></i>
                        <p className="text-gray-600">Failed to load store settings</p>
                        <button 
                          onClick={fetchData}
                          className="ti-btn ti-btn-primary mt-4"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Store Settings Configuration</h5>
                  </div>
                  <div className="box-body space-y-5">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="input-label1" className="ti-form-label">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="ti-form-input"
                          placeholder="Enter store name"
                          value={input.name || ""}
                          name="name"
                          onChange={handleChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="input-label1" className="ti-form-label">
                          Tagline <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="ti-form-input"
                          placeholder="Enter tagline"
                          name="tagline"
                          value={input.tagline || ""}
                          onChange={handleChangeValue}
                        />
                      </div>
                    </div>

                    {/* Overview */}
                    <div>
                      <label className="ti-form-label">
                        Overview <span className="text-red-500">*</span>
                      </label>
                      <SunEditor
                        className="ht-250"
                        height="260"
                        setContents={input.overview || ""}
                        name="overview"
                        onChange={(e) =>
                          setInput(prev => ({ ...prev, overview: e }))
                        }
                        setOptions={{
                          buttonList: [
                            ["undo", "redo"],
                            ["font", "fontSize"],
                            ["paragraphStyle", "blockquote"],
                            [
                              "bold",
                              "underline",
                              "italic",
                              "strike",
                              "subscript",
                              "superscript",
                            ],
                            ["fontColor", "hiliteColor"],
                            ["align", "list", "lineHeight"],
                            ["outdent", "indent"],
                            [
                              "table",
                              "horizontalRule",
                              "link",
                              "image",
                              "video",
                            ],
                            ["preview", "print"],
                            ["removeFormat"],
                          ],
                          defaultTag: "div",
                          minHeight: "300px",
                          showPathLabel: false,
                          attributesWhitelist: {
                            all: "style",
                            table: "cellpadding|width|cellspacing|height|style",
                            tr: "valign|style",
                            td: "styleinsert|height|style",
                            img: "title|alt|src|style",
                          },
                        }}
                      />
                    </div>

                    {/* Logo Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* Logo 1 */}
                      <div className="box">
                        <div className="box-header flex justify-between">
                          <h5 className="box-title">Logo 1</h5>
                          <span className="text-sm font-thin underline text-red-500">
                            1 Image allowed Only
                          </span>
                        </div>
                        <div className="box-body">
                          <div onClick={() => setManagerOpener(1)} className="cursor-pointer">
                            <label className="block">
                              <span className="sr-only">Logo 1</span>
                              <button
                                type="button"
                                className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary w-full"
                              >
                                Change Image <i className="ti ti-file-plus ml-2"></i>
                              </button>
                              <div className="mt-3">
                                {input.logo1 && input.logo1.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-2">
                                    {input.logo1.map((pathFile, i) => (
                                      <img
                                        key={i}
                                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${pathFile}`}
                                        className="w-full h-32 object-cover rounded"
                                        alt="Logo 1"
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <div className="border-2 border-dashed border-gray-300 rounded h-32 flex items-center justify-center">
                                    <p className="text-gray-500">No logo uploaded</p>
                                  </div>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Logo 2 */}
                      <div className="box">
                        <div className="box-header flex justify-between">
                          <h5 className="box-title">Logo 2</h5>
                          <span className="text-sm font-thin underline text-red-500">
                            1 Image allowed Only
                          </span>
                        </div>
                        <div className="box-body">
                          <div onClick={() => setManagerOpener(2)} className="cursor-pointer">
                            <label className="block">
                              <span className="sr-only">Logo 2</span>
                              <button
                                type="button"
                                className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary w-full"
                              >
                                Change Image <i className="ti ti-file-plus ml-2"></i>
                              </button>
                              <div className="mt-3">
                                {input.logo2 && input.logo2.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-2">
                                    {input.logo2.map((pathFile, i) => (
                                      <img
                                        key={i}
                                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${pathFile}`}
                                        className="w-full h-32 object-cover rounded"
                                        alt="Logo 2"
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <div className="border-2 border-dashed border-gray-300 rounded h-32 flex items-center justify-center">
                                    <p className="text-gray-500">No logo uploaded</p>
                                  </div>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Email Configuration */}
                    <div>
                      <h6 className="text-lg font-semibold mb-4">Email Configuration</h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="ti-form-label">
                            Notify Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            className="ti-form-input"
                            placeholder="Enter notify email"
                            value={input.notify_email || ""}
                            name="notify_email"
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div>
                          <label className="ti-form-label">
                            Career Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            className="ti-form-input"
                            placeholder="Enter career email"
                            name="career_email"
                            value={input.career_email || ""}
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div>
                          <label className="ti-form-label">
                            Configuration Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            className="ti-form-input"
                            placeholder="Enter configuration email"
                            name="conf_email"
                            value={input.conf_email || ""}
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div>
                          <label className="ti-form-label">
                            Configuration Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            className="ti-form-input"
                            placeholder="Enter password"
                            name="conf_password"
                            value={input.conf_password || ""}
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div>
                          <label className="ti-form-label">
                            Configuration Host <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="ti-form-input"
                            placeholder="Enter configuration host"
                            name="conf_host"
                            value={input.conf_host || ""}
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div>
                          <label className="ti-form-label">
                            Configuration Port
                          </label>
                          <input
                            type="text"
                            className="ti-form-input"
                            placeholder="Enter configuration port"
                            name="conf_port"
                            value={input.conf_port || ""}
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="ti-form-label">
                            Configuration Secure <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="ti-form-input"
                            name="conf_secure"
                            placeholder="Enter configuration secure"
                            value={input.conf_secure || ""}
                            onChange={handleChangeValue}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SEO Settings */}
                    <div>
                      <h6 className="text-lg font-semibold mb-4">SEO Settings</h6>
                      <div className="space-y-5">
                        <div>
                          <label className="ti-form-label">
                            Meta Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="ti-form-input"
                            placeholder="Enter meta title"
                            value={input.meta_title || ""}
                            name="meta_title"
                            onChange={handleChangeValue}
                          />
                        </div>
                        <div>
                          <label className="ti-form-label">
                            Meta Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            className="ti-form-input"
                            rows="3"
                            placeholder="Enter meta description"
                            value={input.meta_desc || ""}
                            name="meta_desc"
                            onChange={handleChangeValue}
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="ti-form-label">Status</label>
                      <Select
                        className="product-searchs"
                        classNamePrefix="react-select"
                        name="status"
                        options={[
                          { value: 1, label: "Enable" },
                          { value: 0, label: "Disable" },
                        ]}
                        value={
                          input.status === 1
                            ? { value: 1, label: "Enable" }
                            : { value: 0, label: "Disable" }
                        }
                        onChange={(val) =>
                          setInput(prev => ({ ...prev, status: val.value }))
                        }
                        placeholder="Select Status"
                      />
                    </div>
                  </div>

                  <div className="box-footer bg-transparent">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className={`py-2 px-6 ti-btn ti-btn-primary ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></span>
                            Updating...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoreSetting;
