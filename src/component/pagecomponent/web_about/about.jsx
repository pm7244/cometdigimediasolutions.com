import React, { useEffect, useState } from "react";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import Filemanagermain from "../fileManager/filemanagermain";

const About = () => {
  const [values, setValues] = useState({
    hero_title: "",
    hero_des: "",
    video: "",
    meta_title: "",
    meta_des: "",
    mission_des: "",
    mission_image: "",
    vision_des: "",
    vision_image: "",
    status: 1
  });
  
  const [video, setVideo] = useState([]);
  const [missionImage, setMissionImage] = useState([]);
  const [visionImage, setVisionImage] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);

  const fetchData = () => {
    console.log("Fetching about data from:", `${import.meta.env.VITE_CMS_URL}api/getallabout`);
    // Fetch web_about data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallabout`)
      .then((res) => {
        console.log("About response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("About data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const aboutData = data.data[0];
          
          // Parse arrays from JSON strings with better error handling
          let videoData = [];
          let missionImageData = [];
          let visionImageData = [];
          
          try {
            if (aboutData.video && aboutData.video !== "") {
              videoData = typeof aboutData.video === 'string' ? JSON.parse(aboutData.video) : aboutData.video;
              videoData = Array.isArray(videoData) ? videoData : [videoData];
            }
            if (aboutData.mission_image && aboutData.mission_image !== "") {
              missionImageData = typeof aboutData.mission_image === 'string' ? JSON.parse(aboutData.mission_image) : aboutData.mission_image;
              missionImageData = Array.isArray(missionImageData) ? missionImageData : [missionImageData];
            }
            if (aboutData.vision_image && aboutData.vision_image !== "") {
              visionImageData = typeof aboutData.vision_image === 'string' ? JSON.parse(aboutData.vision_image) : aboutData.vision_image;
              visionImageData = Array.isArray(visionImageData) ? visionImageData : [visionImageData];
            }
          } catch (parseError) {
            console.warn("Error parsing JSON fields:", parseError);
          }
          
          setVideo(videoData);
          setMissionImage(missionImageData);
          setVisionImage(visionImageData);
          
          setValues({
            hero_title: aboutData.hero_title || "",
            hero_des: aboutData.hero_des || "",
            video: aboutData.video || "",
            meta_title: aboutData.meta_title || "",
            meta_des: aboutData.meta_des || "",
            mission_des: aboutData.mission_des || "",
            mission_image: aboutData.mission_image || "",
            vision_des: aboutData.vision_des || "",
            vision_image: aboutData.vision_image || "",
            status: aboutData.status || 1
          });
        } else {
          console.log("No about data found, using defaults");
          setValues({
            hero_title: "",
            hero_des: "",
            video: "",
            meta_title: "",
            meta_des: "",
            mission_des: "",
            mission_image: "",
            vision_des: "",
            vision_image: "",
            status: 1
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch about data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // Update values when arrays change - keep as JSON strings for database storage
  useEffect(() => {
    if (video && video.length > 0) {
      setValues(prev => ({ ...prev, video: JSON.stringify(video) }));
    } else {
      setValues(prev => ({ ...prev, video: "" }));
    }
  }, [video]);

  useEffect(() => {
    if (missionImage && missionImage.length > 0) {
      setValues(prev => ({ ...prev, mission_image: JSON.stringify(missionImage) }));
    } else {
      setValues(prev => ({ ...prev, mission_image: "" }));
    }
  }, [missionImage]);

  useEffect(() => {
    if (visionImage && visionImage.length > 0) {
      setValues(prev => ({ ...prev, vision_image: JSON.stringify(visionImage) }));
    } else {
      setValues(prev => ({ ...prev, vision_image: "" }));
    }
  }, [visionImage]);

  const handleSubmit = () => {
    console.log("Submitting data:", {
      ...values,
      video: JSON.stringify(video),
      mission_image: JSON.stringify(missionImage),
      vision_image: JSON.stringify(visionImage)
    });

    // Prepare payload - convert arrays to JSON strings for database storage
    const payload = {
      ...values,
      video: JSON.stringify(video),
      mission_image: JSON.stringify(missionImage),
      vision_image: JSON.stringify(visionImage)
    };
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidabout/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Update result:", result);
        if (result.status) {
          toast.success("About page updated successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to update about page");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update about page");
      });
  };

  // Handle file manager close and reset
  const handleFileManagerClose = (managerId) => {
    setManagerOpener(false);
  };

  return managerOpener === 2 ? (
    <Filemanagermain
      file={video}
      fileSetter={setVideo}
      openSetter={handleFileManagerClose}
      maxFiles={1}
      ratio={16 / 9}
      type="video"
    />
  ) : managerOpener === 3 ? (
    <Filemanagermain
      file={missionImage}
      fileSetter={setMissionImage}
      openSetter={handleFileManagerClose}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : managerOpener === 4 ? (
    <Filemanagermain
      file={visionImage}
      fileSetter={setVisionImage}
      openSetter={handleFileManagerClose}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : (
    <div>
      <PageHeader currentpage="Web About" activepage="Pages" mainpage="Web About" />
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

              {/* Hero Description */}
              <div>
                <label className="ti-form-label">Hero Description</label>
                <textarea
                  name="hero_des"
                  value={values.hero_des || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Hero Description"
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Video Section</h5>
            </div>
            <div className="box-body space-y-4">
              {video && video.length > 0 ? (
                <>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary"
                      onClick={() => setManagerOpener(2)}
                    >
                      Change Video
                    </button>
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-danger"
                      onClick={() => {
                        setVideo([]);
                        setValues(prev => ({ ...prev, video: "" }));
                        toast.success("Video removed successfully");
                      }}
                    >
                      Remove Video
                    </button>
                  </div>
                  <video controls className="box-img-top h-52 rounded-t-sm">
                    <source
                      src={`${import.meta.env.VITE_CMS_URL}api/transform/${video[0]}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-sm text-gray-600 mt-2">Video: {video[0]}</p>
                </>
              ) : (
                <button
                  type="button"
                  className="ti-btn ti-btn-outline-primary"
                  onClick={() => setManagerOpener(2)}
                >
                  Add Video
                </button>
              )}
            </div>
          </div>

          {/* Mission & Vision Section - Two Column Layout */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Mission & Vision Section</h5>
            </div>
            <div className="box-body space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission Column */}
                <div className="space-y-4">
                  <h6 className="text-lg font-semibold text-gray-700">Mission</h6>
                  
                  {/* Mission Description */}
                  <div>
                    <label className="ti-form-label">Mission Description</label>
                    <textarea
                      name="mission_des"
                      value={values.mission_des || ""}
                      onChange={handleInputChange}
                      className="ti-form-input"
                      placeholder="Enter Mission Description"
                      rows="4"
                    />
                  </div>

                  {/* Mission Image */}
                  <div>
                    <label className="ti-form-label">Mission Image</label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        className="ti-btn ti-btn-outline-primary w-full"
                        onClick={() => setManagerOpener(3)}
                      >
                        {missionImage.length > 0 ? "Change Mission Image" : "Select Mission Image"}
                      </button>
                      {missionImage.length > 0 && (
                        <div className="relative">
                          <img
                            src={`${import.meta.env.VITE_CMS_URL}api/transform/${missionImage[0]}`}
                            className="w-full h-32 rounded-sm object-cover border"
                            alt="Mission"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.png';
                              console.error('Failed to load mission image:', missionImage[0]);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setMissionImage([])}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vision Column */}
                <div className="space-y-4">
                  <h6 className="text-lg font-semibold text-gray-700">Vision</h6>
                  
                  {/* Vision Description */}
                  <div>
                    <label className="ti-form-label">Vision Description</label>
                    <textarea
                      name="vision_des"
                      value={values.vision_des || ""}
                      onChange={handleInputChange}
                      className="ti-form-input"
                      placeholder="Enter Vision Description"
                      rows="4"
                    />
                  </div>

                  {/* Vision Image */}
                  <div>
                    <label className="ti-form-label">Vision Image</label>
                    <div className="space-y-2">
                      <button
                        type="button"
                        className="ti-btn ti-btn-outline-primary w-full"
                        onClick={() => setManagerOpener(4)}
                      >
                        {visionImage.length > 0 ? "Change Vision Image" : "Select Vision Image"}
                      </button>
                      {visionImage.length > 0 && (
                        <div className="relative">
                          <img
                            src={`${import.meta.env.VITE_CMS_URL}api/transform/${visionImage[0]}`}
                            className="w-full h-32 rounded-sm object-cover border"
                            alt="Vision"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.png';
                              console.error('Failed to load vision image:', visionImage[0]);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setVisionImage([])}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
export default About;
