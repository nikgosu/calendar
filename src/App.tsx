import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/Theme'
import Calendar from './components/Calendar'

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Calendar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
