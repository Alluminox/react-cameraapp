import { createContext } from 'react';

export const ThemeTypes = {
    DARK: 'dark',
    LIGHT: 'light'
}

/*
** OBS -> O contexto pode ser criado diversas vezes
*/
export const Context = createContext({
    theme: ThemeTypes.LIGHT
});

export const ThemeProvider = Context.Provider;

