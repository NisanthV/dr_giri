import React, { useState, useEffect } from "react";
import styles from "../styles/Jobs.module.css";
import { api } from "../api";

export default function JobManage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [applied,setApplied] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState(JSON.parse(sessionStorage.getItem("data")));
  const [addJob, setAddJob] = useState(false);
  const [obj, setObj] = useState({
    name: "",
    description: "",
    role: "",
    company: "",
    email: data.email,
  });

  const HandleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };
  const fetchData = async (url = `api/jobs/${data.email}`) => {
    setLoading(true);
    try {
      const response = await api.get(url);
      const { results, next } = response.data;
      setJobs((prevJobs) => [...prevJobs, ...results]);
      setNextUrl(next);
      console.log(data.email);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postJob = async () => {
    
    const response = await api.post("api/jobs/", obj);
    if (response.status === 201) {
      alert("Job Posted");
      window.location.reload();
    } else {
      alert("Failed to Post Job");
    }
  };

  const handleLoadMore = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    console.log(job);
  };

  const handleBackClick = () => {
    setSelectedJob(null);
  };
  return (
    <div>
      {!selectedJob &&<div className={styles.jobButtonContainer}>
      <button onClick={() => setAddJob(!addJob)} className={styles.loadButton}>{addJob ?<span>cancle</span>:<span>Post Job</span>}</button>
{addJob &&      <button className={styles.loadButton} onClick={postJob}>Post Job</button>
}      </div>}
      {addJob && (
        <div>
          <div className={styles.formGroup}>
            Job Name:{" "}
            <input
              type="text"
              placeholder="Job Name"
              name="name"
              onChange={(e) => {
                HandleChange(e);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            Job Description:{" "}
            <input
              type="text"
              name="description"
              placeholder="Job Description"
              onChange={(e) => {
                HandleChange(e);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            Role:{" "}
            <input
              type="text"
              name="role"
              placeholder="Role"
              onChange={(e) => {
                HandleChange(e);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            Company:{" "}
            <input
              type="text"
              name="company"
              placeholder="Company"
              onChange={(e) => {
                HandleChange(e);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            Email:{" "}
            <input type="text" name="email" value={data.email} disabled />
          </div>
        </div>
      )}
      {selectedJob ? (
        selectedJob.applied.map((job, index) => (
          <div className={styles.jobDetails}>
            <div key={index} >
              {job}
            </div>
            <button onClick={handleBackClick} className={styles.jobButton}>
              Back to Jobs
            </button>
          </div>
        ))
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
      {nextUrl && !selectedJob && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className={styles.loadButton}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
