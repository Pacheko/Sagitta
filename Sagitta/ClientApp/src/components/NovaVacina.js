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

export class VacinaNova {
    constructor() {
        this.id = 0;
        this.nmVacina = "";
        this.qtDoses = "";
    }
}

export class NovaVacina extends Component {
    static displayName = NovaVacina.name;

    constructor(props) {
        super(props);
        this.state = {title: "", vacinaTipo: new VacinaNova(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);
       
    }

    async intialize() {

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response = await fetch('api/tiposvacina/' + id);
            const data = await response.json();
            this.setState({ title: "EDITAR", vacinaTipo: data, loading: false });
        }
        else {
            
            this.state = { title: "CRIAR", vacinaTipo: [""], loading: false };
        }
    }

    handleSalve(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response1 = fetch('api/tiposvacina/' + id, { method: 'PUT', body: data });
            window.location.href = "/vacinascadastradas";
        }
        else {           
            const response2 = fetch('api/tiposvacina/', { method: 'POST', body: data });
            window.location.href = "/vacinascadastradas";
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1 style={{ color: "#fff" }}>{this.state.title}</h1>
                {contents}
            </div>
        );
    }

    renderCreateForm() {
        const { vacinaTipo } = this.state;
        const getID = new GetURL;
        var id = getID.getParameterByName("id");
        if (id > 0) {
            id = id;
        } else {
            id = 0;
        }
        return (
            <div>
            <h3 className="espaco texto">+ NOVO TIPO DE VACINA</h3>
                <form className="areaForm areaform2" onSubmit={this.handleSalve}>
                {vacinaTipo.map(p => (
                    <div className="areaCadastro">
                        
                        <input type="hidden" name="id" defaultValue={ id } />
                        <div className="form-group">
                            <div className="form-group col-md-6">
                                <label for="nome">NOME</label>
                                <input type="text" name="nmVacina" defaultValue={p.nmVacina} required className="form-control" id="nmVacina" placeholder="Nome" required autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="doses">QTD DOSES</label>
                                <input type="number" min="1" name="qtDoses" defaultValue={p.qtDoses} className="form-control" id="qtDoses" placeholder="Qtd doses" required autoComplete="off" />
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
