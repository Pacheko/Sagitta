import React, { Component } from 'react';

export class Finalizar extends Component {
    static displayName = Finalizar.name;

    render() {
        return (
            <div id="area2" visible="false">
                <div className="areaForm">
                    <div className="alinhaCentro">
                        <h2 className="espaco">TUDO PRONTO!!</h2>
                        <h4 className="espaco paTop">VOÇÊ RECEBERÁ UM E-MAIL QUANDO CHEGAR A HORA</h4>
                        <a id="voltarInicio" style={{ width: "240px" }} className="btn btn-success botao" onClick={() => { window.location.href = "/" }}>VOLTAR PARA O INÍCIO</a>
                    </div>
                </div>
            </div>
        );
    }
}