import React from 'react';
import './App.css';
import Calendar from './pages/Calendar'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/Theme'

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
