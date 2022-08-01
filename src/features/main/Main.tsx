import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import MarkdownSliceView from '../markdown/MarkdownSliceView'
import MarkupSliceView from '../markup/MarkupSliceView'
import './main.css'

const Main = () => {
    const modalShowUpdate = useAppSelector(state => state.header.showModal)
    const menuOpen = useAppSelector(state => state.header.showMenu)

  return (
    <div className={`main ${ menuOpen ? 'col--2--start' : ''} ${ modalShowUpdate ? 'faint' : '' }`}>
      <MarkdownSliceView />
      <MarkupSliceView />
    </div>
  )
}

export default Main
