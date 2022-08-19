import React from 'react'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import  documentsReducer  from '../features/documents/documentsSlice'
import  dataArraysReducer from '../features/dataArrays/dataArraysSlice'
// import  markupReducer from '../features/markup/markupSlice'
import  themeReducer from '../features/theme/themeSlice'
import  headerReducer from '../features/header/headerSlice'
import { loadState } from '../localStorage'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
    devTools: true,
    reducer: {
        documents: documentsReducer,
        dataArrays: dataArraysReducer,
        theme: themeReducer,
        // markup: markupReducer,
        header: headerReducer
    },

    preloadedState: loadState(),

    middleware: (getDefaultMiddleware) => getDefaultMiddleware()

})

export default store
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch