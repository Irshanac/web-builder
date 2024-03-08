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
  background:black; 
  color: #fff;
  padding: 20px 10px;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
  color: white;
`;

export default Header;
