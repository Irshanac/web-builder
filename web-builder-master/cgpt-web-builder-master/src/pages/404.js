import styled from 'styled-components';
export default function Custom404() {
    return(
        <Background>
        <Heading>Page not found</Heading>
      </Background>
    );   }

const Background = styled.div`
width:100%;
background:linear-gradient(to left, #ffffff 3%, #669999 97%); 
`;

const Heading=styled.div`
color:blue;
text-align:center;
font-size:40px;
margin-top:23%;
`;