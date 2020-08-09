import styled from "styled-components/macro";
export const Button = styled.input`
  display: block;
  width: 50%;
  align-items: center;
  height: 50px;
  border-radius: 25px;
  margin: 35px auto;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background-image: linear-gradient(
    to right,
    blueviolet,
    blueviolet,
    blueviolet
  );
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  background-size: 100%;
  cursor: pointer;
  transition: 0.5s;
  color: #fff;

  :hover {
    background-position: center;
  }
`;
