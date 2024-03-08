import React, { useState } from "react";
import styles from "./registration.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-hot-toast';
export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: '',
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
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (Object.keys(errors).length === 0) {
      const email = formData.email;// Declare email variable
      const emailstore=localStorage.getItem("email")
      if(email!==emailstore){
        localStorage.setItem("email", JSON.stringify(email));
      }
      setFormData({
        email: '',
      });
      axios.post("http://localhost:5000/user/forgetPassword", { email })
        .then((response) => {
          toast.success("Registration comp");
          console.log(response.data.message);
          router.push("/resetPassword");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      setErrors(errors);
      setisSubmit(true);
    }
  
  };

  return (
    <div className={styles.bods}>
      <div className={styles.login_container}>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <a
            className={styles.back_arrow}
            onClick={() => router.push("/")}
          >
            ←
          </a>
          <h2>Forgot password</h2>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
            />

            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <p className={styles.link}>
            <button className={styles.buttons} type="submit">
              Submit
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
