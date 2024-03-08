import React, { useState } from 'react';
import emailImage from "../../public/email.png";
import passImage from "../../public/padlock.png";
import styles from "./registration.module.css"
export default function Registration() {
    const [formType, setFormType] = useState('login');
  
    const handleButtonClick = (type) => {
      setFormType(type);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission based on formType
      if (formType === 'login') {
        // Handle login form submission
        console.log('Logging in...');
      } else {
        // Handle registration form submission
        console.log('Registering...');
      }
    };
  return (
    <div className={styles.registration}>

      <div className={styles.wrapper}>
      <div className={styles.side_click}>
      <button className={styles.new_btn} onClick={() => handleButtonClick('login')} defaultValue={'login'}>login</button>
      <button className={styles.new_btn} onClick={() => handleButtonClick('registration')}>Registration</button>

    </div>



    {formType === 'login' ? (
      <form action="#">
        <h2>Login</h2>
           <div className={styles.row}>
           <img  className={styles.images} src={emailImage} alt="Email logo" />
                         
            <input type="text" placeholder="Email" required="" />
           </div>
           <div className={styles.row}>
           <img  className={styles.images} src={passImage} alt="password logo" />
                        
   <input type="password" placeholder="Password" required="" />
 </div>
 <div className={styles.pass}>
   <a href="#">Forgot password?</a>
 </div>
 <div className={styles.row_button}>
   <input type="submit" defaultValue="Login" />
 </div>

</form>
        
      ) : (
        <form action="#">
    <h2>Registration</h2>
    <div className={styles.input_box}>
      <input type="text" placeholder="Enter your name" required="" />
    </div>
    <div className={styles.input_box}>
      <input type="text" placeholder="Enter your username" required="" />
    </div>
    <div className={styles.input_box}>
      <input type="text" placeholder="Enter your email" required="" />
    </div>
    <div className={styles.input_box}>
      <input type="password" placeholder="Create password" required="" />
    </div>
    <div className={styles.input_box}>
      <input type="password" placeholder="Confirm password" required="" />
    </div>
    <div className={styles.policy}>
      <input type="checkbox" />
      <h3 className={styles.heading}>I accept all terms &amp; condition</h3>
    </div>
    <div className={styles.input_box_button}>
      <input type="Submit" defaultValue="Register Now" />
    </div>
    <div className={styles.text}>
      <h3>
        Already have an account? <a href="#">Login now</a>
      </h3>
    </div>
  </form>
      )}
 
    
</div>

    </div>
  )
}
