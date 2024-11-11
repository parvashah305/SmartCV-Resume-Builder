import React, { useState } from 'react';
import './FormStyles.css';
import { Link, useLocation } from 'react-router-dom';

function Experience() {
  const location = useLocation();
  const [personal, setPersonal] = useState(location.state.primary);
  const [education, setEducation] = useState(location.state.educationList);
  
  const [experiences, setExperiences] = useState([{ company: '', role: '', description: '', startdate:'', enddate:'' }]);

  const handleChange = (index, e) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][e.target.name] = e.target.value;
    setExperiences(updatedExperiences);
  };
  
  const addExperience = () => {
    setExperiences([...experiences, { company: '', role: '', description: '' ,startdate:'', enddate:'' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const isExperienceListValid = experiences.every(({ company, role, description }) => company && role && description);

  return (
    <div className="form-container">
      <h2 className="form-header">Experience Details</h2>
      <form onSubmit={handleSubmit}>
        {experiences.map((experience, index) => (
          <div className="form-fields" key={index}>
            <div className="form-group">
              <label htmlFor={`company-${index}`}>Company *</label>
              <input
                type="text"
                name="company"
                id={`company-${index}`}
                value={experience.company}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`role-${index}`}>Role *</label>
              <input
                type="text"
                name="role"
                id={`role-${index}`}
                value={experience.role}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`description-${index}`}>Description *</label>
              <textarea
                name="description"
                id={`description-${index}`}
                value={experience.description}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`startdate-${index}`}>Joining Date *</label>
              <input
                type="text"
                name="startdate"
                id={`startdate-${index}`}
                value={experience.startdate}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`enddate-${index}`}>Ending Date *</label>
              <input
                type="text"
                name="enddate"
                id={`enddate-${index}`}
                value={experience.enddate}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addExperience}>
          Add More
        </button>
        <div className="form-actions">
          <Link to="/education">
            <button type="button">Back</button>
          </Link>
          <Link to="/projects" state={{ personal, education, experiences }}>
            <button type="button" disabled={!isExperienceListValid}>Next</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Experience;