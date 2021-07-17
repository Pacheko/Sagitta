import React, { Component } from 'react';

export class PessoasNaoAptasVacinar extends Component {
    static displayName = PessoasNaoAptasVacinar.name;

    constructor(props) {
        super(props);
        this.state = { pessoas: [], loading: true };
    }

    validar() {
        if (sessionStorage.getItem("login") !== "true") {
            window.location.href = "/loginMedicenter";
        }
    }

    componentDidMount() {
        this.popularPessoas();
    }

    static renderPT(pessoas) {
        return (
            <div className="table-responsive">
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map(p =>
                            <tr key={p.id}>
                                <td>{p.nome}</td>
                                <td>{p.idade}</td>
                                <td>{p.email}</td>
                                <td>{p.cidade}</td>
                                <td>{p.estado}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : PessoasNaoAptasVacinar.renderPT(this.state.pessoas);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Pessoas que ainda não podem se vacinar</h1>
                <p style={{ color: "white" }}>Pessoas não aptas a tomar a vacina.</p>
                {contents}
            </div>
        );
    }

    async popularPessoas() {
        const response = await fetch('api/pessoasnaoaptas');
        const data = await response.json();
        this.setState({ pessoas: data, loading: false });
    }
}
