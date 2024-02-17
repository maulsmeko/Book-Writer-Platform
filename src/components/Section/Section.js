import React, { useEffect, useRef, useState } from "react";
import Action from "../Action";
import { ReactComponent as DownArrow } from "../../assets/images/down-arrow.svg";
import { ReactComponent as UpArrow } from "../../assets/images/up-arrow.svg";

const Section = ({
  section,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  type
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewSection = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddSection = () => {
    if (editMode) {
      handleEditNode(section.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(section.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(section.id);
  };

  return (
    <>
      <div className={section.id !== 1 && "sectionContainer"}>
        {section.id === 1 ? (
          <>
            {/* Create-Section  */}
            <div className="filed">
              <label>
                Section
                <span className="text-danger">*</span>
              </label>
              <div className="section-title">
                <input
                readOnly={type === "view" ? true : false}
                  placeholder="Section"
                  type="text"
                  name="category"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Action
                  className="add-btn"
                  type="ADD"
                  handleClick={onAddSection}
                />
              </div>
            </div>
            {/* Create-Section  */}
          </>
        ) : (
          <>
            {/* Edit-Section   */}
            <span
                readOnly={type === "view" ? true : false}
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {section.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddSection}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = section.name;
                      setEditMode(false);
                    }}
                  />
                  {/* Edit-Section   */}
                </>
              ) : (
                <>
                  {/* Sub Section Create */}
                  <Action

                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        ADD
                      </>
                    }
                    handleClick={handleNewSection}
                  />
                  {/* Sub Section Create */}
                  {/* Sub Section Edit */}
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  {/* Sub Section Edit */}
                  {/* Sub Section Delete */}
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                  {/* Sub Section Delete */}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="filed">
            <input
                readOnly={type === "view" ? true : false}
              required
              placeholder="Section"
              type="text"
              name="category"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="btns">
              <Action
                className="reply"
                type="ADD"
                handleClick={onAddSection}
              />
              <Action
                className="reply"
                type="CANCEL"
                handleClick={() => {
                  setShowInput(false);
                  if (!section?.items?.length) setExpand(false);
                }}
              />
            </div>
          </div>
        )}

        {section?.items?.map((sec) => {
          return (
            <Section
              key={sec.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              section={sec}
            />
          );
        })}
      </div>
    </>
  );
};

export default Section;
