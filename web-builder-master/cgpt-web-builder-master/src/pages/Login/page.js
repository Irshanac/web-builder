import React from 'react'
import styles from "./login.module.css"
//import '../styles/global.css';

export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          
           <form action="#">
           <div className={styles.title}>
           <span>Login Form</span>
           </div>
                <div className={styles.row}>
                 <i className="fas fa-user" />
                 <input type="text" placeholder="Email or Phone" required="" />
                </div>
                <div className={styles.row}>
                               <i className="fas fa-lock" />
        <input type="password" placeholder="Password" required="" />
      </div>
      <div className={styles.pass}>
        <a href="#">Forgot password?</a>
      </div>
      <div className={styles.row_button}>
        <input type="submit" defaultValue="Login" />
      </div>
      <div className={styles.signup_link}>
        Not a member? <a href="#">Signup now</a>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

