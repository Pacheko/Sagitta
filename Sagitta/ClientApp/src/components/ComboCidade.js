import React, { Component } from 'react';

export default class ComboCidade extends Component {
    static displayName = "";

    constructor(props) {
        super(props);
        this.state = {
            cidades: [],
            componenteId: props.id
        }
    }

    componentWillMount() {
        this.popularCidades();
    }

    render() {
        return (
            
                <select className="form-control" id={this.state.componenteId} name={this.state.componenteId}>                   
                    {this.renderOption()}
                </select>
            
        );
    }

    renderOption() {
        return this.state.cidades.map(resp => {
            return <option key={resp.id} value={resp.id}>{resp.nmCidade}</option>
        });
    }

    async popularCidades() {
        const response = await fetch('api/cidade');
        const data = await response.json();
        this.setState({ cidades: data });
    }
}
