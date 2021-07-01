import React, { Component } from 'react';


export class Cadastro extends Component {
    static displayName = Cadastro.name;

    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange2(event) {
        this.setState({ value: event.target.value.replace(/[^\d]/g, "") });
    }

    handleChange(event) {
        this.setState({ value: event.target.value.replace(/[^\d]/g, "") });
    }

    render() {
        return (
            <div>
                <h3 className="espaco texto">PREENCHA COM SEUS DADOS</h3>
                <form id="form1" className="areaForm areaform2">


                    <div className="areaCadastro">

                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nome">NOME</label>
                                <input type="text" className="form-control" id="nome" placeholder="Nome" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="cpf">CPF</label>
                                <input type="text" maxLength="11" className="form-control" id="cpf" placeholder="Cpf" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="idade">IDADE</label>
                                <input type="text" className="form-control" value={this.state.value} maxLength="3" onChange={this.handleChange} id="idade" placeholder="Idade" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="sexo">SEXO</label>
                                <select className="form-control" id="sexo">
                                    <option selected>Escolha</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="telefone">Telefone</label>
                                <input type="text" className="form-control" id="telefone" maxLength="9" placeholder="Telefone" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="email">EMAIL</label>
                                <input type="email" className="form-control" id="email" placeholder="nome@exemplo.com" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="dataNasc">DATA DE NASCIMENTO</label>
                                <input type="date" className="form-control" id="dataNasc" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="cep">CEP</label>
                                <input type="text" className="form-control" id="cep" maxLength="8" placeholder="Cep" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="cidade">CIDADE</label>
                                <input type="text" className="form-control" id="cidade" placeholder="Cidade" autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="estado">Estado</label>
                                <input type="text" className="form-control" id="estado" placeholder="Estado" autoComplete="off" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="temComorbidade">Tem comorbidade</label>
                                <select className="form-control" id="temComorbidade">
                                    <option selected>Escolha</option>
                                    <option value="1">Sim</option>
                                    <option value="2">Não</option>
                                </select>
                            </div>
                            <div className="form-group col-md-12 botaoAlinhar" align="center">
                                <button id="botaoSalvar" className="btn btn-light botao">SALVAR</button>
                            </div>

                        </div>

                    </div >

                </form >
            </div>
        );
    }
}