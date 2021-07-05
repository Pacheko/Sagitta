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

						<div id="divnovaVacina" className="cards" >
							<a onClick={() => { window.location.href = "/novaVacina" }} className="linkAcesso">
								<div className="area1">
									<div className="">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-plus icone" viewBox="0 0 16 16">
											<path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
											<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
										</svg>
									</div>
									<div className="">+ NOVA VACINA</div>
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

