import React, { useEffect, useState } from "react";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
// import Filemanagermain from "../fileManager/filemanagermain";
import Filemanagermain from "../fileManager/filemanagermain";

const Home = () => {
  const [values, setValues] = useState({
    hero_title: "",
    hero_des: "",
    hero_client: "",
    video: "",
    about_title: "",
    about_des: "",
    about_img_left: "",
    about_img_right: "",
    about_img_bottom: "",
    award_img: "",
    marquee_title: "",
    marquee_status: 1,
    service_title: "",
    work_process_title: "",
    project_title: "",
    testimonial_title: "",
    client_title: "",
    blog_title: "",
    meta_title: "",
    meta_des: "",
    status: 1
  });
  
  const [video, setVideo] = useState([]);
  const [aboutImgLeft, setAboutImgLeft] = useState([]);
  const [aboutImgRight, setAboutImgRight] = useState([]);
  const [aboutImgBottom, setAboutImgBottom] = useState([]);
  const [awardImg, setAwardImg] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);

  const fetchData = () => {
    // Fetch home data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallhome`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Home data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const homeData = data.data[0];
          
          // Parse arrays from JSON strings
          let videoData = [];
          let aboutImgLeftData = [];
          let aboutImgRightData = [];
          let aboutImgBottomData = [];
          let awardImgData = [];
          
          try {
            if (homeData.video) {
              videoData = JSON.parse(homeData.video);
            }
            if (homeData.about_img_left) {
              aboutImgLeftData = JSON.parse(homeData.about_img_left);
            }
            if (homeData.about_img_right) {
              aboutImgRightData = JSON.parse(homeData.about_img_right);
            }
            if (homeData.about_img_bottom) {
              aboutImgBottomData = JSON.parse(homeData.about_img_bottom);
            }
            if (homeData.award_img) {
              awardImgData = JSON.parse(homeData.award_img);
            }
          } catch (e) {
            console.error("Error parsing JSON data:", e);
          }
          
          setVideo(videoData);
          setAboutImgLeft(aboutImgLeftData);
          setAboutImgRight(aboutImgRightData);
          setAboutImgBottom(aboutImgBottomData);
          setAwardImg(awardImgData);
          
          setValues({
            hero_title: homeData.hero_title || "",
            hero_des: homeData.hero_des || "",
            hero_client: homeData.hero_client || "",
            video: homeData.video || "",
            about_title: homeData.about_title || "",
            about_des: homeData.about_des || "",
            about_img_left: homeData.about_img_left || "",
            about_img_right: homeData.about_img_right || "",
            about_img_bottom: homeData.about_img_bottom || "",
            award_img: homeData.award_img || "",
            marquee_title: homeData.marquee_title || "",
            marquee_status: homeData.marquee_status || 1,
            service_title: homeData.service_title || "",
            work_process_title: homeData.work_process_title || "",
            project_title: homeData.project_title || "",
            testimonial_title: homeData.testimonial_title || "",
            client_title: homeData.client_title || "",
            blog_title: homeData.blog_title || "",
            meta_title: homeData.meta_title || "",
            meta_des: homeData.meta_des || "",
            status: homeData.status || 1
          });
        } else {
          console.log("No home data found, using defaults");
          setValues({
            hero_title: "",
            hero_des: "",
            hero_client: "",
            video: "",
            about_title: "",
            about_des: "",
            about_img_left: "",
            about_img_right: "",
            about_img_bottom: "",
            award_img: "",
            marquee_title: "",
            marquee_status: 1,
            service_title: "",
            work_process_title: "",
            project_title: "",
            testimonial_title: "",
            client_title: "",
            blog_title: "",
            meta_title: "",
            meta_des: "",
            status: 1
          });
          setVideo([]);
          setAboutImgLeft([]);
          setAboutImgRight([]);
          setAboutImgBottom([]);
          setAwardImg([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching home data:", err);
        toast.error(`Failed to fetch home data: ${err.message}`);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update values when images change
  useEffect(() => {
    if (video && video.length > 0) {
      setValues(prev => ({ ...prev, video: JSON.stringify(video) }));
    } else {
      setValues(prev => ({ ...prev, video: "" }));
    }
  }, [video]);

  useEffect(() => {
    if (aboutImgLeft && aboutImgLeft.length > 0) {
      setValues(prev => ({ ...prev, about_img_left: JSON.stringify(aboutImgLeft) }));
    } else {
      setValues(prev => ({ ...prev, about_img_left: "" }));
    }
  }, [aboutImgLeft]);

  useEffect(() => {
    if (aboutImgRight && aboutImgRight.length > 0) {
      setValues(prev => ({ ...prev, about_img_right: JSON.stringify(aboutImgRight) }));
    } else {
      setValues(prev => ({ ...prev, about_img_right: "" }));
    }
  }, [aboutImgRight]);

  useEffect(() => {
    if (aboutImgBottom && aboutImgBottom.length > 0) {
      setValues(prev => ({ ...prev, about_img_bottom: JSON.stringify(aboutImgBottom) }));
    } else {
      setValues(prev => ({ ...prev, about_img_bottom: "" }));
    }
  }, [aboutImgBottom]);

  useEffect(() => {
    if (awardImg && awardImg.length > 0) {
      setValues(prev => ({ ...prev, award_img: JSON.stringify(awardImg) }));
    } else {
      setValues(prev => ({ ...prev, award_img: "" }));
    }
  }, [awardImg]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Prepare payload for backend
    const payload = {
      hero_title: values.hero_title,
      hero_des: values.hero_des,
      hero_client: values.hero_client,
      video: values.video,
      about_title: values.about_title,
      about_des: values.about_des,
      about_img_left: values.about_img_left,
      about_img_right: values.about_img_right,
      about_img_bottom: values.about_img_bottom,
      award_img: values.award_img,
      marquee_title: values.marquee_title,
      marquee_status: values.marquee_status,
      service_title: values.service_title,
      work_process_title: values.work_process_title,
      project_title: values.project_title,
      testimonial_title: values.testimonial_title,
      client_title: values.client_title,
      blog_title: values.blog_title,
      meta_title: values.meta_title,
      meta_des: values.meta_des,
      status: values.status
    };
    
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidhome/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Home page updated successfully");
          fetchData();
        } else {
          toast.error(result.message || "Failed to update home page");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update home page");
      });
  };

  return managerOpener === 2 ? (
    <Filemanagermain
      file={video}
      fileSetter={setVideo}
      openSetter={setManagerOpener}
    />
  ) : managerOpener === 3 ? (
    <Filemanagermain
      file={aboutImgLeft}
      fileSetter={setAboutImgLeft}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : managerOpener === 4 ? (
    <Filemanagermain
      file={aboutImgRight}
      fileSetter={setAboutImgRight}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : managerOpener === 6 ? (
    <Filemanagermain
      file={awardImg}
      fileSetter={setAwardImg}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : (
    <div>
      <PageHeader currentpage="Home" activepage="Pages" mainpage="Home" />
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

              {/* Hero Client */}
              <div>
                <label className="ti-form-label">Hero Client</label>
                <input
                  type="text"
                  name="hero_client"
                  value={values.hero_client || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Hero Client (e.g., 100+ Clients)"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">About Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* About Title */}
              <div>
                <label className="ti-form-label">About Title</label>
                <input
                  type="text"
                  name="about_title"
                  value={values.about_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter About Title"
                />
              </div>

              {/* About Description */}
              <div>
                <label className="ti-form-label">About Description</label>
                <textarea
                  name="about_des"
                  value={values.about_des || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter About Description"
                  rows="6"
                />
              </div>

              {/* About Images */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Left Image */}
                <div>
                  <label className="ti-form-label">About Left Image</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(3)}
                    >
                      {aboutImgLeft.length > 0 ? "Change Left Image" : "Select Left Image"}
                    </button>
                    {aboutImgLeft.length > 0 && (
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${aboutImgLeft[0]}`}
                          className="w-full h-24 rounded-sm object-cover border"
                          alt="About Left"
                        />
                        <button
                          type="button"
                          onClick={() => setAboutImgLeft([])}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Image */}
                <div>
                  <label className="ti-form-label">About Right Image</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(4)}
                    >
                      {aboutImgRight.length > 0 ? "Change Right Image" : "Select Right Image"}
                    </button>
                    {aboutImgRight.length > 0 && (
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${aboutImgRight[0]}`}
                          className="w-full h-24 rounded-sm object-cover border"
                          alt="About Right"
                        />
                        <button
                          type="button"
                          onClick={() => setAboutImgRight([])}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Image */}
                <div>
                  <label className="ti-form-label">About Bottom Image</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(5)}
                    >
                      {aboutImgBottom.length > 0 ? "Change Bottom Image" : "Select Bottom Image"}
                    </button>
                    {aboutImgBottom.length > 0 && (
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${aboutImgBottom[0]}`}
                          className="w-full h-24 rounded-sm object-cover border"
                          alt="About Bottom"
                        />
                        <button
                          type="button"
                          onClick={() => setAboutImgBottom([])}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Award Image */}
                <div>
                  <label className="ti-form-label">Award Image</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="ti-btn ti-btn-outline-primary w-full"
                      onClick={() => setManagerOpener(6)}
                    >
                      {awardImg.length > 0 ? "Change Award Image" : "Select Award Image"}
                    </button>
                    {awardImg.length > 0 && (
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${awardImg[0]}`}
                          className="w-full h-24 rounded-sm object-cover border"
                          alt="Award"
                        />
                        <button
                          type="button"
                          onClick={() => setAwardImg([])}
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

          {/* Section Titles */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Section Titles</h5>
            </div>
            <div className="box-body space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="ti-form-label">Core_value_title</label>
                  <input
                    type="text"
                    name="marquee_title"
                    value={values.marquee_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter core_value_title"
                  />
                </div>
                <div>
                  <label className="ti-form-label">Service Title</label>
                  <input
                    type="text"
                    name="service_title"
                    value={values.service_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter Service Title"
                  />
                </div>
                <div>
                  <label className="ti-form-label">Work Process Title</label>
                  <input
                    type="text"
                    name="work_process_title"
                    value={values.work_process_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter Work Process Title"
                  />
                </div>
                <div>
                  <label className="ti-form-label">Project Title</label>
                  <input
                    type="text"
                    name="project_title"
                    value={values.project_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter Project Title"
                  />
                </div>
                <div>
                  <label className="ti-form-label">Testimonial Title</label>
                  <input
                    type="text"
                    name="testimonial_title"
                    value={values.testimonial_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter Testimonial Title"
                  />
                </div>
                <div>
                  <label className="ti-form-label">Client Title</label>
                  <input
                    type="text"
                    name="client_title"
                    value={values.client_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter Client Title"
                  />
                </div>
                <div>
                  <label className="ti-form-label">Blog Title</label>
                  <input
                    type="text"
                    name="blog_title"
                    value={values.blog_title || ""}
                    onChange={handleInputChange}
                    className="ti-form-input"
                    placeholder="Enter Blog Title"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xxl:col-span-12">
          {/* Video Section */}
          <div className="box">
            <div className="box-header">Video</div>
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

          {/* Marquee Status */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Core_value_status</h5>
            </div>
            <div className="box-body">
              <Select
                value={{
                  value: values.marquee_status,
                  label: values.marquee_status === 1 ? "Enable" : "Disable"
                }}
                options={[
                  { value: 1, label: "Enable" },
                  { value: 0, label: "Disable" },
                ]}
                onChange={(selected) =>
                  setValues((prev) => ({ ...prev, marquee_status: selected.value }))
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

export default Home;
