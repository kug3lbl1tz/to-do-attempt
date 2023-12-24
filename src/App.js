import './App.css';
import styled from 'styled-components';
import React, { useState } from "react";

const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  background-color: none;
  width: 1200px;
  height: 550px;
  border: solid;
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 2px;
  background-color: teal;
  width: 500px;
  height: 500px;
  border: solid;
  margin: 20px;
`;

const Button = styled.button`
  display: inline-block;
  flex: 1;
  border: none;
  background-color: lime;
  color: teal;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;

const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
`;

const TaskCount = styled.span`
  margin: 10px;
`;

const Tasks = styled.div`
`;

const Items = styled.li`
  list-style:"none";
  text-decoration:"line-through";
`

function App() {
  const [input, setInput] = useState("");
  const [todoList, setPendingList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const handleClear = () => {
    setPendingList([]);
    setCompletedTaskCount(0);
  }

  const handleClick = () => {
    const id = todoList.length + 1;
    if(input != "")
      {
      setPendingList((prev) => [
        ...prev,
        {
          id: id,
          task: input,
          complete: false,
        },
      ]);
      setInput("");
      }
  }
  
  const handleRemove = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id == id) {
        if(!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1);
        }
        else {
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = {...task, complete: !task.complete};
      } else item = {...task};
      return item;
    })
    setPendingList(list);
  }

  return (
    <MasterContainer>
      <Container>
        <div>
            <h2 align='center'>Planned</h2>
            <Text value={input} onInput={(e) => setInput(e.target.value)}/>
            <Button onClick={() => handleClick()}>Add</Button>
          <Tasks>
            <TaskCount>
              <b>Total</b> {todoList.length - completedTaskCount}
            </TaskCount>
          </Tasks>
          <div>
            <ul>
            { todoList.map((todo) => {
              return (
                <Items
                complete={todo.complete}
                id={todo.id}
                onClick={() => handleRemove(todo.id)}
                style={{
                  listStyle: "none",
                  //textDecoration: todo.complete && "line-through",
                }}>
                  {todo.task}
                </Items>
              )
            })}
            </ul>
          </div>
          <Button onClick={() => handleClear()}>Clear</Button>
        </div>
      </Container>
      <Container>
        <div>
            <h2 align='center'>In-Progress</h2>
            <Text value={input} onInput={(e) => setInput(e.target.value)} />
            <Button onClick={() => handleClick()}>Add</Button>
          <Tasks>
            <TaskCount>
              <b>Total:</b> {todoList.length - completedTaskCount}
            </TaskCount>
          </Tasks>
          <div>
            <ul>
            { todoList.map((todo) => {
              return (
                <items
                complete={todo.complete}
                id={todo.id}
                onClick={() => handleRemove(todo.id)}
                style={{
                  listStyle: "none",
                  textDecoration: todo.complete && "line-through",
                }}>
                  {todo.task}
                </items>
              )
            })}
            </ul>
          </div>
          <Button onClick={() => handleClear()}>Clear</Button>
        </div>
      </Container>
      <Container>
        <div>
            <h2 align='center'>Completed</h2>
            <Text value={input} onInput={(e) => setInput(e.target.value)} />
            <Button onClick={() => handleClick()}>Add</Button>
          <Tasks>
          <TaskCount>
            <b>Total: </b>{completedTaskCount}
          </TaskCount>
          </Tasks>
          <div>
            <ul>
            { todoList.map((todo) => {
              return (
                <items
                complete={todo.complete}
                id={todo.id}
                onClick={() => handleRemove(todo.id)}
                style={{
                  listStyle: "none",
                  textDecoration: todo.complete && "line-through",
                }}>
                  {todo.task}
                </items>
              )
            })}
            </ul>
          </div>
          <Button onClick={() => handleClear()}>Clear</Button>
        </div>
      </Container>
    </MasterContainer>  
  );
}

export default App;
