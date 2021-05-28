import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Accordion from "./Accordion";

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
  // A set is case-sensitive, so this will not remove duplicates that differ in capitalization
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

const filterByCategory = (userDirectory, filterPreference) => {
  let filteredData = [...userDirectory];
  if (filterPreference.location !== null) {
    filteredData = userDirectory.filter(
      (user) => user.location === filterPreference.location
    );
  }
  if (filterPreference.department !== null) {
    filteredData = userDirectory.filter(
      (user) => user.department === filterPreference.department
    );
  }
  if (filterPreference.title !== null) {
    filteredData = userDirectory.filter(
      (user) => user.title === filterPreference.title
    );
  }
  return filteredData;
};

const UserDirectory = () => {
  const [userDirectory, setUserDirectory] = useState([]);
  const [filterPreference, setFilterPreference] = useState({
    department: null,
    title: null,
    location: null,
  });

  const filteredData = filterByCategory(userDirectory, filterPreference);
  const categoryTitles =
    userDirectory.length && getCategoryTitles(userDirectory);

  useEffect(() => {
    sendUserRequest()
      .then((res) => formatUserData(res))
      .then((res) => setUserDirectory(res));
  }, []);

  return filteredData.length ? (
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
          {filteredData.map((user, i) => (
            <Card user={user} key={`user_${i}`} />
          ))}
        </div>
      </main>
    </>
  ) : (
    "Loading"
  );
};

export default UserDirectory;
