import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class LoginMedicenter extends Component {
    static displayName = LoginMedicenter.name;
    
    handleVerificar(event) {
        event.preventDefault();

        if (1 == 1) {
            sessionStorage.setItem("login", "true");
            window.location.href = "/sistema";
        } else {
            Swal.fire('Usuário ou Senha inválidos!')
        }
    }

    render() {
        return (
            <div>
                <h2 className="alinhaCentro" style={{ marginTop: "35px" }}>LOGIN</h2>
                <form id="form1" class="areaForm" onSubmit={this.handleVerificar.bind(this)}>              
                    <div className="alinhaCentro login">
                        <div className="form-group">
                            <label for="usuario">Usuário</label>
                            <input type="email" className="form-control" name="usuario" id="usuario" placeholder="Usuário" />
                        </div>
                        <div className="form-group">
                            <label for="senha">Senha</label>
                            <input type="password" className="form-control" name="senha" id="senha" placeholder="Senha" />
                        </div>
                        <button id="botaoLogin" type="submit" style={{ marginTop: "15px" }} className="btn btn-primary botao">LOGIN</button>           
                    </div>
                </form>
            </div>
        );
    }
}