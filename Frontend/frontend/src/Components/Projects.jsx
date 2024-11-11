import React, { useState } from 'react';
import './FormStyles.css';
import { Link,useLocation } from 'react-router-dom';

function Projects() {
  const location=useLocation()
  const [personal, setPersonal] = useState(location.state.personal);
  const [education, setEducation] = useState(location.state.education);
  const [experiences, setExperiences] = useState(location.state.experiences);
  const [projects, setProjects] = useState([{ title: '', description: '', link: '' }]);

  const handleChange = (index, e) => {
    const updatedProjects = [...projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setProjects(updatedProjects);
  };
 
  const addProject = () => {
    setProjects([...projects, { title: '', description: '', link: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to next page or save data
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Project Details</h2>
      <form onSubmit={handleSubmit}>
        {projects.map((project, index) => (
          <div className="form-fields" key={index}>
            <div className="form-group">
              <label htmlFor={`title-${index}`}>Project Title</label>
              <input
                type="text"
                name="title"
                id={`title-${index}`}
                value={project.title}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`description-${index}`}>Project Description</label>
              <textarea
                name="description"
                id={`description-${index}`}
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`link-${index}`}>Project Link</label>
              <input
                type="url"
                name="link"
                id={`link-${index}`}
                value={project.link}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addProject}>
          Add More
        </button>
        <div className="form-actions">
        <Link to="/experience"><button type="button" >Back</button> </Link>
        <Link to="/skills" state={{personal,education,experiences,projects}}><button type="button" >Next</button> </Link>
        </div>
      </form>
    </div>
  );
}

export default Projects;