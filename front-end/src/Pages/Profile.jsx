import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfileData(response.data.user);
      console.log(response.data.user);
    }
    fetchData();
  }, []);
  
  if (!profileData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Name : {profileData.name}</h1>
      <p>Email : {profileData.email}</p>
    </div>
  );
}
