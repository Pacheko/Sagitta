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
import { AdmCadastrados } from './components/AdmCadastrados';
import { Finalizar } from './components/Finalizar';
import { CidadesCadastradas } from './components/CidadesCadastradas';
import { GruposCadastrados } from './components/GruposCadastrados';
import { NovaCampanhaVacinacao } from './components/NovaCampanhaVacinacao';
import { CampanhasCadastradas } from './components/CampanhasCadastradas';

import './custom.css'



export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>

                {/*SITE*/}
                <Route exact path='/' component={Home} />
                <Route path='/cadastro' component={Cadastro} />
                <Route path='/confirmacao' component={Confirmacao} />
                <Route path='/confirmacao/pessoa/:id' component={Confirmacao} />
                <Route path='/finalizar' component={Finalizar} />

                {/*SISTEMA*/}
                <Route path='/sistema' component={Sistema} />
                <Route path='/pessoascadastradas' component={PessoasCadastradas} />
                <Route path='/pessoasaptasvacinar' component={PessoasAptasVacinar} />
                <Route path='/vacinascadastradas' component={VacinasCadastradas} />
                <Route path='/loginMedicenter' component={LoginMedicenter} />
                <Route path='/novoUsuario' component={NovoUsuario} />
                <Route path='/novoUsuario/edit/:id' component={NovoUsuario} />
                <Route path='/novaVacina' component={NovaVacina} />
                <Route path='/novaVacina/edit/:id' component={NovaVacina} />
                <Route path='/configuracoes' component={Configuracoes} />
                <Route path='/cadastroCidade' component={CadastroCidade} />
                <Route path='/cadastroCidade/edit/:id' component={CadastroCidade} />
                <Route path='/cidadesCadastradas' component={CidadesCadastradas} />
                <Route path='/grupoEspecial' component={GrupoEspecial} />
                <Route path='/admCadastrados' component={AdmCadastrados} />
                <Route path='/gruposCadastrados' component={GruposCadastrados} />
                <Route path='/gruposCadastrados/edit/:id' component={GruposCadastrados} />
                <Route path='/novaCampanhaVacinacao' component={NovaCampanhaVacinacao} />
                <Route path='/novaCampanhaVacinacao/edit/:id' component={NovaCampanhaVacinacao} />
                <Route path='/campanhasCadastradas/' component={CampanhasCadastradas} />

            </Layout>
        );
    }
}
