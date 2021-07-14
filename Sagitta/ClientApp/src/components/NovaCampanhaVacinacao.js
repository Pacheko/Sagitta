import React, { Component } from 'react';
import ComboCidade from './ComboCidade';
import ComboPrioridade from './ComboPrioridade';
import ComboTipoVacina from './ComboTipoVacina';

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

export class CampanhaNova {
    constructor() {
        this.id = 0;
        this.dataInicial = "";
        this.idadeMinima = 0;
        this.prioridadeId = 0;
        this.cidadeId = 0;
        this.tipoVacinaId = 0;
    }
}

export class NovaCampanhaVacinacao extends Component {
    static displayName = NovaCampanhaVacinacao.name;

    constructor(props) {
        super(props);
        this.state = { title: "", novaCampanha: new CampanhaNova(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);

    }

    async intialize() {

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response = await fetch('api/campanhadevacinacao/' + id);
            const data = await response.json();
            this.setState({ title: "EDITAR", novaCampanha: data, loading: false });
        }
        else {

            this.state = { title: "NOVA", novaCampanha: [""], loading: false };
        }
    }

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response1 = fetch('api/campanhadevacinacao/' + id, { method: 'PUT', body: data });
            window.location.href = "/campanhasCadastradas";
        }
        else {
            const response2 = fetch('api/campanhadevacinacao/', { method: 'POST', body: data });
            window.location.href = "/campanhasCadastradas";
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                {contents}
            </div>
        );
    }

    renderCreateForm() {
        const { novaCampanha } = this.state;
        const getID = new GetURL;
        var id = getID.getParameterByName("id");
        if (id > 0) {
            id = id;
        } else {
            id = 0;
        }
        return (
            <div>
                <h3 className="espaco texto">+ {this.state.title} CAMPANHA DE VACINAÇÃO</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalve}>
                    {novaCampanha.map(p => (
                        <div className="areaCadastro">

                            <input type="hidden" name="id" defaultValue={id} />
                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="dataInicial">DATA INICIAL</label>
                                    <input type="date" className="form-control" name="dataInicial" value={p.dataInicial} defaultValue={p.dataInicial} id="dataInicial" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="idadeMinima">IDADE MINIMA</label>
                                    <input type="number" className="form-control" max="130" name="idadeMinima" defaultValue={p.idadeMinima} id="idadeMinima" placeholder="Idade minima" autoComplete="off" />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="cidadeId">Cidade</label>
                                    <ComboCidade id="cidadeId" defaultValue={p.cidadeId}></ComboCidade>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="cidadeId">Grupo Especial?</label>
                                    <ComboPrioridade id="prioridadeId" defaultValue={p.prioridadeId}></ComboPrioridade>
                                </div>                               
                            </div>

                            <div className="form-group">
                                <div className="form-group col-md-6">
                                    <label for="tipoVacinaId">Vacina</label>
                                    <ComboTipoVacina id="tipoVacinaId" defaultValue={p.tipoVacinaId}></ComboTipoVacina>
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

