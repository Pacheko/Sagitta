import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../img/LogoMedicenter.png'

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    handleClick() {
        const subnav = document.querySelector("#subnav");
        const toggleNavButton = document.querySelector(".toggleNavButton");
        subnav.classList.toggle('active');
        toggleNavButton.classList.toggle('active');
    }

  render () {
      return (<header id="header-main" className="bg-brand-blue">
                    <nav className="navbar navbar-expand-lg" id="nav-main">
                        <div className="container-fluid px-md-5">
                            <a className="navbar-brand" tag={Link} to="/">
                                <img src={logo} className="logomenu" id="navbar-logo" />  
                            </a>

                            <ul className="navbar-nav ml-auto botaomenu">

                                <li className="nav-item toggleNav" onClick={this.handleClick.bind(this)}>
                                    <div className="toggleNavButton"></div>
                                </li>

                            </ul>
                        
                        </div>  
                
                    </nav>

                    <div id="subnav">
                        <div className="row">
                            <div className="col-12 col-md-10">
                                <ul className="p-0">
                                    <li> <a className="nav-item toggleNav linkmenu" onClick={() => { window.location.href = "/" }}>HOME</a> </li>
                                    <li> <a className="nav-item toggleNav linkmenu" onClick={() => { window.location.href = "/counter" }}>SISTEMA</a> </li>
                                    <li> <a className="nav-item toggleNav linkmenu" onClick={() => { window.location.href = "/fetch-data" }}>CONTATO</a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

    );
  }
}
