import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PessoasCadastradas } from './components/PessoasCadastradas';
import { PessoasAptasVacinar } from './components/PessoasAptasVacinar';
import { Sistema } from './components/Sistema';
import { Cadastro } from './components/CadastroPessoa';
import { Confirmacao } from './components/Confirmacao';
import { VacinasCadastradas } from './components/VacinasCadastradas';


import './custom.css'
import { Finalizar } from './components/Finalizar';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/sistema' component={Sistema} />
                <Route path='/pessoascadastradas' component={PessoasCadastradas} />
                <Route path='/pessoasaptasvacinar' component={PessoasAptasVacinar} />
                <Route path='/vacinascadastradas' component={VacinasCadastradas} />
                <Route path='/cadastro' component={Cadastro} />
                <Route path='/confirmacao' component={Confirmacao} />
                <Route path='/finalizar' component={Finalizar} />
            </Layout>
        );
    }
}
