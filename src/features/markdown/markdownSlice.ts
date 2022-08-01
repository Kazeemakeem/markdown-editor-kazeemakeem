import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import docState from '../documents/documentsSlice'
import { markdownArr } from './MarkdownSliceView'
import { updateTab } from '../header/headerSlice'


export type markdownInitStateType = {
    markdown: string[]
 }

 const initialState: markdownInitStateType = {
     markdown: [],
 }

 
 const markdownSlice = createSlice({
     name: 'markdown',
     initialState,
    reducers: {
        updateContent: (state, action: PayloadAction<string[]>) => {
        state.markdown = action.payload
        },
    },
    })

 export default markdownSlice.reducer
 export const { updateContent } = markdownSlice.actions