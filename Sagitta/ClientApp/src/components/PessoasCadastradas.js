import React, { Component } from 'react';

export class PessoasCadastradas extends Component {
    static displayName = PessoasCadastradas.name;

    constructor(props) {
        super(props);
        this.state = { pessoas: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(pessoas) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(p =>
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.cpf}</td>
                            <td>{p.idade}</td>
                            <td>{p.sexo}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : PessoasCadastradas.renderForecastsTable(this.state.pessoas);

        return (
            <div>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Pessoas Cadastradas</h1>
                <p style={{ color: "white" }}>Pessoas que se cadastraram diretamente no site.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        //const response = await fetch('weatherforecast');
        const response = await fetch('pessoa');
        const data = await response.json();
        this.setState({ pessoas: data, loading: false });
    }
}
