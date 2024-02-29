import React, { useRef, useState, createContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewDoc } from "./documentsSlice";
import "./document.css";
import { documentIcon, toggleLeftIcon, toggleRightIcon } from "../icons/Icons";
import { updateTab, closeButtonClicked } from "../header/headerSlice";
import { updateMarkdown } from "../dataArrays/dataArraysSlice";
import { Moon, Sun } from "phosphor-react";
import { activateDarkMode } from "../theme/themeSlice";
import { updateMarkup } from "../dataArrays/dataArraysSlice";
import { convertContent } from "../../utils/convertContent";

//  export let currentDocNameTab:string = ''
//  export let currentDocMarkdown: string[] = []

const DocumentSliceView = () => {
  const [value, setValue] = useState("");
  const [hideNewName, setHideNewName] = useState(true);
  const dispatch = useAppDispatch();
  const documents = useAppSelector((state) => state.documents);
  const newDocName: string = value;
  const reformedMarkdownArr = useAppSelector(
    (state) => state.dataArrays.reformedMarkdownArr
  );

  console.log("document reformed", reformedMarkdownArr);

  const newDocArg = {
    key: newDocName,
    data: {
      dateCreated: new Date(),
      markup: [] as string[],
      markdown: [] as string[],
    },
  };

  const textInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   nameInput = document.querySelector('input.new-name') as HTMLInputElement
  // }, [])

  const handleCreateNewDoc = () => {
    dispatch(closeButtonClicked(false));
    setHideNewName(false);

    setTimeout(() => {
      textInputRef.current?.focus();
    }, 500);
  };

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    value && dispatch(addNewDoc(newDocArg));
    setHideNewName(true);
    setValue("");
  };

  const addToTabBar = (listItem: string) => {
    dispatch(updateTab(listItem));
    dispatch(updateMarkdown(documents[listItem].markdown));
  };

  const updateRenderedMarkup = (docName: string, savedDocMarkup: string[]) => {
    addToTabBar(docName);
    dispatch(updateMarkup(savedDocMarkup));
  };

  // convertContent(reformedMarkdownArr)

  const currentDocName = useAppSelector((state) => state.header.currentDocName);
  const docList = Array.from(Object.keys(documents))
    .reverse()
    .map((item) => {
      const date = documents[item].dateCreated.toString().slice(0, 10);
      return (
        <li
          key={item}
          className="doc"
          onClick={() => {
            // const currItem = documents[item].markup;
            updateRenderedMarkup(item, documents[item].markup);
          }}
        >
          <div className="icon-centered dark-box">{documentIcon}</div>
          <div className="doc-details">
            <p className="name-title">{date}</p>
            <p className="doc-name">{item}.md</p>
          </div>
        </li>
      );
    });

  const showMenu = useAppSelector((state) => state.header.showMenu);
  const menuClosed = useAppSelector((state) => state.header.menuClosed);
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const modalShowUpdate = useAppSelector((state) => state.header.showModal);

  if (!showMenu) return null;

  return (
    <div className={`sidebar flexed ${modalShowUpdate ? "faint" : ""}`}>
      <div className="document-container flexed">
        <h6 className=" header document-header">My Documents</h6>
        <button className="btn new-doc-btn" onClick={handleCreateNewDoc}>
          + New <span className="btn-span">Document</span>
        </button>
        {/* <button className='btn new-doc-btn small-screen' onClick={handleCreateNewDoc}>+ New</button> */}
        <form onSubmit={handleNameSubmit}>
          <input
            ref={textInputRef}
            className={`new-name ${hideNewName || menuClosed ? "hidden" : ""}`}
            type="text"
            value={value}
            placeholder="Type name here and press Enter"
            onChange={(e) => setValue(e.target.value)}
          />
        </form>

        <div className="documents">
          <ul
            onClick={() => setHideNewName(true)}
            className="document-list flexed"
          >
            {docList.map((listItem) => listItem)}
          </ul>
        </div>
      </div>

      <div className="visual-mode flexed">
        <div>
          <Moon color={darkMode ? "#fff" : "#7c8187"} size={16} />
        </div>
        <div
          onClick={() => dispatch(activateDarkMode(!darkMode))}
          className="toggle-mode flexed"
        >
          {darkMode ? toggleLeftIcon : toggleRightIcon}
        </div>
        <div>
          <Sun color={darkMode ? "#7c8187" : "#fff"} size={16} />
        </div>
      </div>
    </div>
  );
};

export default DocumentSliceView;
