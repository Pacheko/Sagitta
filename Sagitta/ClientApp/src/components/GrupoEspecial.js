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

export class GrupoNovo {
    constructor() {
        this.id = 0;
        this.nmGrupo = "";
        this.isComorbidade = false;
    }
}

export class GrupoEspecial extends Component {
    static displayName = GrupoEspecial.name;

    constructor(props) {
        super(props);
        this.state = { title: "", novoGrupo: new GrupoNovo(), loading: true };
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
            const response = await fetch('api/prioridade/' + id);
            const data = await response.json();
            this.setState({ title: "EDITAR", novoGrupo: data, loading: false });
        }
        else {

            this.state = { title: "NOVO", novoGrupo: [""], loading: false };
        }
    }

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response1 = fetch('api/prioridade/' + id, { method: 'PUT', body: data });
            window.location.href = "/gruposCadastrados";
        }
        else {
            const response2 = fetch('api/prioridade/', { method: 'POST', body: data });
            window.location.href = "/gruposCadastrados";
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
        const { novoGrupo } = this.state;
        const getID = new GetURL;
        var id = getID.getParameterByName("id");
        if (id > 0) {
            id = id;
        } else {
            id = 0;
        }
        return (
            <div>
                <h3 className="espaco texto">+ {this.state.title} GRUPO ESPECIAL</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalve}>
                    {novoGrupo.map(p => (
                        <div className="areaCadastro">

                            <input type="hidden" name="id" defaultValue={id} />
                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="nmGrupo">NOME DO GRUPO</label>
                                    <input type="text" name="nmGrupo" defaultValue={p.nmGrupo} required className="form-control" id="nmGrupo" placeholder="Nome" required autoComplete="off" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="isComorbidade">É COMORBIDADE</label>                                   
                                    <select className="form-control" id="isComorbidade" name="isComorbidade" defaultValue={p.isComorbidade}>                                       
                                        <option value="false">NÃO</option>
                                        <option value="true">SIM</option>
                                    </select>
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

