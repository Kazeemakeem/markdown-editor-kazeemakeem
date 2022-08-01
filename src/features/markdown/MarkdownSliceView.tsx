import React, { useRef, useEffect } from 'react'
import './markdown.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { convertContent } from '../markup/markupSlice'

export let markdownArr: string[] = []
export let sortedMarkdownArr: string[] = []


const MarkdownSliceView = () => {

  const markdownRef = useRef<HTMLTextAreaElement>(null)
  let currMarkdown = useAppSelector((state) => state.markdown.markdown).join('\n')

  const handleMarkdownUpdate = (event:React.ChangeEvent<HTMLTextAreaElement>): void => {
    markdownArr = (currMarkdown === event.target.value) ? currMarkdown.split('\n') : event.target.value.split('\n')
    sortedMarkdownArr = markdownArr
                .reduce<string[]>((prev: string[], curr: string, i: number, array: string[]): string[] => {
                  if(!prev.length) prev.push(curr)
                  else if(array[i-1].slice(0,1) === '<' && curr.slice(0,3) === '```') prev[prev.length-1] += curr
                  else if((array[i-1].slice(0,3) === '```' && curr.slice(0,1) === '<') || curr.slice(0,1) === '<' || (/^ +</.test(curr.slice()))) prev[prev.length-1] += curr
                  else if(array[i-1].slice(0,1) !== '-' && array[i-1].slice(1,3) !== '. ') prev.push(curr)
                  else if( (array[i-1].slice(1,3) === '. ' || curr.slice(1,3) === '. ') && (array[i-1].slice(1,3)  !== curr.slice(1,3))) prev.push(curr)
                  else if(array[i-1].slice(0,1) === '-' && curr.slice(0,1) === '-') prev[prev.length-1] += curr
                  else if(array[i-1].slice(1,3) === '. ' && curr.slice(1,3) === '. '){
                    prev[prev.length-1] = prev[prev.length-1] + '_' + curr.slice(3) }
                  else prev.push(curr)
                  return prev
                }, [])
    console.log('markdown ',markdownArr)
   
}
  useEffect(() => {
    markdownRef.current!.value = currMarkdown
  },[currMarkdown])
  

  const dispatch = useAppDispatch()
  const menuOpen = useAppSelector(state => state.header.showMenu)
  const darkMode = useAppSelector(state => state.theme.darkMode)
  const modalShowUpdate = useAppSelector(state => state.header.showModal)
  
  return (
    <div className={`markdown grid ${ modalShowUpdate ? 'faint' : '' }`}>
      <h6 className={`markdown-header left-indent ${darkMode ? 'dark-header' : ''}`}>Markdown</h6>
      <div className={`markdown-container ${ darkMode ? 'dark-markdown' : ''}`}>
        <textarea ref={markdownRef} className={`markdown-text ${darkMode ? 'dark-text' : ''}`} onChange={(event) => {
        currMarkdown = ''
        handleMarkdownUpdate(event)
        dispatch(convertContent())}}></textarea>
      </div>
    </div>
  )
}

export default MarkdownSliceView