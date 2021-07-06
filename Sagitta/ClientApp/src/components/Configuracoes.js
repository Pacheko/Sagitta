import React, { Component } from 'react';

export class Configuracoes extends Component {
	static displayName = Configuracoes.name;

	validar() {
		if (sessionStorage.getItem("login") !== "true") {
			window.location.href = "/loginMedicenter";
		}
	}

	render() {
		return (
			<div onLoad={this.validar()}>
				<div className="areaflex">
					<div className="areatotal">

						<div id="divCidade" className="cards" >
							<a onClick={() => { window.location.href = "/cadastroCidade" }} className="linkAcesso">
								<div className="area1">
									<div className="">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building icone" viewBox="0 0 16 16">
											<path fill-Rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
											<path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
										</svg>
									</div>
									<div className="">+ NOVA CIDADE</div>
								</div>
							</a>
						</div>

						<div id="divGrupoEspecial" className="cards" >
							<a onClick={() => { window.location.href = "/grupoEspecial" }} className="linkAcesso">
								<div className="area1">
									<div className="">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill icone" viewBox="0 0 16 16">
											<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
										</svg>
									</div>
									<div className="">+ NOVO GRUPO ESPECIAL</div>
								</div>
							</a>
						</div>

						<div id="divUSER" className="cards" >
							<a onClick={() => { window.location.href = "/novoUsuario" }} className="linkAcesso">
								<div className="area1">
									<div className="">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-person icone" viewBox="0 0 16 16">
											<path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
											<path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
										</svg>
									</div>
									<div className="">+ NOVO USU&Aacute;RIO</div>
								</div>
							</a>
						</div>


					</div>
				</div>
			</div>
		);
	}
}

