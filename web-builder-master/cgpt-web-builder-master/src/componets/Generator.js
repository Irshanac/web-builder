import styles from "./error.module.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import History from "./History";

const Generator = () => {
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState({ query: "" });
  const [history, setHistory] = useState([]);
  const [movedHistory, setMovedHistory] = useState("");
  const [load, setLoad] = useState("");

  useEffect(() => {
    const collectHistory = localStorage.getItem("storeHistory");
    setHistory(collectHistory ? JSON.parse(collectHistory) : []);
  }, []);

  const handleFocus = () => {
    // Clear the error message
    setErrors({});
  };

  const store = (e) => {
    const { name, value } = e.target;
    setDescription({ ...description, [name]: value });
  };

  const handleMovedHistory = (movedHistoryValue) => {
    setMovedHistory(movedHistoryValue);
    setDescription({ query: movedHistoryValue });
  };

  const printDescription = () => {
    const newErrors = {};
    if (!description.query) {
      newErrors.query = "Description is required";
    } else if (description.query.length < 15) {
      newErrors.query = "Description must be at least 15 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      setHistory([...history, description]);
      localStorage.setItem("storeHistory", JSON.stringify([...history, description]));
      setLoad(description);
      setDescription({ query: "" });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container>
      <Textarea
        placeholder="Write what you want to build"
        onChange={store}
        name="query"
        id="query"
        value={description.query}
        onFocus={handleFocus}
      ></Textarea><br></br>
      {errors.query && <span className={styles.error}>{errors.query}</span>}
      <ButtonGroup>
        <button onClick={printDescription}>Generate</button>
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
  font-family: "Arial", sans-serif;
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
    font-family: "Arial", sans-serif;
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
