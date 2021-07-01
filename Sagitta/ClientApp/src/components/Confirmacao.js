import React, { Component } from 'react';

export class Confirmacao extends Component {
    static displayName = Confirmacao.name;

    render() {
        return (
            <form id="form1" >
                <div id="area1" >
                    <div className="areaForm">
                        <div className="alinhaCentro">
                            <h3 className="espaco">CAIO VOÇÊ PODERÁ SE VACINAR NO DIA:</h3>
                            <h2 className="espaco paTop">14/09/2021</h2>
                            <h4 className="espaco">GOSTARIA DE RECEBER UM E-MAIL LEMBRANDO O DIA?</h4>
                            <a id="nao" className="btn btn-danger botao2" onClick={() => { window.location.href = "/" }}>NÃO</a>
                            <button id="sim" className="btn btn-success botao2">SIM</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}