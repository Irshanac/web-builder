import React, { useState, useEffect } from "react";
import styles from "./registration.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyEmail() {
  const [email, setEmail] = useState(null);
  const [formData, setFormData] = useState({
    otp: '',
  });
  const router = useRouter();
  
//   console.log(email);
//   useEffect(() => {
//     // You can access localStorage safely here in the client-side code
//     const storedEmail = localStorage.getItem("email");
//     console.log(storedEmail);
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");
    console.log(storedEmail);
    try {
      const response = await axios.post('http://localhost:5000/user/verifyOTP', {
        email: storedEmail,
        otp: formData.otp
      });
      toast.success(response.data.message);
      router.push("/resetPassword")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.bods}>
      <div className={styles.login_container}>
        <form className={styles.login_form} onSubmit={handleOtpSubmit}>
          <h2>Enter OTP</h2>
          <Toaster/>
          <input
            className={styles.otpEnter}
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
          />
          <button className={styles.buttons} type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}
