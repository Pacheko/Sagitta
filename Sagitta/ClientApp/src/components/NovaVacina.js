import React, { Component } from 'react';

export class TipoVacina {
    constructor() {
        this.id = 0;
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

        this.intialize();
    }

    async intialize() {
        var id = this.props.match.params["id"];

        const urlParams = new URLSearchParams(this.props.location.pathname);
        const myParam = urlParams.get('id');

        if (id > 0) {
            const response = await fetch('api/tiposvacina/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", tipoVacina: data, loading: false });
        }
        else {

            this.state = { title: "Create", tipoVacina: new TipoVacina(), loading: false };
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
        //window.location.href = "/vacinascadastradas";



        const data = new FormData(event.target);

        if (this.state.tipoVacina.id) {
            const response1 = fetch('api/tiposvacina/' + this.state.produto.id, { method: 'PUT', body: data });
            this.props.history.push('/vacinascadastradas');
        }
        else {
            const response2 = fetch('api/tiposvacina/', { method: 'POST', body: data });
            this.props.history.push('/vacinascadastradas');
        }
    }


    render() {
        return (
            <div>
                <h3 className="espaco texto">+ NOVO TIPO DE VACINA</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalvar.bind(this)}>
                    <div className="areaCadastro">
                        <div className="form-group row">
                            <input type="text" name="id" value={this.state.tipoVacina.id} />
                        </div>
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nome">NOME</label>
                                <input type="text" name="nmVacina" onChange={this.onChange.bind(this)} defaultValue={this.state.tipoVacina.nmVacina} className="form-control" id="nmVacina" placeholder="Nome" required autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="doses">QTD DOSES</label>
                                <input type="number" min="1" name="qtDoses" onChange={this.onChange.bind(this)} defaultValue={this.state.tipoVacina.qtDoses} className="form-control" id="qtDoses" placeholder="Qtd doses" required autoComplete="off" />
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
