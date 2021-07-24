import React from 'react';
import NavBar from './components/NavBar';
import AppRouter from './router/AppRouter';
import './style/style.scss';

function App() {
  return (
    <div>
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;