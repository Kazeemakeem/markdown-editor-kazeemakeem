import { docInitStateType } from './features/documents/documentsSlice'
import { markdownInitStateType } from './features/markdown/markdownSlice'
import { markupInitStateType } from './features/markup/markupSlice'
import { themeInitStateType } from './features/theme/themeSlice'
import { headerInitStateType } from './features/header/headerSlice'

type ReduxStateType = {
    documents: docInitStateType;
    markdown: markdownInitStateType;
    markup: markupInitStateType;
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