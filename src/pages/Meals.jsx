import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import List from '../components/List';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <List title="Meals" />
      <Footer />
    </div>
  );
}

export default Meals;
