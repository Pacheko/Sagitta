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
        this.state = { title: "", admNovo: new NovoAdm(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);

    }

    async intialize() {
             
        this.state = { title: "LOGIN", admNovo: [""], loading: false };
        
    }

    handleSalve(event) {
        event.preventDefault();

        const data2 = new FormData(event.target);

        this.teste(data2);

        fetch('api/tiposvacina/' + id, { method: 'POST', body: data2 })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    admNovo: res
                });
            });

        //const response = fetch('api/administradores/login');
        //const data = response.json();
        //this.setState({ title: "", admNovo: data, loading: false });

        
        
    }

    handleSalve(login, senha) {

        const response =  fetch('api/administradores/login' + login);
        const data =  response.json();
        this.setState({ title: "", admNovo: data, loading: false });

        const { admNovo } = this.state;

        if (admNovo.id > 0) {
            sessionStorage.setItem("login", "true");
            window.location.href = "/sistema";
        } else {
            Swal.fire('Usuário ou Senha inválidos!')
        } 

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
                
                <form id="form1" class="areaForm">
                    {admNovo.map(p => (

                    <div className="alinhaCentro login">
                        <div className="form-group">
                            <label for="login">Usuário</label>
                            <input type="text" className="form-control" name="Login" defaultValue={p.login} id="login" placeholder="Usuário" required />
                        </div>
                        <div className="form-group">
                            <label for="senha">Senha</label>
                            <input type="password" className="form-control" name="Senha" defaultValue={p.senha} id="senha" placeholder="Senha" />
                        </div>
                            <button id="botaoLogin" type="submit" style={{ marginTop: "15px" }} onClick={(id, nome) => this.handleSalve(p.id, p.nmVacina)} className="btn btn-primary botao">LOGIN</button>           
                    </div>
   
                    ))}
                </form>
            </div>
        );
    }

}

