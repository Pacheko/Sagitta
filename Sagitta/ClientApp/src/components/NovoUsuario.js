import React, { Component } from 'react';

export class NovoUsuario extends Component {
    static displayName = NovoUsuario.name;

    validar() {
        if (sessionStorage.getItem("login") !== "true") {
            window.location.href = "/loginMedicenter";
        }
    }

    render() {
        return (
            <div onLoad={this.validar()}>
                <h2 className="alinhaCentro" style={{ marginTop: "35px" }}>+ NOVO USUÁRIO</h2>
                <form id="form1" class="areaForm">
                    <div className="alinhaCentro login">
                        <div className="form-group">
                            <label for="usuario">Usuário</label>
                            <input type="email" className="form-control" name="usuario" id="usuario" placeholder="Usuário" required />
                        </div>
                        <div className="form-group">
                            <label for="senha">Senha</label>
                            <input type="password" className="form-control" name="senha" id="senha" placeholder="Senha" required />
                        </div>
                        <button id="botaoInicio" type="submit" style={{ marginTop: "15px" }} className="btn btn-primary botao">SALVAR</button>
                    </div>
                </form>
            </div>
        );
    }
}