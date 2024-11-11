import React, { useState } from 'react';
import './FormStyles.css';
import { Link, useNavigate} from 'react-router-dom';

function PersonalInfo() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    website: '',
    github: '',
    instagram: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  

  return (
    <div className="form-container">
      <h2 className="form-header">Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Your Website</label>
            <input
              type="url"
              name="website"
              id="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
              type="url"
              name="github"
              id="github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <input
              type="url"
              name="instagram"
              id="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button style={{backgroundColor:"gray"}} type="button" disabled>Back</button>
          <Link to="/education" state={formData}><button type="button" >Next</button> </Link>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
