import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Modal, Tag, Tooltip } from "antd";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import styles from "./ToDo.module.css";
import "../../index.css";

import toDoLogo from "../../assets/toDoLogo.png";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
import toDoService from "../../services/toDo.service.js";

const { Title } = Typography;

function ToDoList() {
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userToDos, setUserTodos] = useState([]);
  const [currentToDo, setCurrentToDo] = useState(null);

  function getFormatedDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("fr-FR", options);
  }

  const fetchUserToDos = async () => {
    try {
      const { tasks } = await toDoService.getUserToDos();
      setUserTodos(tasks);
    } catch (err) {
      console.error("Erreur lors du chargement des toDos", err);
    }
  };

  useEffect(() => {
    fetchUserToDos();
  }, []);

  const handleEdit = async () => {
    if (!currentToDo) return;
    try {
      setLoading(true);
      const data = { title, description };
      const { message } = await toDoService.updateToDo(currentToDo._id, data);
      setLoading(false);
      await fetchUserToDos();
      setMessageType("success");
      setMessageContent(message || "ToDo modifié avec succès");
      setMessageVisible(true);
      setTitle("");
      setDescription("");
      setCurrentToDo(null);
      setIsEditing(false);
    } catch (err) {
      setLoading(false);
      setMessageType("error");
      setMessageContent(err.message || "Erreur inconnue");
      setMessageVisible(true);
    }
  };

  const handleDelete = async (toDo) => {
    try {
      const { message } = await toDoService.deleteToDo(toDo._id);
      await fetchUserToDos();
      setMessageType("success");
      setMessageContent(message || "ToDo supprimé avec succès");
      setMessageVisible(true);
    } catch (err) {
      setMessageType("error");
      setMessageContent(err.message || "Erreur inconnue");
      setMessageVisible(true);
    }
  };

  const handleComplete = async (toDo) => {
    try {
      const updatedToDo = {
        title: toDo.title,
        description: toDo.description,
        isCompleted: !toDo.isCompleted,
      };
      await toDoService.updateToDo(toDo._id, updatedToDo);
      await fetchUserToDos();
      setMessageType("success");
      setMessageContent("ToDo mis à jour");
      setMessageVisible(true);
    } catch (err) {
      setMessageType("error");
      setMessageContent(err.message || "Erreur inconnue");
      setMessageVisible(true);
    }
  };

  const handleSubmitToDo = async () => {
    try {
      setLoading(true);
      const data = { title, description };
      await toDoService.createToDo(data);
      setLoading(false);
      await fetchUserToDos();
      setMessageType("success");
      setMessageContent("ToDo ajouté avec succès");
      setMessageVisible(true);
      setTitle("");
      setDescription("");
      setIsAdding(false);
    } catch (err) {
      setLoading(false);
      setMessageType("error");
      setMessageContent(err.message || "Erreur inconnue");
      setMessageVisible(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.toDo_wrapper}>
        <div className={styles.toDo_header}>
          <div className={styles.logo_section}>
            <img src={toDoLogo} alt="toDo" className={styles.image} />
          </div>
          <div className={styles.title_section}>
            <Title level={2}>ToDo</Title>
          </div>
          <div className={styles.input_wrapper}>
            <Input
              placeholder="Cherche ton toDo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "25%" }}
            />
            <Button
              type="primary"
              size="large"
              onClick={() => setIsAdding(true)}
            >
              Ajouter toDo
            </Button>
          </div>
        </div>

        <div>
          {Array.isArray(userToDos) &&
            userToDos.map((toDo) => (
              <div key={toDo._id} className={styles.toDo_card}>
                <div className={styles.toDo_cardHeader}>
                  <div className={styles.toDo_cardTitleRow}>
                    <Title level={2} className={styles.toDo_cardTitle}>
                      {toDo?.title}
                    </Title>
                    <div className={styles.toDo_cardCompletion}>
                      {toDo?.isCompleted ? (
                        <Tag color="#b7eb8f">Completed</Tag>
                      ) : (
                        <Tag color="#ff4d4f">Incompleted</Tag>
                      )}
                    </div>
                  </div>
                  <div className={styles.toDo_cardDescription}>
                    <Title level={4} style={{ color: "#8c8c8c" }}>
                      {toDo?.description}
                    </Title>
                  </div>
                </div>

                <div className={styles.toDo_cardFooter}>
                  <Tag>{getFormatedDate(toDo?.createdAt)}</Tag>
                  <div className={styles.toDo_cardActions}>
                    <Tooltip title="Editer le ToDo">
                      <EditOutlined
                        onClick={() => {
                          setCurrentToDo(toDo);
                          setTitle(toDo.title);
                          setDescription(toDo.description);
                          setIsEditing(true);
                        }}
                        className={styles.toDo_cardAction}
                      />
                    </Tooltip>
                    <Tooltip title="Supprimer le ToDo">
                      <DeleteOutlined
                        onClick={() => handleDelete(toDo)}
                        className={styles.toDo_cardAction}
                      />
                    </Tooltip>
                    <Tooltip title="Marquer comme complété">
                      <CheckCircleFilled
                        onClick={() => handleComplete(toDo)}
                        className={styles.toDo_cardAction}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Modal Add */}
        <Modal
          open={isAdding}
          title="Ajouter un ToDo"
          onCancel={() => setIsAdding(false)}
          onOk={handleSubmitToDo}
          confirmLoading={loading}
        >
          <div className={styles.input_wrapper}>
            <Input
              style={{ marginBottom: "1rem" }}
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Modal>

        {/* Modal Edit */}
        <Modal
          open={isEditing}
          title="Modifier le ToDo"
          onCancel={() => setIsEditing(false)}
          onOk={handleEdit}
          confirmLoading={loading}
        >
          <div className={styles.input_wrapper}>
            <Input
              style={{ marginBottom: "1rem" }}
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Modal>

        <Message
          message={messageContent}
          type={messageType}
          visible={messageVisible}
          onClose={() => setMessageVisible(false)}
        />
      </div>
    </div>
  );
}

export default ToDoList;
