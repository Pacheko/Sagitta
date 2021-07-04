import React, { Component } from 'react';

export class VacinasCadastradas extends Component {
    static displayName = "Vacinas Cadastradas";

    constructor(props) {
        super(props);
        this.state = { tiposVacina: [], loading: true };
    }

    componentDidMount() {
        this.popularTipos();
    }

    static handleEdit(id) {
        window.location.href = "/produto/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar a vacina : " + id + "?")) {
            return;
        }
        else {
            fetch('api/produtos/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-produto";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderTabela(tiposVacina) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade Doses</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tiposVacina.map(p =>
                        <tr key={p.id}>
                            <td>{p.nmVacina}</td>
                            <td>{p.qtDoses}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(p.nmVacina)}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(p.nmVacina)}>Deletar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : VacinasCadastradas.renderTabela(this.state.tiposVacina);

        return (
            <div>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Tipos de Vacina</h1>
                <p style={{ color: "white" }}>Vacinas cadastradas no sistema.</p>
                {contents}
            </div>
        );
    }

    async popularTipos() {
        const response = await fetch('tiposvacina');
        const data = await response.json();
        this.setState({ tiposVacina: data, loading: false });
    }
}
