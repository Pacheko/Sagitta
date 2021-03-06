import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class VacinasCadastradas extends Component {
    static displayName = "Vacinas Cadastradas";

    constructor(props) {
        super(props);
        this.state = { tiposVacina: [], loading: true };
    }

    validar() {
        if (sessionStorage.getItem("login") !== "true") {
            window.location.href = "/loginMedicenter";
        }
    }

    componentDidMount() {
        this.popularTipos();
    }

    //static handleEdit(id) {
    //    window.location.href = "/novaVacina/edit?id=" + id;
    //}

    static handleDelete(id, nome) {
        Swal.fire({
            title: 'Você deseja deletar a vacina : ' + nome + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SIM',
            cancelButtonText: 'NÃO'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('api/tiposvacina/' + id, { method: 'delete' })
                    .then(json => {
                        Swal.fire({ icon: 'success', title: 'Deletado com sucesso!', showConfirmButton: false});
                        window.location.href = "vacinascadastradas";
                    })
            }
        })

    }

    static renderTabela(tiposVacina) {
        return (
            <div className="table-responsive">
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
                                <button className="btn btn-success" onClick={(id) => { window.location.href = "/novaVacina/edit?id=" + p.id }}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id, nome) => this.handleDelete(p.id, p.nmVacina)}>Deletar</button>
                            </td>
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
            : VacinasCadastradas.renderTabela(this.state.tiposVacina);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Tipos de Vacina</h1>
                <p style={{ color: "white" }}>Vacinas cadastradas no sistema.</p>
                <a id="botaoNovaVacina" style={{ marginBottom: "15px" }} className="btn btn-primary botao" onClick={() => { window.location.href = "/novaVacina" }}>+ NOVA VACINA</a>
                {contents}
            </div>
        );
    }

    async popularTipos() {
        const response = await fetch('api/tiposvacina');
        const data = await response.json();
        this.setState({ tiposVacina: data, loading: false });
    }
}
