import styled, { keyframes } from 'styled-components';

const spin = keyframes`
0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  position: absolute;
  margin-top: 50vh;
  margin-left: 50vw;
  border: 0.1rem solid #f3f3f3;
  border-top: 0.5rem solid #3498db;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: ${spin} 0.5s linear infinite;
`;

export default Loader;
