import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { AiOutlineDelete, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";

localStorage.removeItem("todolist"); // Peut être supprimé en production

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEditedItem, setCurrentEditedItem] = useState({});
  const [currentEdit, setCurrentEdit] = useState(null);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleUpdateTodo = () => {
    let updatedTodos = [...todos];
    updatedTodos[currentEdit] = currentEditedItem;
    setTodos(updatedTodos);
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setCurrentEdit(null);
    setCurrentEditedItem({});
  };

  const handleAddTodo = () => {
    if (!newTitle.trim()) return;
    const newTodoItem = {
      title: newTitle.trim(),
      description: newDescription.trim(),
    };
    const updatedTodoArr = [...todos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (i) => {
    let reducedTodoList = [...todos];
    reducedTodoList.splice(i, 1);
    setTodos(reducedTodoList);
    localStorage.setItem("todoList", JSON.stringify(reducedTodoList));
  };

  const handleDeleteCompletedTodo = (i) => {
    let reducedCompletedTodoList = [...completedTodos];
    reducedCompletedTodoList.splice(i, 1);
    setCompletedTodos(reducedCompletedTodoList);
    localStorage.setItem(
      "completedTodoList",
      JSON.stringify(reducedCompletedTodoList)
    );
  };

  const handleComplete = (i) => {
    const now = new Date();
    const weekDay = now.toLocaleDateString("fr-FR", { weekday: "long" });
    const date = now.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const completedOn = `Terminée: ${weekDay}, ${date}`;
    const filteredItem = {
      ...todos[i],
      completedOn,
    };
    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem(
      "completedTodoList",
      JSON.stringify(updatedCompletedArr)
    );
    handleDeleteTodo(i);
  };

  useEffect(() => {
    try {
      const savedTodo = localStorage.getItem("todoList");
      const completedTodo = localStorage.getItem("completedTodoList");
      if (savedTodo) {
        const parsed = JSON.parse(savedTodo);
        if (Array.isArray(parsed)) setTodos(parsed);
      }
      if (completedTodo) {
        const parsed = JSON.parse(completedTodo);
        if (Array.isArray(parsed)) setCompletedTodos(parsed);
      }
    } catch (err) {
      console.error("Erreur lors du chargement du localStorage", err);
    }
  }, []);

  return (
    <div className="app-container">
      <h1>My todo list</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title ?"
            />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>

          <button type="button" className="primaryBtn" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen ? "active" : ""}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen ? "active" : ""}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen
            ? completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>{item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              ))
            : todos.map((item, index) => {
                if (currentEdit === index) {
                  return (
                    <div className="edit_wrapper" key={index}>
                      <input
                        placeholder="update title"
                        value={currentEditedItem.title}
                        type="text"
                        onChange={(e) => handleUpdateTitle(e.target.value)}
                      />
                      <textarea
                        placeholder="update description"
                        value={currentEditedItem.description}
                        rows={4}
                        onChange={(e) =>
                          handleUpdateDescription(e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="primaryBtn"
                        onClick={handleUpdateTodo}
                      >
                        Update
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteTodo(index)}
                          title="Delete"
                        />
                        <AiOutlineCheck
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                          title="Check"
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => handleEdit(index, item)}
                          title="Edit"
                        />
                      </div>
                    </div>
                  );
                }
              })}
        </div>
      </div>
    </div>
  );
}

export default App;
