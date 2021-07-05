import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

  render () {
      return (
          <div>
              <form id="form1" class="areaForm">
                <div className="alinhaCentro">
                    <h2 className="espaco">QUANDO POSSO ME VACINAR??</h2>
                    <h3 className="espaco">CLIQUE ABAIXO PARA VERIFICAR</h3>
                    <a id="botaoInicio" className="btn btn-primary botao" onClick={() => { window.location.href = "/cadastro" }}>VERIFICAR</a>
                </div>
            </form>
        </div>
    );
  }
}
