import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Generator from "@/componets/Generator";
import Header from "@/componets/Header";
import Login from "./Login";
import History from "@/componets/History";
import { AppContext } from "@/context/AppContext";
import { extractCode, updatePreview } from "@/utils/helpers";
import Logout from "./Logout";

const Editor = () => {
  const [history, sethistory] = useState();
  const getDescription = (desp_history)=>{
    sethistory(desp_history)
    
 }
  return (
    <EditorContainer>
      <Header />
      <Generator />
      
      <Container>
        <ColumnContainer>
          <Heading >HTML</Heading>
          <EditorField
            name="html"    
            placeholder="HTML code"
            value={history}
          />
        </ColumnContainer>
        <ColumnContainer>
          <Heading >CSS</Heading>
          <EditorField
            name="css"
           
            placeholder="CSS code"
          />
        </ColumnContainer>
        <ColumnContainer>
          <Heading >JS</Heading>
          <EditorField
            name="js"
            
            placeholder="JS code"
          />
        </ColumnContainer>
      </Container>
     
    </EditorContainer>
    
  );
};

const EditorContainer = styled.div`
  grid-column: span 4;
  
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px;
  background-color: #f2f1f0;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled.h2`
  font-size: 18px;
  color: #fff;
  background-color: #000;
  padding: 6px;
  margin: 0;
  cursor: pointer;
`;

const EditorField = styled.textarea`
  height: 380px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  font-size: 16px;
  font-family: "Arial", sans-serif;
  background: azure;
  /* Styling the scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #888;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
export default Editor;
