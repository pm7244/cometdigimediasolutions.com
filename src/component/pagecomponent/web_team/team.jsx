import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import Filemanagermain from "../fileManager/filemanagermain";

const WebTeam = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    hero_title: "",
    group_image: "",
    team_title: "",
    meta_title: "",
    meta_des: "",
    status: 1
  });
  
  const [groupImage, setGroupImage] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  
  // Teams section
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  
  // Team Members section
  const [teamMembers, setTeamMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);

  const fetchData = () => {
    // Fetch web_team data
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallwebteam`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Team data received:", data);
        if (data.status && data.data && data.data.length > 0) {
          const teamData = data.data[0];
          
          // Parse arrays from JSON strings
          let groupImageData = [];
          
          try {
            if (teamData.group_image) {
              groupImageData = JSON.parse(teamData.group_image);
            }
          } catch (parseError) {
            console.warn("Error parsing JSON fields:", parseError);
          }
          
          setGroupImage(groupImageData);
          
          setValues({
            hero_title: teamData.hero_title || "",
            group_image: teamData.group_image || "",
            team_title: teamData.team_title || "",
            meta_title: teamData.meta_title || "",
            meta_des: teamData.meta_des || "",
            status: teamData.status || 1
          });
        } else {
          console.log("No team data found, using defaults");
          setValues({
            hero_title: "",
            group_image: "",
            team_title: "",
            meta_title: "",
            meta_des: "",
            status: 1
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch team data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // Update values when image states change
  useEffect(() => {
    if (groupImage && groupImage.length > 0) {
      setValues(prev => ({ ...prev, group_image: JSON.stringify(groupImage) }));
    } else {
      setValues(prev => ({ ...prev, group_image: "" }));
    }
  }, [groupImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidwebteam/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Team page updated successfully");
        fetchData();
      } else {
        toast.error("Failed to update team page");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating");
    }
  };

  // Fetch teams
  const fetchTeams = () => {
    setTeamsLoading(true);
    console.log("Fetching teams from:", `${import.meta.env.VITE_CMS_URL}api/getallteam`);
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallteam`)
      .then((res) => {
        console.log("Team response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Teams received:", data);
        if (data.status && data.data) {
          console.log("Teams data:", data.data);
          setTeams(data.data);
        } else {
          console.log("No teams data found");
          setTeams([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
        toast.error("Failed to fetch teams: " + err.message);
        setTeams([]);
      })
      .finally(() => {
        setTeamsLoading(false);
      });
  };

  // Fetch team members
  const fetchTeamMembers = () => {
    setMembersLoading(true);
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallmember`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Team members received:", data);
        if (data.status && data.data) {
          setTeamMembers(data.data);
        } else {
          setTeamMembers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching team members:", err);
        toast.error("Failed to fetch team members");
        setTeamMembers([]);
      })
      .finally(() => {
        setMembersLoading(false);
      });
  };

  // Delete team
  const handleDeleteTeam = async (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidteam/${teamId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success("Team deleted successfully");
          fetchTeams();
        } else {
          toast.error("Failed to delete team");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting team");
      }
    }
  };

  // Delete team member
  const handleDeleteMember = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidmember/${memberId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success("Team member deleted successfully");
          fetchTeamMembers();
        } else {
          toast.error("Failed to delete team member");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting team member");
      }
    }
  };

  // Navigate to add new team page
  const handleAddNewTeam = () => {
    navigate("/cms/pages/web_team/create");
  };

  // Navigate to edit team page
  const handleEditTeam = (team) => {
    console.log("Edit team clicked:", team);
    console.log("Team ID:", team.id);
    navigate(`/cms/pages/web_team/edit/${team.id}`);
  };

  // Navigate to add new team member page
  const handleAddNewMember = () => {
    navigate("/cms/pages/web_team/create-member");
  };

  // Navigate to edit team member page
  const handleEditMember = (member) => {
    console.log("Edit member clicked:", member);
    console.log("Member ID:", member.m_id);
    navigate(`/cms/pages/web_team/edit-member/${member.m_id}`);
  };

  // Initialize teams and members on component mount
  useEffect(() => {
    fetchTeams();
    fetchTeamMembers();
  }, []);

  return managerOpener ? (
    <Filemanagermain
      file={groupImage}
      fileSetter={setGroupImage}
      openSetter={setManagerOpener}
      maxFiles={1}
      ratio={16 / 9}
      type="image"
    />
  ) : (
    <div>
      <PageHeader currentpage="Web Team" activepage="Pages" mainpage="Web Team" />
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

              {/* Group Image */}
              <div>
                <label className="ti-form-label">Group Image</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="ti-btn ti-btn-outline-primary w-full"
                    onClick={() => setManagerOpener(true)}
                  >
                    {groupImage.length > 0 ? "Change Group Image" : "Select Group Image"}
                  </button>
                  {groupImage.length > 0 && (
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_CMS_URL}api/transform/${groupImage[0]}`}
                        className="w-full h-32 rounded-sm object-cover border"
                        alt="Group"
                      />
                      <button
                        type="button"
                        onClick={() => setGroupImage([])}
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

          {/* Team Section */}
          <div className="box">
            <div className="box-header">
              <h5 className="box-title">Team Section</h5>
            </div>
            <div className="box-body space-y-5">
              {/* Team Title */}
              <div>
                <label className="ti-form-label">Team Title</label>
                <input
                  type="text"
                  name="team_title"
                  value={values.team_title || ""}
                  onChange={handleInputChange}
                  className="ti-form-input"
                  placeholder="Enter Team Title"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="box">
            <div className="box-body space-y-5">
              <label className="ti-form-label">Status</label>
              <Select
                classNamePrefix="react-select"
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
      
      {/* Team Content Management */}
      <div className="grid grid-cols-12 gap-x-6 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Team Content Management</h5>
                <button
                  type="button"
                  onClick={handleAddNewTeam}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Team
                </button>
              </div>
            </div>
            <div className="box-body">
              {teamsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading teams...</span>
                </div>
              ) : teams.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No teams found. Click "Add New Team" to create your first team.
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
                          IMAGE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          NAME
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          POST
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          EMAIL
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          PHONE
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {teams.map((team, index) => (
                        <tr key={team.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4">
                            {team.image ? (
                              (() => {
                                try {
                                  const teamImages = JSON.parse(team.image);
                                  const imageUrl = Array.isArray(teamImages) ? teamImages[0] : team.image;
                                  return (
                                    <img
                                      className="h-12 w-16 rounded object-cover"
                                      src={`${import.meta.env.VITE_CMS_URL}api/transform/${imageUrl}`}
                                      alt={team.name}
                                    />
                                  );
                                } catch (e) {
                                  return (
                                    <img
                                      className="h-12 w-16 rounded object-cover"
                                      src={`${import.meta.env.VITE_CMS_URL}api/transform/${team.image}`}
                                      alt={team.name}
                                    />
                                  );
                                }
                              })()
                            ) : (
                              <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Image</span>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {team.name}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {team.post || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {team.email || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {team.phone_no || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditTeam(team)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteTeam(team.id)}
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

      {/* Team Member Content Management */}
      <div className="grid grid-cols-12 gap-x-6 mt-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center w-full">
                <h5 className="box-title">Team Member Content Management</h5>
                <button
                  type="button"
                  onClick={handleAddNewMember}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Team Member
                </button>
              </div>
            </div>
            <div className="box-body">
              {membersLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <span className="ml-2">Loading team members...</span>
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No team members found. Click "Add New Team Member" to create your first team member.
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
                          IMAGE
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          NAME
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          POSITION
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                          SOCIAL LINKS
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {teamMembers.map((member, index) => (
                        <tr key={member.m_id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4">
                            {member.image ? (
                              (() => {
                                try {
                                  const memberImages = JSON.parse(member.image);
                                  const imageUrl = Array.isArray(memberImages) ? memberImages[0] : member.image;
                                  return (
                                    <img
                                      className="h-12 w-16 rounded object-cover"
                                      src={`${import.meta.env.VITE_CMS_URL}api/transform/${imageUrl}`}
                                      alt={member.name}
                                    />
                                  );
                                } catch (e) {
                                  return (
                                    <img
                                      className="h-12 w-16 rounded object-cover"
                                      src={`${import.meta.env.VITE_CMS_URL}api/transform/${member.image}`}
                                      alt={member.name}
                                    />
                                  );
                                }
                              })()
                            ) : (
                              <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Image</span>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">
                              {member.position || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              {member.instagram && (
                                <a
                                  href={member.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-pink-600 hover:text-pink-800"
                                  title="Instagram"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                  </svg>
                                </a>
                              )}
                              {member.linkedin && (
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                  title="LinkedIn"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditMember(member)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.m_id)}
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

export default WebTeam;
