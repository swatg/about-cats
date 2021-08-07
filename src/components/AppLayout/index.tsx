import React from 'react';
// Router
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes';
// Components
import Header from 'components/Header';
// import Footer from 'components/Footer';

function AppLayout() {
  return (
    <Router>
      <Header />
      <main className="root__content">
        <Routes />
      </main>
    </Router>
  );
}

export default AppLayout;
