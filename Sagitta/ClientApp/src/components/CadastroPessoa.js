import { post } from 'jquery';
import React, { Component } from 'react';
import ComboCidade from './ComboCidade';
import ComboPrioridade from './ComboPrioridade';

export class Pessoa {
    constructor() {
        this.nome = "";
        this.cpf = "";
        this.idade = 0;
        this.sexo = "";
        this.fone = "";
        this.email = "";
        this.dataNascimento = "";
        this.cidadeId = 0;
        this.prioridadeId = -1;
    }
}

export class Cidade {
    constructor() {
        this.id = [];
        this.nmCidade = [];
        this.siglaUf = [];
        this.nmUf = [];
    }
}

export class Cadastro extends Component {
    static displayName = Cadastro.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            pessoa: new Pessoa(),
            cidades: new Cidade()
        }
    }

    componentDidMount() {
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSalvar(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        fetch('api/Pessoa/', { method: 'POST', body: data })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    resultado: res
                });
                const { resultado } = this.state;
                var id = 0;
                resultado.map((resultado) => id = resultado.id);
                if (id > 0) {
                    window.location.href = "/confirmacao/pessoa?id=" + id;
                }
            });
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
                                <input type="text" name="nome" onChange={this.onChange.bind(this)} className="form-control" id="nome" placeholder="Nome" autoComplete="off" required />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="cpf">CPF</label>
                                <input type="text" maxLength="11" name="cpf" onChange={this.onChange.bind(this)} className="form-control" id="cpf" placeholder="Cpf" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="idade">IDADE</label>
                                <input type="text" className="form-control" name="idade" onChange={this.onChange.bind(this)} maxLength="3" id="idade" placeholder="Idade" autoComplete="off" required />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="sexo">SEXO</label>
                                <select className="form-control" id="sexo" name="sexo" onChange={this.onChange.bind(this)} required>                                 
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="telefone">Telefone</label>
                                <input type="text" className="form-control" name="fone" onChange={this.onChange.bind(this)} id="fone" maxLength="11" placeholder="Telefone" autoComplete="off" required />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="email">EMAIL</label>
                                <input type="email" className="form-control" name="email" onChange={this.onChange.bind(this)} id="email" placeholder="nome@exemplo.com" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="dataNascimento">DATA DE NASCIMENTO</label>
                                <input type="date" className="form-control" name="dataNascimento" onChange={this.onChange.bind(this)} id="dataNascimento" required />
                            </div>

                            <div className="form-group col-md-6">
                                <label for="cidadeId">Cidade</label>
                                <ComboCidade id="cidadeId" onChange={this.onChange.bind(this)} required></ComboCidade>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="cidadeId">Grupo Especial?</label>
                                <ComboPrioridade id="prioridadeId" onChange={this.onChange.bind(this)} required></ComboPrioridade>
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
