import "./styles/App.css";
import React, { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import Notification from "./components/Notification";
import FilterTodos from "./components/FilterTodos";
import { Button } from "@mui/material";

function App() {
    const [showForm, setShowForm] = useState(false);
    const [editable, setEditable] = useState(false);
    const [todoData, setTodoData] = useState([]);
    const [clickedTodo, setClickedTodo] = useState(null);
    const [notification, setNotification] = useState(null);
    const [sortedTodos, setSortedTodos] = useState([]);
    const fetchData = () => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            value = JSON.parse(value);
            data.push(value);
        }
        setTodoData(data);
        setSortedTodos(data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleClick = () => {
        setShowForm((val) => !val);
    };
    const handleAddTodo = (todo) => {
        setTodoData((prevTodo) => [...prevTodo, todo]);
    };
    return (
        <div className="todo-list-app">
            <div className="header">
                <h1>Todo Application</h1>
            </div>
            {notification && <Notification notification={notification} />}
            <br />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                }}
            >
                <Button
                    onClick={handleClick}
                    variant="contained"
                    color="success"
                >
                    {editable ? "Update Todo" : "Add Todo"}
                </Button>
            </div>
            {showForm && (
                <AddTodoForm
                    setShowForm={setShowForm}
                    handleAddTodo={handleAddTodo}
                    editable={editable}
                    setEditable={setEditable}
                    fetchData={fetchData}
                    clickedTodo={clickedTodo}
                    setClickedTodo={setClickedTodo}
                    setNotification={setNotification}
                />
            )}
            <h2 style={{ background: "#A460ED", color: "black" }}>
                Your Todos
            </h2>
            <FilterTodos
                todoData={todoData}
                setSortedTodos={setSortedTodos}
                setClickedTodo={setClickedTodo}
            />
            <hr style={{ height: ".2rem", background: "black" }} />
            {localStorage.length === 0 ? (
                <p>
                    There are no Todos currently <br /> Add new Todos to view.
                </p>
            ) : (
                <TodoList
                    sortedTodos={sortedTodos}
                    fetchData={fetchData}
                    setEditable={setEditable}
                    setShowForm={setShowForm}
                    clickedTodo={clickedTodo}
                    setClickedTodo={setClickedTodo}
                    setNotification={setNotification}
                />
            )}
        </div>
    );
}

export default App;
