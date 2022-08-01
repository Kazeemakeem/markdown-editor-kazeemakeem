import React from 'react'
import { useAppSelector } from '../../app/hooks'
import './markup.css'

const MarkupSliceView = () => {

  const modalShowUpdate = useAppSelector(state => state.header.showModal)
    const markupArr = useAppSelector(state => state.markup.markup)
    const darkMode = useAppSelector(state => state.theme.darkMode)
  
  return (
    <div className={`markup grid ${ darkMode ? 'dark-wrapper' : ''} ${ modalShowUpdate ? 'faint' : '' }`}>
      <h6 className={`preview-header left-indent ${darkMode ? 'dark-header' : ''}`}>Markup</h6>
      <div className={`markup-container ${ darkMode ? 'dark-markup' : ''}`}>
        {markupArr.map((item) =>
        (/^<block/.test(item) || /^<pre>/.test(item)) ? <div className={ darkMode ? 'dark' : 'light'} dangerouslySetInnerHTML={{__html: item}}/> : <div dangerouslySetInnerHTML={{__html: item}}/>)}
      </div>
    </div>
  )
}

export default MarkupSliceView
