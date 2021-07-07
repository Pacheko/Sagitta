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
import { LoginMedicenter } from './components/LoginMedicenter';
import { NovoUsuario } from './components/NovoUsuario';
import { NovaVacina } from './components/NovaVacina';
import { Configuracoes } from './components/Configuracoes';
import { CadastroCidade } from './components/CadastroCidade';
import { GrupoEspecial } from './components/GrupoEspecial';

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
                <Route path='/loginMedicenter' component={LoginMedicenter} />
                <Route path='/novoUsuario' component={NovoUsuario} />

                <Route path='/novaVacina' component={NovaVacina} />
                <Route path='/novaVacina/edit' component={NovaVacina} />

                <Route path='/configuracoes' component={Configuracoes} />
                <Route path='/cadastroCidade' component={CadastroCidade} />
                <Route path='/grupoEspecial' component={GrupoEspecial} />
            </Layout>
        );
    }
}
