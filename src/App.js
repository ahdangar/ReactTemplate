import React, { Component } from 'react';

//import './App.css';
 import '@advanced/mosaic-styles/css/mosaic.css'
import { FormControl } from './form-control/forms'
import { AppDragDropDemo } from './dragdrop'
import { FormLayout } from './forms/forms-layout';

class App extends Component {
  render() {
    return (
      <div className="page">
      <nav className="navbar navbar-dark navbar-expand">
        <a href="#" className="navbar-brand">
          <img src="https://cdn.svc.oneadvanced.com/mosaic/2.0.0/img/logo.svg" alt="Advanced" />
          <span>Advanced</span>
        </a>
        <div className="ml-auto d-none d-lg-flex">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
               
                <div>Home</div>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle-icon" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                
                <div>My Account</div>
               
              </a>
              <div className="dropdown-menu dropdown-menu-fade" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                 
                  <div>Update Details</div>
                </a>
                <a className="dropdown-item" href="#">
                 
                  <div>Booking History</div>
                </a>
                <a className="dropdown-item" href="#">
                
                  <div>Saved Cards</div>
                </a>
                <a className="dropdown-item" href="#">
                   
                    <div>Messages</div>
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
               
                <div className='d-none d-xl-block'>Settings</div>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                
                <div className='d-none d-xl-block'>Log Out</div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="content-container">
        <div className="main-container">
          <section>
            <div className="main-inner p-4">                         
              <FormLayout />
              {/* <AppDragDropDemo/> */}
            </div>
          </section>
        </div>
      </div>
      <div className="bottom-navigation bg-dark fixed-bottom d-lg-none">
        <div className="collapse" id="bottom-navigation">
          <nav className="nav">
            <a href="#" className="nav-link">
              
              <div>Update Details</div>
            </a>
            <a data-toggle="collapse" href="#bottom-navigation" role="button" aria-expanded="false" aria-controls="bottom-navigation"
              className="nav-link">
            
              <div>Booking History</div>
            </a>
            <a href="#" className="nav-link">
             
              <div>Saved Cards</div>
            </a>
            <a href="#" className="nav-link">
             
              <div>Messages</div>
            </a>
          </nav>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link active">
            
            <div>Home</div>
          </a>
          <a data-toggle="collapse" href="#bottom-navigation" role="button" aria-expanded="false" aria-controls="bottom-navigation"
            className="nav-link">
           
            <div>My Account</div>
          </a>
          <a href="#" className="nav-link">
            
            <div>Settings</div>
          </a>
          <a href="#" className="nav-link">
           
            <div>Log Out</div>
          </a>
        </nav>
      </div>
    </div>
     
    );
  }
}

export default App;
