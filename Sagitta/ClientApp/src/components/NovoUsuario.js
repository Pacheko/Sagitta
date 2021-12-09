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

export class NovoAdm {
    constructor() {
        this.id = 0;
        this.login = "";
        this.senha = "";       
    }
}

export class NovoUsuario extends Component {
    static displayName = NovoUsuario.name;

    constructor(props) {
        super(props);
        this.state = { title: "", admNovo: new NovoAdm(), loading: true };

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
            const response = await fetch('api/administradores/' + id);
            const data = await response.json();
            this.setState({ title: "EDITAR", admNovo: data, loading: false });
        }
        else {

            this.state = { title: "CRIAR", admNovo: [""], loading: false };
        }
    }

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response1 = fetch('api/administradores/' + id, { method: 'PUT', body: data });
            window.location.href = "/admCadastrados";
        }
        else {
            const response2 = fetch('api/administradores/', { method: 'POST', body: data });
            window.location.href = "/admCadastrados";
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();

        return (
            <div onLoad={this.validar()}>
                {contents}
            </div>
        );
    }

    renderCreateForm() {
        const { admNovo } = this.state;
        const getID = new GetURL;
        var id = getID.getParameterByName("id");
        if (id > 0) {
            id = id;
        } else {
            id = 0;
        }
        return (
            <div>
                <h3 className="espaco texto">+ {this.state.title} USUÁRIO</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalve}>
                    {admNovo.map(p => (
                        <div className="areaCadastro">

                            <input type="hidden" name="id" defaultValue={id} />
                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="Login">LOGIN</label>
                                    <input type="text" name="Login" defaultValue={p.login} required className="form-control" id="Login" placeholder="Login" required autoComplete="off" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="Senha">SENHA</label>
                                    <input type="text" min="1" name="Senha" defaultValue={p.senha} className="form-control" id="Senha" placeholder="Senha" required autoComplete="off" />
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

