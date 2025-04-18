import React, { useState, useEffect } from "react";
import style from "../styles/Profile.module.css"; // CSS module
import { FaPen, FaTrash, FaPlus, FaSave, FaTimes, FaUpload } from "react-icons/fa";
import styles1 from "../styles/Home.module.css";
import Login from "../components/Login";
import { api } from "../api";


const Profile = () => {
  // Load profile from sessionStorage (or replace with API call)
  const [profile, setProfile] = useState(
    JSON.parse(sessionStorage.getItem("data")) || {
      _id: "",
      email: "",
      skills: [],
      applied: [],
      experience: [],
    }
  );

  const [showLogin, setShowLogin] = useState(false);
  // const [change,setChange] = useState(0)

  const fetchData = async () => {
    const response = await api.get(
      `api/user/${JSON.parse(sessionStorage.getItem("data"))._id}/`
    );
    setProfile(response.data.message);
    sessionStorage.setItem("data", JSON.stringify(response.data.message));
  };

//   const checkUpdate = (e) => {
//     if (profile.e.length !== JSON.parse(sessionStorage.getItem("data").e.length)) {
//       setChange((prev) => prev + 1);
//   }else{
    
//   }
// };


 

  useEffect(() => {
    let isLogin = sessionStorage.getItem("isLogin");
    if (!isLogin) {
      setShowLogin(true);
    }
    fetchData();
  }, []);

  // Local editing states for skills and experience
  const [editingSkills, setEditingSkills] = useState({});
  const [skillEdits, setSkillEdits] = useState({});

  const [editingExperience, setEditingExperience] = useState({});
  const [experienceEdits, setExperienceEdits] = useState({});

  if (!profile) {
    return <div className={style.loading}>Loading...</div>;
  }

  // ===== Skills functions =====
  const handleEditSkill = (index) => {
    setEditingSkills((prev) => ({ ...prev, [index]: true }));
    setSkillEdits((prev) => ({ ...prev, [index]: profile.skills[index] }));
  };

  const handleSaveSkill = (index) => {
    const newSkills = [...profile.skills];
    newSkills[index] = skillEdits[index];
    setProfile({ ...profile, skills: newSkills });
    setEditingSkills((prev) => ({ ...prev, [index]: false }));
  };

  const handleCancelEditSkill = (index) => {
    setEditingSkills((prev) => ({ ...prev, [index]: false }));
    setSkillEdits((prev) => {
      const newEdits = { ...prev };
      delete newEdits[index];
      return newEdits;
    });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: newSkills });
    // Reset editing states since indices change
    setEditingSkills({});
    setSkillEdits({});
  };

  const handleAddSkill = () => {
    if (profile.skills.length < 20) {
      const newSkills = [...profile.skills, ""];
      setProfile({ ...profile, skills: newSkills });
      const newIndex = newSkills.length - 1;
      setEditingSkills((prev) => ({ ...prev, [newIndex]: true }));
      setSkillEdits((prev) => ({ ...prev, [newIndex]: "" }));
    }
  };

  // ===== Experience functions =====
  const handleEditExperience = (index) => {
    setEditingExperience((prev) => ({ ...prev, [index]: true }));
    setExperienceEdits((prev) => ({
      ...prev,
      [index]: profile.experience[index],
    }));
  };

  const handleSaveExperience = (index) => {
    const newExperience = [...profile.experience];
    newExperience[index] = experienceEdits[index];
    setProfile({ ...profile, experience: newExperience });
    setEditingExperience((prev) => ({ ...prev, [index]: false }));
  };

  const handleCancelEditExperience = (index) => {
    setEditingExperience((prev) => ({ ...prev, [index]: false }));
    setExperienceEdits((prev) => {
      const newEdits = { ...prev };
      delete newEdits[index];
      return newEdits;
    });
  };

  const handleRemoveExperience = (index) => {
    const newExperience = profile.experience.filter((_, i) => i !== index);
    setProfile({ ...profile, experience: newExperience });
    setEditingExperience({});
    setExperienceEdits({});
  };

  const handleAddExperience = () => {
    if (profile.experience.length < 10) {
      const newExperience = [...profile.experience, ""];
      setProfile({ ...profile, experience: newExperience });
      const newIndex = newExperience.length - 1;
      setEditingExperience((prev) => ({ ...prev, [newIndex]: true }));
      setExperienceEdits((prev) => ({ ...prev, [newIndex]: "" }));
    }
  };

  // ===== Applied Jobs removal =====
  const handleRemoveApplied = (index) => {
    const newApplied = profile.applied.filter((_, i) => i !== index);
    setProfile({ ...profile, applied: newApplied });
  };
  const handleUpdate = async () => {
    const response = await api.patch("api/user/", profile);
    if (response.status === 200) {
      alert("Profile updated successfully");
      window.location.reload();
    } else {
      alert("Failed to update profile");
    }}
  return (
    <div className={style.profileContainer}>
      <h1 className={style.profileTitle}>Profile</h1>
      <div>
        {showLogin && (
          <div className={styles1.overlay}>
            <Login />
          </div>
        )}
      </div>
      
      <button onClick={()=>{window.location.replace("/manage")}}>Manage</button>
      {/* Email Section */}
      <div className={style.profileSection}>
        <h2>Email</h2>
        <p>{profile.email}</p>
      </div>

      {/* Skills Section */}
      <div className={style.profileSection}>
        <h2>Skills</h2>
        {profile.skills && profile.skills.length > 0 ? (
          <ul className={style.list}>
            {profile.skills.map((skill, index) => (
              <li key={index} className={style.listItem}>
                {editingSkills[index] ? (
                  <>
                    <input
                      type="text"
                      value={skillEdits[index] || ""}
                      onChange={(e) =>
                        setSkillEdits((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      maxLength={20}
                      className={style.input}
                      placeholder="Enter skill"
                    />
                    <button
                      onClick={() => handleSaveSkill(index)}
                      className={style.iconButton}
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => handleCancelEditSkill(index)}
                      className={style.iconButton}
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{skill}</span>
                    <button
                      onClick={() => handleEditSkill(index)}
                      className={style.iconButton}
                      title="Edit"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className={style.iconButton}
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills added yet.</p>
        )}
        {profile.skills.length < 20 && (
          <button onClick={handleAddSkill} className={style.addButton}>
            <FaPlus /> Add Skill
          </button>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className={style.profileSection}>
        <h2>Applied Jobs</h2>
        {profile.applied && profile.applied.length > 0 ? (
          <ul className={style.list}>
            {profile.applied.map((job, index) => (
              <li key={index} className={style.listItem}>
                <span>{job.name}</span>
                <span>{job.company}</span>
                <span>{job.role}</span>
                <button
                  onClick={() => handleRemoveApplied(index)}
                  className={style.iconButton}
                  title="Remove Application"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications found.</p>
        )}
      </div>

      {/* Experience Section */}
      <div className={style.profileSection}>
        <h2>Experience</h2>
        {profile.experience && profile.experience.length > 0 ? (
          <ul className={style.list}>
            {profile.experience.map((exp, index) => (
              <li key={index} className={style.listItem}>
                {editingExperience[index] ? (
                  <>
                    <textarea
                      value={experienceEdits[index] || ""}
                      onChange={(e) =>
                        setExperienceEdits((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      // Adjust maxLength or rows as needed
                      maxLength={200}
                      className={style.textarea}
                      placeholder="Enter experience details"
                    ></textarea>
                    <button
                      onClick={() => handleSaveExperience(index)}
                      className={style.iconButton}
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() => handleCancelEditExperience(index)}
                      className={style.iconButton}
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{exp}</span>
                    <button
                      onClick={() => handleEditExperience(index)}
                      className={style.iconButton}
                      title="Edit"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleRemoveExperience(index)}
                      className={style.iconButton}
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No experience listed.</p>
        )}
        {profile.experience.length < 10 && (
          <button onClick={handleAddExperience} className={style.addButton}>
            <FaPlus /> Add Experience
          </button>
        )}
      </div>
      <div><button onClick={()=>{handleUpdate()}}><FaUpload /></button></div>
    </div>
  );
};

export default Profile;
