// import React from "react";
// import { Link } from "react-router";
// import styles from "../styles/NavBar.module.css";
// import profileIcon from "../assets/profileIcon.png";

// export default function NavBar() {
//   return (
//     <div>
//       <nav className={styles.container}>
//         <ul className={styles.list}>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/books">Books</Link>
//           </li>

//           <li>
//             {/* <a
//               href="https://www.linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               LinkedIn
//             </a> */}
//             <Link to="/jobs">Jobs</Link>
//           </li>
//           <li>
//             <a href="https://dciindia.gov.in/CollegeSearch.aspx?ColName=&CourseId=1&SplId=0&StateId=&Hospital=&Type=0&Status=--Select--" target="_blank" rel="noopener noreferrer">College</a>
//           </li>
//           <li>
//             <Link to="/products">Products</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           {
//             sessionStorage.getItem("isLogin") && (<li>
//               <img src={profileIcon} alt="profile" onClick={()=>{window.location.replace("/profile")}} className={styles.img}/>
//             </li>)
//           }
//         </ul>
//       </nav>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router";
import styles from "../styles/NavBar.module.css";
import profileIcon from "../assets/profileIcon.png";

export default function NavBar() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  return (
    <div>
      <nav className={styles.container}>
        {/* Hamburger Menu Icon */}
        <div 
          className={styles.menuIcon} 
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          ☰
        </div>

        {/* Navigation List */}
        <ul className={`${styles.navList} ${isMenuActive ? styles.active : ''}`}>
          <li className={styles.navItem}>
            <Link to="/" onClick={closeMenu} className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/books" onClick={closeMenu} className={styles.navLink}>Books</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/jobs" onClick={closeMenu} className={styles.navLink}>Jobs</Link>
          </li>
          <li className={styles.navItem}>
            <a 
              href="https://dciindia.gov.in/CollegeSearch.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMenu}
              className={styles.navLink}
            >
              College
            </a>
          </li>
          <li className={styles.navItem}>
            <Link to="/products" onClick={closeMenu} className={styles.navLink}>Products</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" onClick={closeMenu} className={styles.navLink}>About</Link>
          </li>
          {sessionStorage.getItem("isLogin") && (
            <li className={styles.navItem}>
              <img 
                src={profileIcon} 
                alt="profile" 
                onClick={() => {
                  window.location.href = "/profile";
                  closeMenu();
                }} 
                className={styles.profileIcon}
              />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}