import React from 'react';
import "./App.css"
// import Header from './Components/Navigation/Header/Header';
import Movies from './Components/Movies'
import Sidebar from './Components/Navigation/Sidebar'
import Directors from './Components/Directors'
import Categories from './Components/Categories'
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom'
import { Users } from './Components/Users/Users';
import Invoices from './Components/Invoices';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Row style={{ margin: 0, padding: 0 }}>
          <Col style={{ position: "fixed", height: "100%", overflowY: "scroll" }}>
            <Sidebar />
            <Route path="/" exact render={() => <h1 style={{ marginLeft: 65 }}>Home</h1>} />
            <Route path="/movies" component={Movies} />
            <Route path="/directors" component={Directors} />
            <Route path="/categories" component={Categories} />
            <Route path="/users" component={Users} />
            <Route path="/invoices" component={Invoices} />
          </Col>
        </Row>
      </div >
    </BrowserRouter>
  );
}

export default App;
