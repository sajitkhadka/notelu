import styled from "styled-components/macro";
export const Pagecontainer = styled.div`
  width: 70%;
  height: 80vh;
  margin: 2rem auto;
  justify-content: space-between;
  @media screen and (max-width: 1023px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;
