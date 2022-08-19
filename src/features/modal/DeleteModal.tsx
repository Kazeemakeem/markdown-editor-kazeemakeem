import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteDoc } from '../documents/documentsSlice'
import { hideModal, updateTab } from '../header/headerSlice'
import './modal.css'

type GameModalProps = {
    show: boolean
}

const DeleteModal = () => {

    const dispatch = useAppDispatch()
    const modalShowUpdate = useAppSelector(state => state.header.showModal)
    const currentDocName = useAppSelector(state => state.header.currentDocName)
    const darkMode = useAppSelector(state => state.theme.darkMode)

    if(!modalShowUpdate) return null

  return (
    <div className={`modal--container flexed ${ darkMode ? 'dark--modal' : '' }`}>
      <div className='modal flexed'>
        <div className='modal-content flexed'>
          <div className='modal-header'>
            <h4>Delete document?</h4>
          </div>
          <p className='modal-msg'>Are you sure you want to delete <span>'{currentDocName}.md' document and its content. 
          The action  can not be reversed</span></p>
          <div className='modal--footer flexed btn--2--pane'>
              <button className='btn btn--modal btn--modal--cancel' onClick={() => dispatch(hideModal())}>Cancel</button>
              <button className='btn btn--modal btn--modal--confirm'onClick={() => {
                  dispatch(hideModal())
                  dispatch(deleteDoc({key:currentDocName}))
                  dispatch(updateTab(''))
                  }}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
