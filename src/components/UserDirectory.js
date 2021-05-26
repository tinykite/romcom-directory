import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const sendUserRequest = async () => {
  try {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    return resp;
  } catch (err) {
    console.error(err);
  }
};

const formatUserData = ({ data }) => {
  return data.map((user) => {
    const { name, phone, email, address } = user;
    return {
      name,
      phone,
      email,
      location: address.city,
      title: "Assistant",
      department: "Creative",
    };
  });
};

const DirectoryContainer = styled.div`
  margin: 0 auto;
`;

const CardContainer = styled.article`
  background: #f8f8f8;
  padding: 0.5rem 2rem;
  width: 250px;
  border-radius: 15px;

  & + & {
    margin-top: 1rem;
  }
`;

const Card = ({ user }) => {
  const { name, department, title, location, phone, email } = user;
  return (
    <CardContainer>
      <h2>{name}</h2>
      <h3>{department}</h3>
      <em>{title}</em>
      <p>{location}</p>
      <p>{phone}</p>
      <p>{email}</p>
    </CardContainer>
  );
};

const UserDirectory = () => {
  const [userDirectory, setUserDirectory] = useState([]);

  useEffect(() => {
    sendUserRequest()
      .then((res) => formatUserData(res))
      .then((res) => setUserDirectory(res));
  }, []);

  return userDirectory.length ? (
    <DirectoryContainer>
      {userDirectory.map((user, i) => (
        <Card user={user} key={`user_${i}`} />
      ))}
    </DirectoryContainer>
  ) : (
    "Loading"
  );
};

export default UserDirectory;
