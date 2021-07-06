import React, { Component } from 'react';

export class TipoVacina {
    constructor() {
        this.id = [];
        this.nmVacina = [];
        this.qtDoses = [];
    }
}

export class NovaVacina extends Component {
    static displayName = NovaVacina.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tipoVacina: new TipoVacina()
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
        const response2 = fetch('api/tiposvacina/', { method: 'POST', body: data });
        window.location.href = "/vacinascadastradas";
    }


    render() {
        return (
            <div>
                <h3 className="espaco texto">+ NOVO TIPO DE VACINA</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalvar.bind(this)}>
                    <div className="areaCadastro">
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nome">NOME</label>
                                <input type="text" name="nmVacina" onChange={this.onChange.bind(this)} className="form-control" id="nmVacina" placeholder="Nome" required autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="doses">QTD DOSES</label>
                                <input type="number" min="1" name="qtDoses" onChange={this.onChange.bind(this)} className="form-control" id="qtDoses" placeholder="Qtd doses" required autoComplete="off" />
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
