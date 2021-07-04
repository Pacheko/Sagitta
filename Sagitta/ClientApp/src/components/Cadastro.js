import { post } from 'jquery';
import React, { Component } from 'react';

export class Pessoa {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.cpf = "";
        this.idade = "";
        this.sexo = "";
        this.telefone = "";
        this.email = "";
        this.dataNasc = "";
        this.cep = "";
        this.cidade = "";
        this.estado = "";
        this.temComorbidade = "";
    }
}

export class Cadastro extends Component {
    static displayName = Cadastro.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            pessoa: new Pessoa()
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSalvar(event) {
        event.preventDefault();

        const data = new FormData(event.target);

       
        const response2 = fetch('/Pessoa/', { method: 'POST', body: data });
/*        this.props.history.push('/fetch-pessoa');*/
    }

   

    render() {
        return (
            <div>
                <h3 className="espaco texto">PREENCHA COM SEUS DADOS</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalvar.bind(this)}>
                    <div className="areaCadastro">
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nome">NOME</label>
                                <input type="text" name="nome" onChange={this.onChange.bind(this)} className="form-control" id="nome" placeholder="Nome" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="cpf">CPF</label>
                                <input type="text" maxLength="11" name="cpf" onChange={this.onChange.bind(this)} className="form-control" id="cpf" placeholder="Cpf" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="idade">IDADE</label>
                                <input type="text" className="form-control" name="idade" onChange={this.onChange.bind(this)} maxLength="3" id="idade" placeholder="Idade" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="sexo">SEXO</label>
                                <select className="form-control" id="sexo" name="sexo" onChange={this.onChange.bind(this)}>
                                    <option selected>Escolha</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="telefone">Telefone</label>
                                <input type="text" className="form-control" name="telefone" onChange={this.onChange.bind(this)} id="telefone" maxLength="11" placeholder="Telefone" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="email">EMAIL</label>
                                <input type="email" className="form-control" name="email" onChange={this.onChange.bind(this)} id="email" placeholder="nome@exemplo.com" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="dataNasc">DATA DE NASCIMENTO</label>
                                <input type="date" className="form-control" name="dataNasc" onChange={this.onChange.bind(this)} id="dataNasc" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="cep">CEP</label>
                                <input type="text" className="form-control" name="cep" onChange={this.onChange.bind(this)} id="cep" maxLength="8" placeholder="Cep" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="cidade">CIDADE</label>
                                <input type="text" className="form-control" name="cidade" onChange={this.onChange.bind(this)} id="cidade" placeholder="Cidade" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="estado">Estado</label>
                                <input type="text" className="form-control" name="estado" onChange={this.onChange.bind(this)} id="estado" placeholder="Estado" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="temComorbidade">Tem comorbidade</label>
                                <select className="form-control" id="temComorbidade" name="temComorbidade" onChange={this.onChange.bind(this)}>
                                    <option selected>Escolha</option>
                                    <option value="1">Sim</option>
                                    <option value="2">Não</option>
                                </select>
                            </div>
                            <div className="form-group col-md-12 botaoAlinhar" align="center">
                                <button id="botaoSalvar" type="submit" className="btn btn-light botao">SALVAR</button>
                            </div>

                        </div>

                    </div >

                </form >
            </div>
        );
    }


}
