import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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

const DirectorySortListItem = styled.li`
  cursor: pointer;
  padding: 0.25rem;
  background: ${(props) => props.selected && "black"};
  color: ${(props) => (props.selected ? "#FFF" : "#000")};
  border-radius: ${(props) => props.selected && "5px"};
  transition: all 0.2s linear;
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
      heading: "department",
      data: [...uniqueDepartments],
    },
    {
      heading: "title",
      data: [...uniqueTitles],
    },
    {
      heading: "location",
      data: [...uniqueLocations],
    },
  ];
};

const CategoryList = ({ category, filterPreference, setFilterPreference }) => {
  const { heading, data } = category;
  const [expanded, setExpanded] = useState(false);

  const updatePreferences = (preference) => {
    if (filterPreference[heading] === preference) {
      setFilterPreference({ ...filterPreference, [heading]: null });
    } else setFilterPreference({ ...filterPreference, [heading]: preference });
  };

  return (
    <>
      <section style={{ width: "150px" }}>
        <header
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "black",
            padding: "0.25rem",
            margin: 0,
            color: "white",
            marginTop: "1rem",
          }}
        >
          <DirectorySortHeading>{heading}</DirectorySortHeading>
          {expanded ? "-" : "+"}
        </header>
        <AnimatePresence>
          {expanded && (
            <motion.main
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul>
                {data.map((item, i) => (
                  <DirectorySortListItem
                    selected={filterPreference[heading] === item}
                    key={`sortItem_${i}`}
                    onClick={() => updatePreferences(item)}
                  >
                    {item}
                  </DirectorySortListItem>
                ))}
              </ul>
            </motion.main>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

const UserDirectory = () => {
  const [userDirectory, setUserDirectory] = useState([]);
  const [filterPreference, setFilterPreference] = useState({
    department: null,
    title: null,
    location: null,
  });

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

  const filteredData = filterByCategory(userDirectory, filterPreference);

  const categoryHeadings =
    userDirectory.length && getCategoryHeadings(userDirectory);

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
        <div>
          <h2>Filter By</h2>
          {categoryHeadings.map((category, i) => (
            <CategoryList
              category={category}
              key={category}
              filterPreference={filterPreference}
              setFilterPreference={setFilterPreference}
            />
          ))}
        </div>
        <DirectoryContainer>
          {filteredData.map((user, i) => (
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
