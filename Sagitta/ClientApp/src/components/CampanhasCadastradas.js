import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class CampanhasCadastradas extends Component {
    static displayName = "Campanhas Cadastradas";

    constructor(props) {
        super(props);
        this.state = { campanhaCadastrada: [], loading: true };
    }

    validar() {
        if (sessionStorage.getItem("login") !== "true") {
            window.location.href = "/loginMedicenter";
        }
    }

    componentDidMount() {
        this.popularTipos();
    }

    static handleDelete(id, nome) {
        Swal.fire({
            title: 'Você deseja deletar a campanha com idade minima : ' + nome + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SIM',
            cancelButtonText: 'NÃO'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('api/campanhadevacinacao/' + id, { method: 'delete' })
                    .then(json => {
                        Swal.fire({ icon: 'success', title: 'Deletado com sucesso!', showConfirmButton: false });
                        window.location.href = "campanhasCadastradas";
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
                            <th>Data Inicial</th>
                            <th>Idade Minima</th>                          
                            <th>Grupo Especial</th>
                            <th>Cidade</th>
                            <th>Vacina</th>                           
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiposVacina.map(p =>
                            <tr key={p.id}>
                                <td>{p.dataInicial}</td>
                                <td>{p.idadeMinima}</td>
                                <td>{p.prioridadeId}</td>
                                <td>{p.cidadeId}</td>
                                <td>{p.tipoVacinaId}</td>
                                <td>
                                    {/*<button className="btn btn-success" onClick={(id) => { window.location.href = "/novaCampanhaVacinacao/edit?id=" + p.id }}>Editar</button> &nbsp;*/}
                                <button className="btn btn-danger" onClick={(id, nome) => this.handleDelete(p.id, p.idadeMinima)}>Deletar</button>
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
            : CampanhasCadastradas.renderTabela(this.state.campanhaCadastrada);

        return (
            <div onLoad={this.validar()}>
                <h1 id="tabelLabel" style={{ color: "white", marginTop: "10px" }}>Campanhas Cadastradas</h1>
                <p style={{ color: "white" }}>Campanhas cadastradas no sistema.</p>
                <a id="botaoNova" style={{ marginBottom: "15px", width:"215px"}} className="btn btn-primary botao" onClick={() => { window.location.href = "/novaCampanhaVacinacao" }}>+ NOVA CAMPANHA</a>
                {contents}
            </div>
        );
    }

    async popularTipos() {
        const response = await fetch('api/campanhadevacinacao');
        const data = await response.json();
        this.setState({ campanhaCadastrada: data, loading: false });
    }
}
