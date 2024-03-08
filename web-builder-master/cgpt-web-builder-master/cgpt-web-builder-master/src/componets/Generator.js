
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from "react";
import History from './History';

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const Generator = (props) => {
  const [description,setdescription] = useState({})
  const [history,setHistory] = useState([])
  const [movedHistory, setMovedHistory] = useState('');
  const [load, setLoad] = useState('');
  useEffect(() => {
    const collectHistory = localStorage.getItem("storeHistory");
    setHistory(collectHistory ? JSON.parse(collectHistory) : []);
  }, []);
 

  //store descrpion
  const store = (e) => {
      const {name,value} = e.target
      setdescription({[name]:value})
  }
console.log('qqq',description);
//
const handleMovedHistory = (movedHistoryValue) => {
  setMovedHistory(movedHistoryValue);
    const names='query'
    const values={'query':movedHistoryValue}
    console.log('hhhhhhhhh',movedHistory);
    setdescription(values)
};
// const newDescription= (e)=>
//   {
//     const newdesp=e.target.value
//     setdescription(newdesp)
//   }
  //description store history
  const printDescription = () => {
    if (description && description.query) {
      setHistory([...history, description]);
      console.log(description);
      localStorage.setItem(
        "storeHistory",
        JSON.stringify([...history, description])
      );
      setLoad(description);
     setdescription('');
     //setHistory([]); // Uncomment if you want to clear the entire history
    }
    // Optionally, you can add an else block for handling the case when description is falsy
  }
  


  //Get history
 /* const [passHistory,setpassHistory] = useState(props.passDescription)*/

  return (
    <Container>
     <Textarea
        placeholder="Write what you want to build"
        onChange={(e) => store(e)} // Pass the event to store
        name="query"
        id="desp"
        value={description.query}
      ></Textarea>
      <ButtonGroup>
       
          <button onClick={printDescription} >Generate</button>
       
      </ButtonGroup>
      <History setHistory={setHistory} onMoveHistory={handleMovedHistory} reload={load} />


      
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  width: 100%;
  background-color: #f2f1f0;
`;

const Textarea = styled.textarea`
  height: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  width: -webkit-fill-available;

  &:focus {
    outline: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  button {
    background-color: #313030;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    color: #ffff;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    margin: 0px 5px;
    padding: 10px 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #555;
      color: #fff;
    }
  }
`;

export default Generator;
