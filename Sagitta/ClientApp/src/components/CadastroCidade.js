import React, { Component } from 'react';

export class GetURL {
    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

export class NovaCidade {
    constructor() {
        this.id = 0;
        this.nmCidade = "";
        this.siglaUf = "";
        this.nmUf = "";
    }
}

export class CadastroCidade extends Component {
    static displayName = CadastroCidade.name;

    constructor(props) {
        super(props);
        this.state = { title: "", cidadeNova: new NovaCidade(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);

    }

    validar() {
        if (sessionStorage.getItem("login") !== "true") {
            window.location.href = "/loginMedicenter";
        }
    }

    async intialize() {

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response = await fetch('api/cidade/' + id);
            const data = await response.json();
            this.setState({ title: "EDITAR", cidadeNova: data, loading: false });
        }
        else {

            this.state = { title: "CRIAR", cidadeNova: [""], loading: false };
        }
    }

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response1 = fetch('api/cidade/' + id, { method: 'PUT', body: data });
            window.location.href = "/cidadesCadastradas";
        }
        else {
            const response2 = fetch('api/cidade/', { method: 'POST', body: data });
            window.location.href = "/cidadesCadastradas";
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div onLoad={this.validar()}>
                <h1 style={{ color: "#fff" }}>{this.state.title}</h1>
                {contents}
            </div>
        );
    }

    renderCreateForm() {
        const { cidadeNova } = this.state;
        const getID = new GetURL;
        var id = getID.getParameterByName("id");
        if (id > 0) {
            id = id;
        } else {
            id = 0;
        }
        return (
            <div>
                <h3 className="espaco texto">+ NOVA CIDADE</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalve}>
                    {cidadeNova.map(p => (
                        <div className="areaCadastro">

                            <input type="hidden" name="id" defaultValue={id} />
                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="nmCidade">NOME CIDADE</label>
                                    <input type="text" name="nmCidade" defaultValue={p.nmCidade} required className="form-control" id="nmCidade" placeholder="Nome Cidade" required autoComplete="off" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="siglaUf">UF</label>
                                    <input type="text" min="1" name="siglaUf" defaultValue={p.siglaUf} className="form-control" id="siglaUf" placeholder="Uf" required autoComplete="off" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="nmUf">NOME ESTADO</label>
                                    <input type="text" name="nmUf" defaultValue={p.nmUf} required className="form-control" id="nmUf" placeholder="Nome estado" required autoComplete="off" />
                                </div>                               
                            </div>

                            <div className="form-group col-md-12 botaoAlinhar" align="center">
                                <button type="submit" className="btn btn-light botao" value={p.id}>Salvar</button>
                            </div>

                        </div>
                    ))}
                </form>
            </div>
        );
    }

}

