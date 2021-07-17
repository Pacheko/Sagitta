import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class AdmCadastrados extends Component {
    static displayName = "Adm Cadastrados";

    constructor(props) {
        super(props);
        this.state = { admCad: [], loading: true };
    }

    validar() {
        if (sessionStorage.getItem("login") !== "true") {
            window.location.href = "/loginMedicenter";
        }
    }

    componentDidMount() {
        this.popularTipos();
    }

    static handleEditar(id) {
        if (id == 1) {
            Swal.fire('Não é possivel editar o usuário Master!')
        } else {
            window.location.href = "/novoUsuario/edit?id=" + id
        }
    }

    static handleDelete(id, nome) {
        if (id == 1) {
            Swal.fire('Não é possivel deletar o usuário Master!')
        } else {
            Swal.fire({
                title: 'Você deseja deletar o usuário : ' + nome + '?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SIM',
                cancelButtonText: 'NÃO'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('api/administradores/' + id, { method: 'delete' })
                        .then(json => {
                            Swal.fire({ icon: 'success', title: 'Deletado com sucesso!', showConfirmButton: false });
                            window.location.href = "admCadastrados";
                        })
                }
            })
        }
  
    }

    static renderTabela(adm) {
        return (
            <div className="table-responsive">
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Login</th>
                            <th>Senha</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adm.map(p =>
                            <tr key={p.id}>
                                <td>{p.login}</td>
                                <td>{p.senha}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => this.handleEditar(p.id)}>Editar</button> &nbsp;
                                    <button className="btn btn-danger" onClick={(id, nome) => this.handleDelete(p.id, p.login)}>Deletar</button>
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
            : AdmCadastrados.renderTabela(this.state.admCad);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Usuários</h1>
                <p style={{ color: "white" }}>Usuários cadastrados no sistema.</p>
                <a id="botaoNovo" style={{ marginBottom: "15px" }} className="btn btn-primary botao" onClick={() => { window.location.href = "/novoUsuario" }}>+ NOVO USUÁRIO</a>
                {contents}
            </div>
        );
    }

    async popularTipos() {
        const response = await fetch('api/administradores');
        const data = await response.json();
        this.setState({ admCad: data, loading: false });
    }
}
