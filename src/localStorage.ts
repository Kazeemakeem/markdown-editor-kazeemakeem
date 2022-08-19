import { docInitStateType } from './features/documents/documentsSlice'
import { markdownInitStateType } from './features/dataArrays/dataArraysSlice'
import { themeInitStateType } from './features/theme/themeSlice'
import { headerInitStateType } from './features/header/headerSlice'

type ReduxStateType = {
    documents: docInitStateType;
    dataArrays: markdownInitStateType;
    theme: themeInitStateType;
    header: headerInitStateType;
}

export const loadState = () => {
    try{
        const persistedState = localStorage.getItem('appState')
        if(!persistedState) return undefined
        return JSON.parse(persistedState)
    } catch(error) {
        return undefined
    }
}

export const saveState = (state: ReduxStateType) => {
    try {
        const persistedState = JSON.stringify(state)
        localStorage.setItem('appState', persistedState)
    } catch(error) {
        console.log(error)
    }
}