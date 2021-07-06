import React, { Component } from 'react';

export class PessoasAptasVacinar extends Component {
    static displayName = PessoasAptasVacinar.name;

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
                        <th>Cpf</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Fone</th>
                        <th>Email</th>
                        <th>Data Nascimento</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Grupo Prioritario</th>
                        <th>Foi Notificado?</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(p =>
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.cpf}</td>
                            <td>{p.idade}</td>
                            <td>{p.sexo}</td>
                            <td>{p.fone}</td>
                            <td>{p.email}</td>
                            <td>{p.dataNascimento}</td>
                            <td>{p.cidade}</td>
                            <td>{p.estado}</td>
                            <td>{p.grupo}</td>
                            <td>{p.notificado}</td>
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
            : PessoasAptasVacinar.renderPT(this.state.pessoas);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Pessoas que já podem se vacinar</h1>
                <p style={{ color: "white" }}>Pessoas aptas a tomar a vacina.</p>
                {contents}
            </div>
        );
    }

    async popularPessoas() {
        const response = await fetch('pessoa');
        const data = await response.json();
        this.setState({ pessoas: data, loading: false });
    }
}
