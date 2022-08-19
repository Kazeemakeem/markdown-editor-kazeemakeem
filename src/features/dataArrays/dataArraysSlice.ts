import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import docState from '../documents/documentsSlice'
// import { markdownArr } from './MarkdownSliceView'
import { updateTab } from '../header/headerSlice'


export type markdownInitStateType = {
    markdown: string[];
    markup: string[];
    reformedMarkdownArr: string[];
    newMarkdownArr: string[];
 }

 const initialState: markdownInitStateType = {
     markdown: [],
     markup: [],
     reformedMarkdownArr: [],
     newMarkdownArr: []
 }

 
 const dataArraysSlice = createSlice({
     name: 'dataArray',
     initialState,
    reducers: {
        updateMarkdown: (state, action: PayloadAction<string[]>) => {
        state.markdown = action.payload
        },

        resetCurrMarkdown: (state) => {
            state.markdown = []
        },

        setReformedMarkdownArr: (state, action) => {
            state.reformedMarkdownArr = action.payload
        },
        setNewMarkdownArr: (state, action) => {
            state.newMarkdownArr = action.payload
        },

        updateMarkup: (state, action) => {
            state.markup = action.payload
        }

    },
    })

 export default dataArraysSlice.reducer
 export const { updateMarkdown, resetCurrMarkdown, setReformedMarkdownArr, setNewMarkdownArr, updateMarkup } = dataArraysSlice.actions