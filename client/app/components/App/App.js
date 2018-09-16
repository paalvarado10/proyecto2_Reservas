import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <>
    <Header />

    <main style={{backgroundImage: 'url("https://image.freepik.com/vector-gratis/plantilla-de-fondo-con-textura-de-acuarela-de-color-azul-claro_1639-277.jpg")'}}>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
