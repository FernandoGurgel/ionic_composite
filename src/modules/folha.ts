import { Composite } from "./composite";


export class Folha extends Composite{

	palavra:string;
	acao:string;
	no:string;
	
	constructor(palavra:string, acao:string, no: string) {
        super();
		this.palavra = palavra.toUpperCase();
		this.acao = acao.toUpperCase();
		this.no = no;
	}

	public mensagem(mensagem:string) {
		if (((mensagem.search(this.palavra)) != -1) && mensagem.search(this.no) != -1) {
			console.log("Acao: "+ this.acao);
		}
	}
}
