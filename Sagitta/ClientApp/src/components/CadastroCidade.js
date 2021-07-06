import React, { Component } from 'react';

export class NovaCidade {
    constructor() {
        this.id = [];
        this.nmCidade = [];
        this.siglaUf = [];
        this.nmUf = [];
    }
}

export class CadastroCidade extends Component {
    static displayName = CadastroCidade.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            novaCidade: new NovaCidade()
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSalvar(event) {
        event.preventDefault();

        //const data = new FormData(event.target);
        //const response2 = fetch('api/tiposvacina/', { method: 'POST', body: data });
        //window.location.href = "/configuracoes";
    }


    render() {
        return (
            <div>
                <h3 className="espaco texto">+ NOVA CIDADE</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalvar.bind(this)}>
                    <div className="areaCadastro">
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nmCidade">NOME DA CIDADE</label>
                                <input type="text" name="nmCidade" onChange={this.onChange.bind(this)} className="form-control" id="nmCidade" placeholder="Nome da cidade" required autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="siglaUf">UF</label>
                                <input type="text" min="1" name="siglaUf" onChange={this.onChange.bind(this)} className="form-control" id="siglaUf" placeholder="Uf" required autoComplete="off" />
                            </div>                          
                        </div>
                        <div className="form-group">                          
                            <div className="form-group col-md-6">
                                <label for="nmUf">NOME DO ESTADO</label>
                                <input type="text" min="1" name="nmUf" onChange={this.onChange.bind(this)} className="form-control" id="nmUf" placeholder="Nome do estado" required autoComplete="off" />
                            </div>
                        </div>

                        <div className="form-group col-md-12 botaoAlinhar" align="center">
                            <button id="botaoSalvar" type="submit" className="btn btn-light botao">SALVAR</button>
                        </div>

                    </div>
                </form >
            </div>
        );
    }

}
