import axios from "axios";

const response = await axios.get("https://dciindia.gov.in/CollegeSearch.aspx?ColName=&CourseId=1&SplId=0&StateId=&Hospital=&Type=0&Status=--Select--");
console.log(response.data);