import React, { Component } from 'react';

export default class ComboPrioridade extends Component {
    static displayName = "";

    constructor(props) {
        super(props);
        this.state = {
            prioridades: [],
            componenteId: props.id
        }
    }

    componentWillMount() {
        this.popularPrioridades();
    }

    render() {
        return (
            <div>
                <select className="form-control" id={this.state.componenteId} name={this.state.componenteId}>
                    <option selected key={-1}>Sem Prioridade</option>
                    {this.renderOption()}
                </select>
            </div >
        );
    }

    renderOption() {
        return this.state.prioridades.map(resp => {
            return <option key={resp.id} value={resp.id}>{resp.nmGrupo}</option>
        });
    }

    async popularPrioridades() {
        const response = await fetch('api/prioridade');
        const data = await response.json();
        this.setState({ prioridades: data });
    }
}
