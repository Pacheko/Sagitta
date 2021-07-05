import React, { Component } from 'react';


export class NovaVacina extends Component {
    static displayName = NovaVacina.name;

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSalvar(event) {
        event.preventDefault();

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
                                <input type="text" name="nome" onChange={this.onChange.bind(this)} className="form-control" id="nome" placeholder="Nome" required autoComplete="off" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="doses">QTD DOSES</label>
                                <input type="number" min="0" name="doses" onChange={this.onChange.bind(this)} className="form-control" id="doses" placeholder="Qtd doses" required autoComplete="off" />
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
