import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type themeInitStateType = {
    darkMode: boolean;
 }

 const initialState: themeInitStateType = {
     darkMode: false,
 }
 
 const themeSlice = createSlice({
     name: 'theme',
     initialState,
    reducers: {
        activateDarkMode: (state, action) => {
            state.darkMode = action.payload
            },
        }  
    })

 export default themeSlice.reducer
 export const { activateDarkMode } = themeSlice.actions