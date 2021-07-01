import React, { Component } from 'react';


export class Cadastro extends Component {
    static displayName = Cadastro.name;

    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value.replace(/[^\d]/g, "") });
    }

    render() {
        return (
            <form id="form1" className="areaForm">
                <div className="alinhaCentro">
                    <h2 className="espaco">teste página 2</h2>
                    <input type="text" className="form-control" value={this.state.value} maxLength="3" onChange={this.handleChange} id="idade" placeHolder="Idade" />
                    <input type="text" maxLength="14" onKeyDown="javascript: fMasc( this, mCPF );" className="form-control" id="cpf" placeHolder="Cpf" />
                </div>
            </form>
        );
    }
}