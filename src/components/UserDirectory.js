import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "./Card";
import Accordion from "./Accordion";

const DirectoryHeader = styled.header`
  margin: 2rem auto;
`;

const DirectoryMain = styled.main`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const sendUserRequest = async () => {
  try {
    // This will return a 10-person sample user directory
    const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    return resp;
  } catch (err) {
    console.error(err);
  }
};

const formatUserData = ({ data }) => {
  return data.map((user, i) => {
    const { name, phone, email, address } = user;
    // Everyone in a romantic comedy works in either publishing or architecture
    // So for fun, everyone in our 10-person sample directory will too
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

const getCategoryTitles = (users) => {
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
  // Note: A set is case-sensitive, so this alone will not remove
  // any duplicates that differ in capitalization
  const uniqueLocations = new Set(allLocations);
  const uniqueDepartments = new Set(allDepartments);
  const uniqueTitles = new Set(allTitles);

  // Return each list as a regular old array
  return [
    {
      title: "department",
      data: [...uniqueDepartments],
    },
    {
      title: "title",
      data: [...uniqueTitles],
    },
    {
      title: "location",
      data: [...uniqueLocations],
    },
  ];
};

const getFilteredUsers = (userDirectory, filterPreference) => {
  let filteredData;

  // Get list of all user metadata categories
  const filterCategories = Object.keys(filterPreference);

  filterCategories.forEach((category) => {
    // If data hasn't been filtered yet, use existing userDirectory data
    if (!filteredData && filterPreference[category] !== null) {
      filteredData = userDirectory.filter(
        (metadata) => metadata[category] === filterPreference[category]
      );
    }
    // Otherwise use previously filtered data
    else if (filteredData && filterPreference[category] !== null) {
      const prevFilteredData = [...filteredData];
      filteredData = prevFilteredData.filter(
        (metadata) => metadata[category] === filterPreference[category]
      );
    }
  });

  return filteredData;
};

const UserDirectory = () => {
  const [userDirectory, setUserDirectory] = useState([]);
  const [filterPreference, setFilterPreference] = useState({
    department: null,
    title: null,
    location: null,
  });

  const userDefinedPreferences = Object.values(filterPreference).some(
    (value) => value !== null
  );

  const filteredUserDirectory = getFilteredUsers(
    userDirectory,
    filterPreference
  );
  const visibleData = userDefinedPreferences
    ? filteredUserDirectory
    : userDirectory;

  const categoryTitles =
    userDirectory.length && getCategoryTitles(userDirectory);

  useEffect(() => {
    sendUserRequest()
      .then((res) => formatUserData(res))
      .then((res) => setUserDirectory(res));
  }, []);

  return userDirectory.length ? (
    <>
      <DirectoryHeader>
        <h1>User Directory</h1>
        <em>
          Just magazine editors and architects for now. Basically the cast of
          every romantic comedy ever.
        </em>
      </DirectoryHeader>
      <DirectoryMain>
        <aside>
          <h2>Filter By</h2>
          {categoryTitles.map((category, i) => (
            <Accordion
              category={category}
              key={category}
              filterPreference={filterPreference}
              setFilterPreference={setFilterPreference}
            />
          ))}
        </aside>
        <div>
          {visibleData.length
            ? visibleData.map((user, i) => (
                <Card user={user} key={`user_${i}`} />
              ))
            : "No users match this criteria"}
        </div>
      </DirectoryMain>
    </>
  ) : (
    "Loading"
  );
};

export default UserDirectory;
