import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MarkdownSliceView from './features/markdown/MarkdownSliceView'
import DocumentSliceView from './features/documents/DocumentSliceView';
import AppHeader from './features/header/AppHeader';
import MarkupSliceView from './features/markup/MarkupSliceView';
import DeleteModal from './features/modal/DeleteModal'
import { useAppSelector } from './app/hooks'
import Main from './features/main/Main';
import { saveState } from './localStorage';
import  store from './app/store'
import { debounce } from 'debounce'

store.subscribe(
  debounce(() => {
    saveState(store.getState())
  }, 800)
)

function App() {
  
  const showMenu = useAppSelector((state) => state.header.showMenu)

  return (
    <div className={`App grid ${ showMenu ? 'grid--3--cols' : 'grid--2--cols'}`}>
      <DocumentSliceView />
      <AppHeader />
      {/* <MarkdownSliceView />
      <MarkupSliceView /> */}
      <Main />
      <DeleteModal />
    </div>
  );
}

export default App;
