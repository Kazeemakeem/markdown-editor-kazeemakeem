import React from 'react'
import {moonIcon, sunIcon, deleteIcon, closeIcon, menuIcon, documentIcon, SaveIcon } from '../icons/Icons'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import './header.css'
import { updateDocMarkdown, updateDocMarkup } from '../documents/documentsSlice'
// import { markdownArr } from '../markdown/MarkdownSliceView'
import { showModal, showMenu, hideMenu, closeButtonClicked } from './headerSlice'
// import { nodeArr } from '../markup/markupSlice'


const AppHeader = () => {

    const dispatch = useAppDispatch()
    const currentDocName = useAppSelector((state) => state.header).currentDocName
    const documents = useAppSelector((state) => state.documents)
    const newMarkdownArr = useAppSelector((state) => state.dataArrays.newMarkdownArr)
    // const nodeArr = useAppSelector((state) => state.markup.nodeArr)
    const markupArr = useAppSelector((state) => state.dataArrays.markup)

    const handleSaveChanges = () => {
      dispatch(updateDocMarkdown({key:currentDocName, data:{markdown: newMarkdownArr}}))
      dispatch(updateDocMarkup({key:currentDocName, data:{markup: markupArr}}))
    }

    const handleDelete = (event:React.MouseEvent<HTMLDivElement>): void => {
      dispatch(showModal())
    }

    const menuOpen = useAppSelector(state => state.header.showMenu)
    const modalShowUpdate = useAppSelector(state => state.header.showModal)

   
  return (    
    <div className={`bar-container flexed ${ menuOpen ? 'header-col--2' : 'full-bar'} ${ modalShowUpdate ? 'faint' : '' }`}>
      <div className='menu-bar flexed'>
        <div className='icon menu-icons flexed'>
          <div className={`close-menu-btn icon-centered box ${ !menuOpen ? 'hidden' : ''}`} onClick={() => {
            dispatch(hideMenu())
            dispatch(closeButtonClicked(true))}} >{closeIcon}</div>
          <div className= {`open-menu-btn icon-centered box ${ menuOpen ? 'hidden' : ''}`} onClick={() => dispatch(showMenu())}>{menuIcon}</div>
          <h5 className='title flexed'>Markdown</h5>
        </div>
      </div>
      <div className='header-bar flexed'>
        {currentDocName &&  (
        <div className='tab-bar-container flexed'>
          <div className='tab-bar flexed'>
            <div className='tab flexed'>
              <div className='tab-icon icon-centered dark-box '>{documentIcon}</div>
              <div className='tab-details'>
                <p className='name-title'>Document Name</p>
                <p className='doc-name'>{currentDocName}.md</p>
              </div>
            </div>

            <div className='doc-action flexed'>
              <div className='delete-btn flexed' onClick={handleDelete}>{deleteIcon}</div>
              <button className='btn save-changes-btn icon-centered' onClick={handleSaveChanges}>{SaveIcon}<span className='save-text'>Save <span className='btn-span'>Changes</span></span></button>
              {/* <button className='btn save-changes-btn icon-centered small-screen' onClick={handleSaveChanges}>{SaveIcon}<span className='save-text'>Save</span></button> */}
            </div>
          </div>
        </div>)}
      </div>
    </div>

  )
}

export default AppHeader
