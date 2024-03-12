import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/Theme'
import Main from './components/Main'

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Main/>
      </ThemeProvider>
    </div>
  );
}

export default App;
