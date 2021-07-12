import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class GruposCadastrados extends Component {
    static displayName = "Grupos Cadastrados";

    constructor(props) {
        super(props);
        this.state = { gruposCad: [], loading: true };
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
            title: 'Você deseja deletar o grupo: : ' + nome + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SIM',
            cancelButtonText: 'NÃO'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('api/prioridade/' + id, { method: 'delete' })
                    .then(json => {
                        Swal.fire({ icon: 'success', title: 'Deletado com sucesso!', showConfirmButton: false });
                        window.location.href = "gruposCadastrados";
                    })
            }
        })
      
    }

    static renderTabela(grupos) {
        return (
            <div className="table-responsive">
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>É Comorbidade?</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {grupos.map((p) =>            

                            <tr key={p.id}>
                                <td>{p.nmGrupo}</td>
                                <td>{(p.isComorbidade == 0 ? ('NÃO') : ('SIM') )}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => { window.location.href = "/grupoEspecial/edit?id=" + p.id }}>Editar</button> &nbsp;
                                    <button className="btn btn-danger" onClick={(id, nome) => this.handleDelete(p.id, p.nmGrupo)}>Deletar</button>
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
            : GruposCadastrados.renderTabela(this.state.gruposCad);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Grupos Especiais</h1>
                <p style={{ color: "white" }}>Grupos cadastrados no sistema.</p>
                <a id="botaoNovo" style={{ marginBottom: "15px" }} className="btn btn-primary botao" onClick={() => { window.location.href = "/grupoEspecial" }}>+ NOVO GRUPO</a>
                {contents}
            </div>
        );
    }

    async popularTipos() {
        const response = await fetch('api/prioridade');
        const data = await response.json();
        this.setState({ gruposCad: data, loading: false });
    }
}
