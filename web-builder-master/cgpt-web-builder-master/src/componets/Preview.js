import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import Login from "./Login";

const Preview = () => {
  return (
    
    <Container>
      <Logout/>
      <iframe id="preview"></iframe>
    </Container>
   
  );
};

const Container = styled.div`
  grid-column: span 8;
`;

export default Preview;
