
import React, { Component } from 'react';

export class GetURL {
    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

export class Pessoa {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.idade = "";
        this.idadeMinima = "";
        this.email = "";
        this.dataInicial = "";
        this.dataHoje = "";
        this.dataInicialCompleta = "";
        this.dataHojeCompleta = "";
    }
}

export class Confirmacao extends Component {
    static displayName = Confirmacao.name;

    constructor(props) {
        super(props);
        this.state = { title: "", pessoaget: new Pessoa(), loading: true };
        this.intialize();

    }

    async intialize() {

        const getID = new GetURL;
        const id = getID.getParameterByName("id");

        if (id > 0) {
            const response = await fetch('api/pessoa/' + id);
            const data = await response.json();
            this.setState({ title: "EDITAR", pessoaget: data, loading: false });
        }
        else {

            this.state = { title: "NOVO", pessoaget: [""], loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                {contents}
            </div>
        );
    }

    static handleEdit(id, email) {
        fetch('api/pessoa/' + id, { method: 'PUT' })
            .then(json => {

                Swal.fire({
                    title: 'TUDO PRONTO',
                    text: "VOÇÊ RECEBERÁ UM EMAIL EM: " + email + " QUANDO CHEGAR SUA VEZ!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/";
                    }
                })

            });

    }

    renderCreateForm() {
        const { pessoaget } = this.state;
        const getID = new GetURL;
        var id = getID.getParameterByName("id");
        if (id > 0) {
            id = id;
        } else {
            id = 0;
        }
        return (
            <div>               
                <form className="areaForm areaform2">
                    {pessoaget.map(p => (
                        <div id="area1" >
                            <div className="areaForm">
                                <div className="alinhaCentro">
                                    
                                    {(p.idadeMinima < p.idade & p.dataInicialCompleta < p.dataHojeCompleta ?
                                        <div>
                                            <div style={{ display: "none" }}>{p.email}</div>
                                            <h2 className="espaco paTop">{p.nome} VOÇÊ JÁ PODE SE VACINAR</h2>
                                            <h2 className="espaco paTop">SEU DIA É HOJE</h2>
                                        </div>
                                        : <div>  
                                            <h2 className="espaco paTop">{p.nome} VOÇÊ AINDA NÃO PODE SE VACINAR</h2>
                                            {(p.idadeMinima < p.idade & p.dataInicialCompleta > p.dataHojeCompleta ?
                                                <div>
                                                    <h2 className="espaco paTop">SEU DIA É {p.dataInicial}</h2>
                                                    <h4 className="espaco">GOSTARIA DE RECEBER UM E-MAIL LEMBRANDO O DIA? </h4>
                                                    <a id="nao" className="btn btn-danger botao2" onClick={() => { window.location.href = "/" }}>NÃO</a>
                                                    <button id="sim" className="btn btn-success botao2" onClick={(id) => this.handleDelete(p.id, p.nmVacina)}>SIM</button>
                                                </div>
                                                : <div>
                                                    <h2 className="espaco paTop">FIQUE TRANQUILO SEU DIA ESTÁ PERTO</h2>
                                                    <h4 className="espaco">GOSTARIA DE RECEBER UM E-MAIL LEMBRANDO O DIA? </h4>
                                                    <a id="nao" className="btn btn-danger botao2" onClick={() => { window.location.href = "/" }}>NÃO</a>
                                                    <button id="sim" className="btn btn-success botao2" onClick={(id, email) => this.handleEdit(p.id, p.email)}>SIM</button>
                                                </div>
                                            )}
                                            
                                          </div>
                                    )}
                                    
                                    
                                </div>
                            </div>
                        </div>

                    ))}    
                </form>
            </div>
        );
    }

}

