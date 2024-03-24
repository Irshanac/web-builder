import React, { useState, useEffect } from "react";
import  toast ,{Toaster} from "react-hot-toast";
import styles from "./registration.module.css";
import { useRouter } from "next/router";
import axios from "axios";
export default function resetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    Cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
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
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}/.test(formData.password)
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol";
    }
    if (!formData.Cpassword.trim()) {
      errors.Cpassword = "Confirm your password";
    }
    if (formData.password !== formData.Cpassword) {
      errors.Cpassword = "Passwords do not match";
    }
    setErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      const password = formData.password;
      const email = localStorage.getItem("email");
      const reset = { password, email };
      console.log(reset)
      localStorage.removeItem("email");
  
      axios
        .post("http://localhost:5000/user/resetPassword", reset)
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message)
          router.push("/login");
        })
        .catch((error) => {
          //console.error("Reset password error:", error);
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
          <h2>Reset Password</h2>
          < Toaster/>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="email">
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
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div className={styles.form_group}>
            <label className={styles.ladels} htmlFor="email">
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
            {errors.Cpassword && (
              <span className={styles.error}>{errors.Cpassword}</span>
            )}
          </div>

          <button className={styles.buttons} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
