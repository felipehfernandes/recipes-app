import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesAppProvider from './context/RecipesAppProvider';

function App() {
  return (
    <RecipesAppProvider>
      {/* <Login /> */}
      <div />
    </RecipesAppProvider>
  );
}

export default App;
