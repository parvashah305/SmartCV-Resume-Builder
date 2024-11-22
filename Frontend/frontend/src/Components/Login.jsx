import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { json, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ closeModal }) { 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(()=>{
    toast.dismiss()
  },[])

  const onSubmit = async (data) => {
    console.log('Login submitted:', data);
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch("http://localhost:5001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
        setTimeout(()=>{
            closeModal()
            window.location.reload()
        },4000)
        localStorage.setItem("Users",JSON.stringify(result))
      } else {
        toast.error(`Error: ${result.message}`, {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
        });
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
    closeModal()  
  };

  return (
    <>
     
      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email.message}</span>}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              style={styles.input}
            />
            {errors.password && <span style={styles.error}>{errors.password.message}</span>}
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.signupPrompt}>Don't have an account?</p>
        <button onClick={handleSignupRedirect} style={styles.signupButton}>Sign Up</button>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: "black",
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  signupPrompt: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  signupButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

export default Login;