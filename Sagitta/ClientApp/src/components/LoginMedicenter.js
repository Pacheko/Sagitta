import React, { Component } from 'react';
import Swal from 'sweetalert2'

export class NovoAdm {
    constructor() {
        this.id = 0;
        this.login = "";
        this.senha = "";
    }
}

export class LoginMedicenter extends Component {
    static displayName = LoginMedicenter.name;

    constructor(props) {
        super(props);
        this.state = { title: "", admNovo: new NovoAdm(), loading: true, resultado:[] };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);

    }

    async intialize() {
             
        this.state = { title: "LOGIN", admNovo: [""], loading: false };
        
    }

    
    handleSalve(event) {

        event.preventDefault();

        const data = new FormData(event.target);

        fetch('api/administradores/login', { method: 'POST', body: data })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    resultado: res
                });
                const { resultado } = this.state;
                var id = resultado.map((resultado) => resultado.id);
                if (id > 0) {
                    sessionStorage.setItem("login", "true");
                    window.location.href = "/sistema";
                } else {
                    Swal.fire('Usuário ou Senha inválidos!')
                } 
            });
        
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h3 className="alinhaCentro" style={{ marginTop: "35px" }}>{this.state.title}</h3>
                {contents}
            </div>
        );
    }

    renderCreateForm() {
        const { admNovo } = this.state;
        
        return (
            <div>

                <form id="form1" className="areaForm" onSubmit={this.handleSalve}>
                    {admNovo.map(p => (

                    <div className="alinhaCentro login">
                        <div className="form-group">
                            <label htmlFor="login">Usuário</label>
                            <input type="text" className="form-control" name="Login" defaultValue={p.login} id="login" placeholder="Usuário" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" className="form-control" name="Senha" defaultValue={p.senha} id="senha" placeholder="Senha" required />
                        </div>
                            <button id="botaoLogin" type="submit" style={{ marginTop: "15px" }} className="btn btn-primary botao">LOGIN</button>           
                    </div>
   
                    ))}
                </form>
            </div>
        );
    }

}

