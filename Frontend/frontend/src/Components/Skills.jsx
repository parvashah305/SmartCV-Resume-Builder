import React, { useState } from 'react';
import './FormStyles.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import { toast } from 'react-toastify';

function Skills() {
  const location = useLocation();
  const [personal, setPersonal] = useState(location.state.personal);
  const [education, setEducation] = useState(location.state.education);
  const [experiences, setExperiences] = useState(location.state.experiences);
  const [projects, setProjects] = useState(location.state.projects);
  const [skills, setSkills] = useState([{ skill: '', proficiency: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const[authUser,setAuthUser]=useAuth()

  const handleChange = (index, e) => {
    const updatedSkills = [...skills];
    updatedSkills[index][e.target.name] = e.target.value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { skill: '', proficiency: '' }]);
  };

  const handleDownload = async () => {
   
    const userData = {
      personal: { 
        name: `${personal.firstName} ${personal.lastName}`,
        email: personal.email,
        phone: personal.phoneNumber,
        website: personal.website,
        github: personal.github,
        instagram: personal.instagram,
      },
      education,
      experiences, 
      projects,
      skills,
    };

    if(!authUser){
      toast.error("Please Logged in to download the resume")
    }
    else{
      setLoading(true); 
      setError(null); 
      setSuccess(false); 
      try {
        const response = await fetch('http://localhost:5001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          const blob = await response.blob(); 
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'resume.pdf'; 
          link.click();
          setSuccess(true); 
        } else {
          const errorData = await response.json();
          console.error('Failed to generate resume:', response.status, errorData.error);
          setError(`Failed to generate resume: ${errorData.error}`); 
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while generating the resume.'); 
      } finally {
        setLoading(false); 
      }
    }

  };

  return (
    <div className="form-container">
      <h2 className="form-header">Skills and Languages</h2>
      {error && <div style={{textAlign:"center",paddingBottom:"20px"}} className="error-message">{error}</div>}{/* Display error message */}
      {success && <div style={{textAlign:"center",paddingBottom:"20px"}} className="success-message">Resume downloaded successfully!</div>} {/* Display success message */}
      <form onSubmit={(e) => e.preventDefault()}>
        {skills.map((skill, index) => (
          <div className="form-fields" key={index}>
            <div className="form-group">
              <label htmlFor={`skill-${index}`}>Skill</label>
              <input
                type="text"
                name="skill"
                id={`skill-${index}`}
                value={skill.skill}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`proficiency-${index}`}>Proficiency Level</label>
              <input
                type="text"
                name="proficiency"
                id={`proficiency-${index}`}
                value={skill.proficiency}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addSkill}>
          Add More
        </button>
        <div className="form-actions">
          <Link to="/projects">
            <button type="button">Back</button>
          </Link>
          <button type="button" onClick={handleDownload} disabled={loading}>
            {loading ? 'Downloading...' : 'DOWNLOAD RESUME'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Skills;