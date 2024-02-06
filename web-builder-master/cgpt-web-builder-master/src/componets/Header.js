import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Heading>Web Builder</Heading>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background:linear-gradient(to left, #ffffff 3%, #669999 97%); 
  color: #fff;
  padding: 20px 10px;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  color: black;
`;

export default Header;
