import React, { useState } from 'react';
import './FormStyles.css';
import { Link, useLocation } from 'react-router-dom';

function Education() {
  const location = useLocation();
  const [primary, setPrimary] = useState(location.state);
  const [educationList, setEducationList] = useState([{ degree: '', institution: '', year: '' ,grade: ''}]);

  const handleChange = (index, e) => {
    const updatedList = [...educationList];
    updatedList[index][e.target.name] = e.target.value;
    setEducationList(updatedList);
  };
  
  const addEducation = () => {
    setEducationList([...educationList, { degree: '', institution: '', year: '' ,grade: ''}]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const isEducationListValid = educationList.every(({ degree, institution, year,grade }) => degree && institution && year && grade);

  return (
    <div className="form-container">
      <h2 className="form-header">Education Details</h2>
      <form onSubmit={handleSubmit}>
        {educationList.map((education, index) => (
          <div className="form-fields" key={index}>
            <div className="form-group">
              <label htmlFor={`degree-${index}`}>Degree *</label>
              <input
                type="text"
                name="degree"
                id={`degree-${index}`}
                value={education.degree}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`institution-${index}`}>Institution *</label>
              <input
                type="text"
                name="institution"
                id={`institution-${index}`}
                value={education.institution}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`year-${index}`}>Year of Graduation *</label>
              <input
                type="text"
                name="year"
                id={`year-${index}`}
                value={education.year}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`grade-${index}`}>Grade *</label>
              <input
                type="text"
                name="grade"
                id={`grade-${index}`}
                value={education.grade}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEducation}>
          Add More
        </button>
        <div className="form-actions">
          <Link to="/">
            <button type="button">Back</button>
          </Link>
          <Link to="/experience" state={{ primary, educationList }}>
            <button type="button" disabled={!isEducationListValid}>Next</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Education;



