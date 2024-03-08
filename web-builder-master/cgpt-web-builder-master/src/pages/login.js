import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import styles from "./registration.module.css";
import { useRouter } from 'next/router';
import axios from "axios";
export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmit,setisSubmit]=useState(false);
  
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
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    console.log("Errors:", errors);
    if (Object.keys(errors).length === 0) {
      console.log("Form data:", formData);
    } else {
      setErrors(errors);
      setisSubmit(true);
    }
    setisSubmit(true);
    console.log("before API")
    if(Object.keys(setErrors).length==0 && isSubmit==false)
    {
      console.log(formData)
      axios.post("http://localhost:5000/user/login",formData).then((Response)=>{
        console.log(Response);
        console.log(Response.data.message);
       console.log(Response.data.datas);
        console.log(Response.data.status);
       localStorage.setItem("userData", JSON.stringify(Response.data.datas));
        console.log(localStorage.getItem("userData"))
        toast.success("Login successful");
        router.push("/webBuilder")
      }).catch((error)=>{
        toast.success(error)
        console.log(error)
      })
    }

  };

  return (
    <div className={styles.bods}>
      <div className={styles.login_container}>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <h2>Login</h2>
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

          {errors.username && (
      <span   className={styles.error}>{errors.username}</span>
)}

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
           {errors.password &&  (
  <span  className={styles.error}>{errors.password}</span>
)}

          </div>
          <button className={styles.buttons} type="submit">
            Login
          </button>
          <p className={styles.link}>
            <a href="#" className={styles.as}>
              Forgot Username?
            </a>
          </p>
          <p className={styles.link}>
            <a  className={styles.as} onClick={()=>router.push('/forgetPassword')}>
              Forgot Password?
            </a>
          </p>
          <p className={styles.link}>
            Don't have an account?{" "}
            <a  className={styles.as} onClick={() => router.push('/registration')}>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
