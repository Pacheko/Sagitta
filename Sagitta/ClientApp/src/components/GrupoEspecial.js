import React, { Component } from 'react';

export class NovoGrupo {
    constructor() {
        this.id = [];
        this.nmCidade = [];
        this.siglaUf = [];
        
    }
}

export class GrupoEspecial extends Component {
    static displayName = GrupoEspecial.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            novoGrupo: new NovoGrupo()
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
                <h3 className="espaco texto">+ NOVO GRUPO ESPECIAL</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalvar.bind(this)}>
                    <div className="areaCadastro">
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nmGrupo">NOME DO GRUPO</label>
                                <input type="text" name="nmGrupo" onChange={this.onChange.bind(this)} className="form-control" id="nmGrupo" placeholder="Nome do grupo" required autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="isComorbidade">É COMORBIDADE</label>
                                <select className="form-control" id="isComorbidade" name="isComorbidade" onChange={this.onChange.bind(this)}>
                                    <option selected>Escolha</option>
                                    <option value="0">NÃO</option>
                                    <option value="1">SIM</option>
                                </select>
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
