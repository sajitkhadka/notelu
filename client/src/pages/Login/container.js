import styled from 'styled-components/macro';

export const Pagecontainer = styled.div`
  width: 70%;
  height: 80vh;
  display: flex;
  margin: 2rem auto;
  justify-content: space-between;
  @media screen and (max-width: 1023px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  text-align: center;
  margin-left: 5rem;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
  @media screen and (max-width: 1023px) {
    margin-left: 0;
  }
`;

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
  font-family: 'Poppins', sans-serif;
  background-size: 100%;
  cursor: pointer;
  transition: 0.5s;
  color: #fff;

  :hover {
    background-position: center;
  }
`;

export const ButtonLogin = styled.input`
  display: block;
  width: 50%;
  align-items: center;
  height: 50px;
  border-radius: 25px;
  margin: 25px auto;
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
  font-family: 'Poppins', sans-serif;
  background-size: 100%;
  cursor: pointer;
  transition: 0.5s;
  color: #fff;

  :hover {
    background-position: center;
  }
`;

export const Form = styled.form`
  h1 {
    font-size: 25px;
    text-transform: uppercase;
    margin-bottom: 100px;
    padding: 10px;
    color: blueviolet;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;

export const A = styled.a`
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 1rem;
  transition: 0.3s;

  :hover {
    color: blueviolet;
  }
`;

export const P = styled.p`
  margin-bottom: 20px;

`;

export const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
`;

export const InputDiv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
  font-family: 'Poppins', sans-serif;

  > div {
    position: relative;
    height: 20px;
  }
`;

