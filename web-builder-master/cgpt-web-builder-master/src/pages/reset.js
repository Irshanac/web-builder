import React, { useState } from 'react';
import styles from "./registration.module.css";
import { useRouter } from 'next/router';
export default function resetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        Cpassword: ''
      });
    
      const [errors, setErrors] = useState({}); 
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
          const  password  = formData;
          const userData =  password ;
          console.log('Form data:', userData);
          
          // Clear form data after successful registration
          setFormData({
            password: '',
            Cpassword: ''
          });
        } else {
          setErrors(errors);
        }
      };
      
      return (
        <div className={styles.bods}>
        <div className={styles.login_container}>
          <form className={styles.login_form} onSubmit={handleSubmit}>
          <a href="#" className={styles.back_arrow} onClick={() => router.push('/')}>
              ←
            </a>
            <h2>Forget Password</h2>
           
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
          
            
            <button className={styles.buttons} type="submit">Submit</button>
          </form>
        </div>
      </div>
  )
}
