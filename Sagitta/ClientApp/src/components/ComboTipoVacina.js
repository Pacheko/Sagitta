import React, { Component } from 'react';

export default class ComboTipoVacina extends Component {
    static displayName = "";

    constructor(props) {
        super(props);
        this.state = {
            vacinas: [],
            componenteId: props.id
        }
    }

    componentWillMount() {
        this.popularVacinas();
    }

    render() {
        return (

            <select className="form-control" id={this.state.componenteId} name={this.state.componenteId}>               
                {this.renderOption()}
            </select>

        );
    }

    renderOption() {
        return this.state.vacinas.map(resp => {
            return <option key={resp.id} value={resp.id}>{resp.nmVacina}</option>
        });
    }

    async popularVacinas() {
        const response = await fetch('api/tiposvacina');
        const data = await response.json();
        this.setState({ vacinas: data });
    }
}
