import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import Section from "../components/Section/Section";
import useNode from "../hooks/useNode";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [bookDetails, setBookDetails] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  console.log(bookDetails, "ook");

  const params = useParams();
  console.log(params, "params");

  const bookDetail = async () => {
    try {
      const response = await fetch(`http://localhost:9000/books/${params.id}`, {
        method: "GET",
        headers: {
          authorization: "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok && data) {
        toast.error(data);
      } else if (response.ok) {
        setBookDetails(data);
        setSelectedUsers(data.collaborators || []);
      }
    } catch (error) {
      toast.error("Failed" + error.message);
    }
  };

  useEffect(() => {
    bookDetail();
  }, [params.id]);

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

  const [usersList, setUsersList] = useState([]);
  const [sectionData, setSectionData] = useState(
    bookDetails?.sections?.length > 0 ? bookDetails.sections : section
  );
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
    setBookDetails({ ...bookDetails, author: bookDetails?.author });
  }, []);

  useEffect(() => {
    if (sectionData?.items?.length) {
      setBookDetails({ ...bookDetails, sections: sectionData });
    }
  }, [sectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/books/${params.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
        body: JSON.stringify(bookDetails),
      });
      const data = await response.json();
      console.log(response, "res---", data, "data---");
    } catch (error) {
      toast.error("Failed" + error.message);
    }
  };

  const handleChange = (e) => {
    setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };
  return (
    <div className="container">
      <div className="design-above-form">
        <h2>Edit Book</h2>
        <p>Fill out the form below to edit your book.</p>
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
                readOnly={params.type === "view" ? true : false}
                placeholder="Jack Williams"
                type="text"
                value={bookDetails.title}
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
                readOnly={params.type === "view" ? true : false}
                placeholder="Fictional"
                type="text"
                value={bookDetails.category}
                name="category"
                onChange={handleChange}
              />
            </div>
            <div className="filed">
              <label>Book Description</label>
              <textarea
                placeholder="Enter Description"
                readOnly={params.type === "view" ? true : false}
                type="text"
                value={bookDetails.description}
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
                disabled={params.type === "view" ? true : false}
                selectedValues={selectedUsers}
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
                  setBookDetails({
                    ...bookDetails,
                    collaborators: selectedList,
                  });
                }}
                onRemove={(selectedList, removedItem) => {
                  setBookDetails({
                    ...bookDetails,
                    collaborators: selectedList,
                  });
                }}
                className="my-5"
              />
            </div>
            <Section
              type={params.type}
              section={sectionData}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
            />
            <button className="btn btn-orange" onClick={handleNavigate}>
              Edit Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
