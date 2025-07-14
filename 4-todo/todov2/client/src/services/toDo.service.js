// client/src/servies/task.services.js
import FetchService from "./fetch.service.js";

async function getUserToDos() {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/todo/getAll`;
  const taskFetchConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const taskRequest = await FetchService.doRequest(host, taskFetchConfig);

  return taskRequest;
}

async function createToDo(toDo) {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/todo/create`;
  const taskCreateConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDo),
  };
  const taskRequest = await FetchService.doRequest(host, taskCreateConfig);

  return taskRequest;
}

async function deleteToDo(toDoId) {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/todo/delete/${toDoId}`;
  const taskDeleteConfig = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const taskRequest = await FetchService.doRequest(host, taskDeleteConfig);

  return taskRequest;
}

async function updateToDo(toDoId, newToDo) {
  const host = `${import.meta.env.VITE_BACKEND_URL}/api/todo/update/${toDoId}`;
  const toDoUpdateConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToDo),
  };
  const taskRequest = await FetchService.doRequest(host, toDoUpdateConfig);

  return taskRequest;
}

const toDosService = {
  getUserToDos,
  createToDo,
  deleteToDo,
  updateToDo,
};

export default toDosService;
