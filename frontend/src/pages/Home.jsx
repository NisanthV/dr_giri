import React, { useEffect } from "react";
import Login from "../components/Login";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import a from "../assets/a.mp4";

export default function Home() {
  const [Isshow, setIsshow] = useState(false);
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("isLogin") || false
  );
  
  useEffect(() => {
    if (!isLogin) {
      const timer = setTimeout(() => {
        setIsshow(true);
      }, 10000);
      return () => {
        clearTimeout(timer);
      };
    }else{
      setIsLogin(true);
      setIsshow(false);  
    }
  }, [isLogin]);



  return (
    <div className={styles.home}>
      <h1>Home</h1>
     

      
      {Isshow && <div className={styles.overlay}> <Login /> </div>}
      <div className={styles.body}>
        <div className={styles.box1}>
          <video
            src={a}
            controls
            autoPlay
            loop
            muted
            className={styles.video}
          ></video>
        </div>
        <div className={styles.box2}>Top Dental Influencers</div>
        <div className={styles.box3}>abd</div>
        <div className={styles.box4}>University Updates</div>
        <div className={styles.box5}>AIDSA NEWS</div>
        <div className={styles.box6}>Advertisement</div>
        <div className={styles.box7}>Advertisement</div>
        <div className={styles.box8}>Advertisement</div>
        <div className={styles.box9}>Advertisement</div>
        <div className={styles.box10}>Advertisement</div>
      </div>
    </div>
  );
}
