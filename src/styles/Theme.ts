import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    primary: '#7a7a7a',
    headerBackground: '#FF3CAC',
    headerBackgroundGradient: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
    white: '#ffffff',
    inputColor: '#4b4b4b',
    inputBackground: '#d7d7d7',
    dayItemColor: '#464646',
    taskItemBackground: '#ffd6c7',
    lightGray: '#969b9b',
  },
  text: {
    standard: '1rem',
    secondary: '1.1rem',
    title: '25px',
    dayItem: '0.8rem'
  },
  weight: {
    normal: '400',
    semiBold: '500',
    bold: '700'
  },
  offsets: {
    containerPadding: '0.4% 0.5%',
    dayItemPadding: '2px 4px',
    dayItemMB: '4px',
  },
  borders: {
    dayItemRadius: '3px'
  }
}
