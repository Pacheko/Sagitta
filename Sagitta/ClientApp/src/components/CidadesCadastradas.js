import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class CidadesCadastradas extends Component {
    static displayName = "Cidades Cadastradas";

    constructor(props) {
        super(props);
        this.state = { listaCidade: [], loading: true };
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
            title: 'Você deseja deletar a cidade : ' + nome + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SIM',
            cancelButtonText: 'NÃO'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('api/cidade/' + id, { method: 'delete' })
                    .then(json => {
                        Swal.fire({ icon: 'success', title: 'Deletado com sucesso!', showConfirmButton: false });
                        window.location.href = "cidadesCadastradas";
                    })
            }
        })


    }

    static renderTabela(lista) {
        return (
            <div className="table-responsive">
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Cidade</th>
                            <th>Uf</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(p =>
                            <tr key={p.id}>
                                <td>{p.nmCidade}</td>
                                <td>{p.siglaUf}</td>
                                <td>{p.nmUf}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => { window.location.href = "/cadastroCidade/edit?id=" + p.id }}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id, nome) => this.handleDelete(p.id, p.nmCidade)}>Deletar</button>
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
            : CidadesCadastradas.renderTabela(this.state.listaCidade);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Cidades</h1>
                <p style={{ color: "white" }}>Cidades cadastradas no sistema.</p>
                <a id="botaoNovo" style={{ marginBottom: "15px" }} className="btn btn-primary botao" onClick={() => { window.location.href = "/cadastroCidade" }}>+ NOVA CIDADE</a>
                {contents}
            </div>
        );
    }

    async popularTipos() {
        const response = await fetch('api/cidade');
        const data = await response.json();
        this.setState({ listaCidade: data, loading: false });
    }
}
