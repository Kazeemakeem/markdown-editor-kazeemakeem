import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Doc = {
     dateCreated: Date;
     markup: string[];
     markdown: string[]
 }
export type docInitStateType = Record<string, Doc>

 const initialState: docInitStateType = {}

type AddNewActionType = {
    type: 'ADD_NEW';
    payload: {
        key: string;
        data: Doc;
    }
 }

 export type PayloadActionType = {
    key: string;
    data: Doc;
}
 
 const documentsSlice = createSlice({
     name: 'documents',
     initialState,
    reducers: {
        addNewDoc: (docState, action) => {
            docState[action.payload.key] = action.payload.data
        },

        updateDocMarkdown: (docState, action) => {
            docState[action.payload.key].markdown = action.payload.data.markdown
        },

        updateDocMarkup: (docState, action) => {
            docState[action.payload.key].markup = action.payload.data.markup
        },

        deleteDoc: (docState, action) => {
            delete docState[action.payload.key]
        },
    },
    })

 export default documentsSlice.reducer
 export const { addNewDoc, updateDocMarkdown, updateDocMarkup, deleteDoc } = documentsSlice.actions