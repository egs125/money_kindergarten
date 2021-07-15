import React from 'react';
import NavBar from './components/NavBar';
import AuthContainer from './containers/AuthContainer';
import './style/style.scss';

function App() {
  return (
    <div className="root-container">
      <NavBar />
      <AuthContainer />
    </div>
  );
}

export default App;