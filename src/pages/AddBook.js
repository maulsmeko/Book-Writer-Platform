import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import Section from "../components/Section/Section";
import useNode from "../hooks/useNode";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const initialValues = {
    title: "",
    category: "",
    description: "",
    author: "",
    collaborators: [],
    sections: [],
  };

  const section = {
    id: 1,
    items: [],
  };

  const navigate = useNavigate();

  const [bookData, setBookData] = useState(initialValues);
  const [usersList, setUsersList] = useState([]);
  const [sectionData, setSectionData] = useState(section);
  console.log(sectionData, "section===");

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(sectionData, folderId, item);
    setSectionData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(sectionData, folderId, value);
    setSectionData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(sectionData, folderId);
    const temp = { ...finalStructure };
    setSectionData(temp);
  };

  const getCollaboratorsList = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/users?role=collaborator",
        { method: "GET", headers: { Authorization: "application/json" } }
      );
      const data = await response.json();
      setUsersList(data);
    } catch (error) {
      toast.error("Failed" + error.message);
    }
  };

  useEffect(() => {
    getCollaboratorsList();
  }, []);

  const getCurrentUser = localStorage.getItem("userData");
  const authUser = JSON.parse(getCurrentUser);

  useEffect(() => {
    setBookData({ ...bookData, author: authUser?.user?.id });
  }, []);

  useEffect(() => {
    if (sectionData?.items?.length) {
      setBookData({ ...bookData, sections: sectionData });
    }
  }, [sectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/books", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      console.log(response, "res---", data, "data---");
    } catch (error) {
      toast.error("Failed" + error.message);
    }
  };

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div className="container">
      <div className="design-above-form">
        <h2>Add a New Book</h2>
        <p>Fill out the form below to add a new book to your collection.</p>
      </div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="main-content-part">
          <div className="form-data">
            <div className="filed">
              <label>
                Book Title
                <span className="text-danger">*</span>
              </label>
              <input
                required
                placeholder="Jack Williams"
                type="text"
                value={bookData.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="filed">
              <label>
                Book Category
                <span className="text-danger">*</span>
              </label>
              <input
                required
                placeholder="Fictional"
                type="text"
                value={bookData.category}
                name="category"
                onChange={handleChange}
              />
            </div>
            <div className="filed">
              <label>Book Description</label>
              <textarea
                placeholder="Enter Description"
                type="text"
                value={bookData.description}
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="filed">
              <label>
                Select Collaborators
                <span className="text-danger">*</span>
              </label>
              <Multiselect
                options={usersList?.map((clb) => ({
                  key: clb.name,
                  value: clb.id,
                }))}
                customArrow={
                  <img src="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e" />
                }
                displayValue="key"
                placeholder="Select Collabarators"
                showArrow={true}
                keepSearchTerm={true}
                onSelect={(selectedList, selectedItem) => {
                  setBookData({ ...bookData, collaborators: selectedList });
                }}
                onRemove={(selectedList, removedItem) => {
                  setBookData({ ...bookData, collaborators: selectedList });
                }}
                className="my-5"
              />
            </div>
            <Section
              section={sectionData}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
            />
            <button className="btn btn-orange" onClick={handleNavigate}>
              Add Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
