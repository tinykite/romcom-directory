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
  return data.map((user, i) => {
    const { name, phone, email, address } = user;
    const title = i < 5 ? "Magazine Editor" : "Architect";
    const department = i > 5 ? "Design" : "Art";
    return {
      name,
      phone,
      email,
      location: address.city,
      title,
      department,
    };
  });
};

const sortUserData = ({ data }) => {
  return data;
};

const DirectoryContainer = styled.div``;

const CardContainer = styled.article`
  background: #f8f8f8;
  padding: 0.5rem 2rem;
  width: 250px;
  border-radius: 15px;

  & + & {
    margin-top: 1rem;
  }
`;

const DirectorySortHeading = styled.h3`
  margin-top: 0.5rem;
`;

const DirectorySortList = styled.ul``;

const DirectorySortListItem = styled.li`
  cursor: pointer;
  padding: 0.25rem;
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

const getCategoryHeadings = (users) => {
  let allLocations = [];
  let allDepartments = [];
  let allTitles = [];

  // Create lists for every location, department, and title
  users.forEach((user) => {
    allLocations.push(user.location);
    allDepartments.push(user.department);
    allTitles.push(user.title);
  });

  // Remove duplicates using a set
  const uniqueLocations = new Set(allLocations);
  const uniqueDepartments = new Set(allDepartments);
  const uniqueTitles = new Set(allTitles);

  // Return each list as a regular old array
  return [
    {
      heading: "Department",
      data: [...uniqueDepartments],
    },
    {
      heading: "Title",
      data: [...uniqueTitles],
    },
    {
      heading: "Location",
      data: [...uniqueLocations],
    },
  ];
};

const CategoryList = ({ category }) => {
  const { heading, data } = category;
  return (
    <>
      <DirectorySortHeading>{heading}</DirectorySortHeading>
      <DirectorySortList>
        {data.map((item) => (
          <DirectorySortListItem>{item}</DirectorySortListItem>
        ))}
      </DirectorySortList>
    </>
  );
};

const UserDirectory = () => {
  const [userDirectory, setUserDirectory] = useState([]);
  const [sortPreference, setSortPreference] = useState(null);
  const sortedData = sortUserData(userDirectory, sortPreference);

  const categoryHeadings =
    userDirectory.length && getCategoryHeadings(userDirectory);

  useEffect(() => {
    sendUserRequest()
      .then((res) => formatUserData(res))
      .then((res) => setUserDirectory(res));
  }, []);

  return userDirectory.length ? (
    <>
      <header style={{ margin: "2rem auto", textAlign: "center" }}>
        <h1>User Directory</h1>
        <em>
          Just magazine editors and architects for now. Basically the cast of
          every romantic comedy ever.
        </em>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div>
          <h2>Sort By</h2>
          {categoryHeadings.map((category, i) => (
            <CategoryList category={category} />
          ))}
        </div>
        <DirectoryContainer>
          {userDirectory.map((user, i) => (
            <Card user={user} key={`user_${i}`} />
          ))}
        </DirectoryContainer>
      </main>
    </>
  ) : (
    "Loading"
  );
};

export default UserDirectory;
