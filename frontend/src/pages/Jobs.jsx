import React, { useEffect, useState } from "react";
import { api } from "../api";
import styles from "../styles/Jobs.module.css";
import Login from "../components/Login";
import styles1 from "../styles/Home.module.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  // const [appiled,setApplied] = useState([]);
  const [data,setData] = useState("");

  // Function to fetch jobs from a given URL (default is '/jobs')
  const fetchData = async (url = "api/jobs/") => {
    setLoading(true);
    try {
      const response = await api.get(url);
      // Expecting DRF paginated response with 'results' and 'next'
      const { results, next } = response.data;
      // Append new jobs to the existing list
      setJobs((prevJobs) => [...prevJobs, ...results]);
      // Store the next page URL
      setNextUrl(next);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const appiedCheck = () => {
    
  }

  // Initial fetch when the component mounts
  useEffect(() => {
    let isLogin = sessionStorage.getItem("isLogin");
    if(!isLogin){
      setShowLogin(true);
    }
    fetchData();
    appiedCheck();
    setData(JSON.parse(sessionStorage.getItem("data")));
  }, []);

  const handleApply = async (e) => {
    try {
        const response = await api.patch("api/jobs/", { email: data.email, id: e._id });

        if (response.status === 200) {
            alert("Application successfully submitted");
            window.location.reload();
        } else {
            alert("Failed to apply for the job");
        }
    } catch (error) {
        console.error("Error applying for job:", error);
        alert("An error occurred while applying for the job");
    }
};


  // Handler for "Load More" button
  const handleLoadMore = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBackClick = () => {
    setSelectedJob(null);
  };

  return (
    <div className={styles.container}>
      <div>Jobs</div>
      <div>
        {showLogin && (
          <div className={styles1.overlay}>
            <Login />
          </div>
        )}
      </div>
      {selectedJob ? (
        <div className={styles.jobDetails}>
          
          <h2>Job Name</h2>
          <p>{selectedJob.name}</p>
          <h2>Job Description</h2>
          <p>{selectedJob.description}</p>
          <h3>Role</h3>
          <p>{selectedJob.role}</p>
          <h3>company</h3>
          <p>{selectedJob.company}</p>
          <div>
          <button onClick={handleBackClick} className={styles.jobButton}>
            Back to Jobs
          </button>
          {
            
            // selectedJob.appied.includes(Email) ? <button className={styles.jobButton} disabled>Applied</button> : <button onClick={handleApply} className={styles.jobButton}>Apply</button>
            selectedJob.applied.length > 0 ? (selectedJob.applied.includes(data.email) ? <button className={styles.jobButton} disabled>Applied</button> : <button onClick={()=>handleApply(selectedJob)} className={styles.jobButton}>Apply</button>) : <button onClick={()=>handleApply(selectedJob)} className={styles.jobButton}>Apply</button>
          }
          </div>
          
        </div>
      ) : (
        <div className={styles.jobsContainer}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className={styles.jobOverview}
                onClick={() => handleJobClick(job)}
              >
                <h2>Job Name</h2>
                <p>{job.name}</p>
                {/* <h2>Job Description</h2> */}
                {/* <p>{job.description}</p> */}
                <h3>Role</h3>
                <p>{job.role}</p>
                <h3>company</h3>
                <p>{job.company}</p>
              </div>
            ))
          ) : (
            <div>No jobs found</div>
          )}
          
        </div>
      )}
      {(nextUrl && !selectedJob) && (
        <div className={styles.loadMoreContainer}>
            <button onClick={handleLoadMore} disabled={loading} className={styles.loadButton}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
          
        )}
    </div>
  );
}
