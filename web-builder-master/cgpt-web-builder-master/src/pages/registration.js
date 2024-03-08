import React, { useState } from 'react';
import styles from "./registration.module.css";
import { useRouter } from 'next/router';
import axios from "axios";
import toast from 'react-hot-toast';
export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    Cpassword: ''
  });

  const [errors, setErrors] = useState({}); 
  const [isSubmit,setisSubmit]=useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFocus = (name) => {
    // Clear the error message for the focused field
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form data
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }else {
      const nameRegex = /^[A-Za-z]{5,}$/;
      if (!nameRegex.test(formData.name)) {
        errors.name = 'Name must contain at least 5 alphabetic characters';
      }
    }
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.trim().length < 5) {
      errors.username = 'Username must be at least 6 characters';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.trim().length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol';
    }
    if (!formData.Cpassword.trim()) {
      errors.Cpassword = 'Confirm your password';
    }
    if (formData.password !== formData.Cpassword) {
      errors.Cpassword = 'Passwords do not match';
    }
  
    if (Object.keys(errors).length === 0) {
      const { name, username, email, password } = formData;
      const userData = { name, username, email, password };
      console.log('Form data:', userData);
      
      // Clear form data after successful registration
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        Cpassword: ''
      });
    } else {
      setErrors(errors);
    }
    setisSubmit(true)
    if(Object.keys(setErrors).length==0 && isSubmit==true)
    {
      console.log(formData)
      axios.post("http://localhost:5000/user/register",userData).then((Response)=>{
        console.log(Response);
        toast.success("Registration comp")
        router.push("/")

      }).catch((error)=>{
        toast.error(error)
      })
    }
  };
  
  return (
    <div className={styles.bods}>
      <div className={styles.login_container}>
        <form className={styles.login_form} onSubmit={handleSubmit}>
        <a href="#" className={styles.back_arrow} onClick={() => router.push('/')}>
            ←
          </a>
          <h2>Register</h2>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="name">
              Name:
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="username">
              Username:
            </label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus("username")}
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="email">
              Email:
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="password">
              Password:
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
            />
           {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="Cpassword">
              Confirm Password:
            </label>
            <input 
              type="password" 
              id="Cpassword" 
              name="Cpassword" 
              value={formData.Cpassword}
              onChange={handleChange}
              onFocus={() => handleFocus("Cpassword")}
            />
            {errors.Cpassword && <span className={styles.error}>{errors.Cpassword}</span>}
          </div>
          <button className={styles.buttons} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
