import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../img/LogoMedicenter.png'

const styles22 = {
    teste1: {
        color: 'red',
    },
    teste2: {
        color: 'green'
    },
};

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    botaoLogout() {
        const logout = document.querySelector("#logout");
        if (sessionStorage.getItem("login") == "true") {
            logout.classList.toggle('active');
        } else {
            logout.classList.toggle('disable');
        }
        
    }

    handleClick() {
        const subnav = document.querySelector("#subnav");
        const toggleNavButton = document.querySelector(".toggleNavButton");
        subnav.classList.toggle('active');
        toggleNavButton.classList.toggle('active');
    }

    sairLogout() {
        sessionStorage.setItem("login", "false");
        window.location.href = "/";
    }

    render() {
        return (<header id="header-main" className="bg-brand-blue" onLoad={this.botaoLogout.bind(this)}>
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
                        <div id="logout" onClick={this.sairLogout}>LOGOUT</div>
                    </nav>

                    <div id="subnav">
                        <div className="row">
                            <div className="col-12 col-md-10">
                                <ul className="p-0">
                                    <li> <a className="nav-item toggleNav linkmenu" onClick={() => { window.location.href = "/" }}>HOME</a> </li>
                                    <li> <a className="nav-item toggleNav linkmenu" onClick={() => { window.location.href = "/sistema" }}>SISTEMA</a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

    );
  }
}
