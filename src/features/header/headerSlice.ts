import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../app/hooks'


export type headerInitStateType = {
    currentDocName: string;
    showModal: boolean;
    showMenu: boolean;
    menuClosed: boolean;
}

const initialState: headerInitStateType = {
    currentDocName: '',
    showModal: false,
    showMenu: false,
    menuClosed: false,
}

const headerSlice = createSlice({
     name: 'header',
     initialState,
    reducers: {
        updateTab: (state, action) => {
        state.currentDocName = action.payload
        },

        showModal: (state) => {
            state.showModal = true
        },

        hideModal: (state) => {
            state.showModal = false
        },

        showMenu: (state) => {
            state.showMenu = true
        },

        hideMenu: (state) => {
            state.showMenu = false
        },

        closeButtonClicked: (state, action) => {
            state.menuClosed = action.payload
        },
    },
    })

 export default headerSlice.reducer
 export const { updateTab, showModal, hideModal, showMenu, hideMenu, closeButtonClicked } = headerSlice.actions