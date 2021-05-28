import React from "react";
import styled from "styled-components";

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

export default Card;
