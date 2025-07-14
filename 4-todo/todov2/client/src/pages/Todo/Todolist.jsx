import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Modal, Tag, Tooltip, Select } from "antd";
import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
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
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [toDoToDelete, setToDoToDelete] = useState(null);

  function getFormatedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentEditItem(item);
    setUpdatedTitle(item.title);
    setUpdatedDescription(item.description);
    setUpdatedStatus(item.isCompleted);
  };

  const handleUpdateToDo = async () => {
    if (!currentEditItem) return;
    const data = {
      title: updatedTitle,
      description: updatedDescription,
      isCompleted: updatedStatus,
    };

    try {
      setLoading(true);
      const { message } = await toDoService.updateToDo(
        currentEditItem._id,
        data
      );
      setLoading(false);
      await fetchUserToDos();
      setMessageType("success");
      setMessageContent(message || "ToDo modifié avec succès");
      setMessageVisible(true);
      setIsEditing(false);
    } catch (err) {
      setLoading(false);
      setMessageType("error");
      setMessageContent(err.message || "Erreur inconnue");
      setMessageVisible(true);
    }
  };

  const handleDelete = (toDo) => {
    setToDoToDelete(toDo);
    setIsDeleting(true);
  };

  const handleDeleteToDo = async () => {
    if (!toDoToDelete) return;

    try {
      setLoading(true);
      const { message } = await toDoService.deleteToDo(toDoToDelete._id);
      setLoading(false);
      await fetchUserToDos();
      setMessageType("success");
      setMessageContent(message || "ToDo supprimé avec succès");
      setMessageVisible(true);
      setIsDeleting(false);
      setToDoToDelete(null);
    } catch (err) {
      setLoading(false);
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

  const filteredToDos = userToDos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredToDos.map((toDo) => (
            <div key={toDo._id} className={styles.toDo_card}>
              <div className={styles.toDo_cardHeader}>
                <div className={styles.toDo_cardTitleRow}>
                  <Title level={2} className={styles.toDo_cardTitle}>
                    {toDo.title}
                  </Title>
                  <div className={styles.toDo_cardCompletion}>
                    {toDo.isCompleted ? (
                      <Tag color="#b7eb8f">Completed</Tag>
                    ) : (
                      <Tag color="#ff4d4f">Incompleted</Tag>
                    )}
                  </div>
                </div>
                <div className={styles.toDo_cardDescription}>
                  <Title level={4} style={{ color: "#8c8c8c" }}>
                    {toDo.description}
                  </Title>
                </div>
              </div>
              <div className={styles.toDo_cardFooter}>
                <Tag>{getFormatedDate(toDo.createdAt)}</Tag>
                <div className={styles.toDo_cardActions}>
                  <Tooltip title="Éditer le ToDo">
                    <EditOutlined
                      onClick={() => handleEdit(toDo)}
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

        {/* Modal Ajout */}
        <Modal
          open={isAdding}
          title="Ajouter un ToDo"
          onCancel={() => setIsAdding(false)}
          onOk={handleSubmitToDo}
          confirmLoading={loading}
        >
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
        </Modal>

        {/* Modal Édition */}
        <Modal
          open={isEditing}
          title={`Modifier ${currentEditItem?.title || ""}`}
          onCancel={() => setIsEditing(false)}
          onOk={handleUpdateToDo}
          confirmLoading={loading}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Titre modifié"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description modifiée"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Select
            style={{ marginTop: "1rem", width: "100%" }}
            value={updatedStatus}
            onChange={(value) => setUpdatedStatus(value)}
            options={[
              { value: false, label: "Non complété" },
              { value: true, label: "Complété" },
            ]}
          />
        </Modal>

        {/* Modal Suppression */}
        <Modal
          open={isDeleting}
          title="Suppression du ToDo"
          onCancel={() => setIsDeleting(false)}
          onOk={handleDeleteToDo}
          confirmLoading={loading}
          centered
          okText="Supprimer"
          okButtonProps={{ danger: true }}
          cancelText="Annuler"
        >
          <div>
            <div>
              <ExclamationCircleOutlined
                style={{
                  fontSize: "48px",
                  color: "#faad14",
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>
          <p style={{ fontSize: "18px" }}>
            Êtes-vous sûr de vouloir supprimer ce ToDo ?
          </p>
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
