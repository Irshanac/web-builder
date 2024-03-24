import React from 'react';
import styles from './logout.module.css';
import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();
    const logouts = () => {
        // Remove user data from local storage
        localStorage.removeItem("userData");
        // Redirect to the login page
        router.push("/login");
    };
    return (
        <div className={styles.circle}>
            <button className={styles.logout} onClick={logouts}>Logout</button>
        </div>
    );
}
