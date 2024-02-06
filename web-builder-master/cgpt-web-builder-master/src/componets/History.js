
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import Generator from './Generator';
const History = (props) => {
  const [newhistory,setnewHistory] = useState([])

  //history passing to description
  const [moveHistory, setmoveHistory] = useState('');
  


  //clear  first  history 
  const clearHistory = ()=>{
    //get all history in local storege
    const removeHistory=localStorage.getItem("storeHistory")
     // Step 2: Convert the retrieved string to an array
     let arrayHistory = JSON.parse(removeHistory);
    //first value remove in history
      arrayHistory.splice(0,1)
    //remaing elements stored in local storge
    localStorage.setItem("storeHistory", JSON.stringify(arrayHistory));
    setnewHistory(arrayHistory);
    arrayHistory=JSON.parse(localStorage.getItem("storeHistory"))
    props.setHistory(arrayHistory);
  }
  
  // clear all element 
  const clearAll=()=>{
    localStorage.removeItem("storeHistory")
    //remove usestate of history
    setnewHistory([]);
    //clear history in generator
    props.setHistory([]);
  }


  // Function to cancel a specific history entry
  const cancelHistory = (index) => {
    ///get all history in local storege
    const updatedHistory=localStorage.getItem("storeHistory")
     // Step 2: Convert the retrieved string to an array
     let newarrayHistory = JSON.parse(updatedHistory);
    // Remove the entry at the specified index
    newarrayHistory.splice(index, 1);
    // Update the state with the modified history
    //remaing elements stored in local storge
    localStorage.setItem("storeHistory", JSON.stringify(newarrayHistory));
    setnewHistory(newarrayHistory);
    newarrayHistory=JSON.parse(localStorage.getItem("storeHistory"))
    props.setHistory(newarrayHistory);;
  };


  //passing history to description
  const historyPass = (e) => {  
    setmoveHistory(e.target.value)
    //props.movedHistory(moveHistory)
    props.onMoveHistory(moveHistory);
  }
  

  /*const getHistory=localStorage.getItem("storeHistory")*/
  useEffect(() => {
    const getHistory = localStorage.getItem("storeHistory");
    setnewHistory(getHistory ? JSON.parse(getHistory) : []);
  }, [props.reload]);
  return (
    
    <div >
      {!newhistory[0] ? (
        <div>
          {/* Content for when historyValue is falsy */}
        </div>
      ) : (
        <div>
            <ColumnContainer>
          <Heading >History</Heading>   
          {newhistory.map((value, key) => (
            <div key={key}>
              <EditorField value={value.query} onClick={historyPass} />
              <CancelButton onClick={() => cancelHistory(key)}>X</CancelButton>
            </div>
          ))}
          <ButtonGroup>
              <button onClick={clearAll}>Clear all</button>
          </ButtonGroup>
        </ColumnContainer>
       
        </div>
      )}
     
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled.h4`
  font-size: 1.5rem;
  margin: 1rem 0;
  padding: 0 0 0 1rem;
  list-style: decimal;
`;

const CancelButton = styled.button`
  /* Add your styles for the cancel button */
  background-color:#555;
  border:none;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #ffff;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  transition: all 0.2s ease-in-out;
  &:hover {
      background-color: red;
      color: #fff;
    }
    cursor: pointer;
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

const List = styled.ol`
  font-size: 1.2rem;
  margin: 1rem 10px;
  padding: 0 0 0 2rem;
  list-style: decimal;
`;

const Item = styled.li`
  margin-bottom: 0.7rem;
  cursor: pointer;
  color: ${(props) => props.color || '#343e69'};

  &:hover {
    text-decoration: underline;
  }
`;

const EditorContainer = styled.div`
  grid-column: span 4;
  
`;

const EditorField = styled.textarea`

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

export default History;
