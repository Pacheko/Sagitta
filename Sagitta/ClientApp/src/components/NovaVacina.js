import React, { Component } from 'react';

//export class TipoVacina {
//    constructor() {
//        this.id = 0;
//        this.nmVacina = [];
//        this.qtDoses = [];
//    }
//}
var contador = 0;
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

export class NovaVacina extends Component {
    static displayName = NovaVacina.name;

    constructor(props) {
        super(props);
        this.state = { tipoVacina: []}

        
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount() {
        this.intialize();
    }

    async intialize() {
    
        const getID = new GetURL;
        const id = getID.getParameterByName("id");


        if (id > 0) {
            const response = await fetch('api/tiposvacina/' + id);
            const data = await response.json();
            this.setState({ tipoVacina: data });
        }
        else {

            this.state = {tipoVacina: [ "",  ""] };
        }

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

                            {this.state.tipoVacina.map(p =>
                                <div className="form-group">
                                    <div className="form-group col-md-6">
                                        <label for="nome">NOME</label>
                                        <input type="text" name="nmVacina" onChange={this.onChange.bind(this)} value={p.nmVacina} className="form-control" id="nmVacina" placeholder="Nome" required autoComplete="off" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="doses">QTD DOSES</label>
                                        <input type="number" min="1" name="qtDoses" onChange={this.onChange.bind(this)} value={p.qtDoses} className="form-control" id="qtDoses" placeholder="Qtd doses" required autoComplete="off" />
                                    </div>
                                </div>
                            )}
                            <div className="form-group col-md-12 botaoAlinhar" align="center">
                                <button id="botaoSalvar" type="submit" className="btn btn-light botao">SALVAR</button>
                            </div>

                        </div>
                    </form >
                </div>
            );
       

        
    }

    

}
