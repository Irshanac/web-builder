import React, { useState } from "react";
import styles from "./registration.module.css";
import { useRouter } from 'next/router';
export default function forgetPassword() {
   const [formData, setFormData] = useState({
        email: "",
      });
    
      const [errors, setErrors] = useState({});
      const router = useRouter();
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
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
        if (!formData.email.trim()) {
          errors.email = "Email is required";
        }
        console.log("Errors:", errors);
        if (Object.keys(errors).length === 0) {
          console.log("Form data:", formData);
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
          <h2>Forgot password</h2>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="username">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
            />

          {errors.email&& (
      <span   className={styles.error}>{errors.email}</span>
)}
          </div>
          <p className={styles.link}>
           
            <button className={styles.buttons} onClick={() => router.push('/ResetPassword')} type="submit">
            submit
          </button>
          </p>
        </form>
      </div>
    </div>
  );
  }
