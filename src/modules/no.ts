import { Composite } from "./composite";

export class No extends Composite {

    no = new Array();
    palavra: string;
    acao: string;

    constructor(palavra: string, acao: string) {
        super();
        this.palavra = palavra.toUpperCase();
        this.acao = acao.toUpperCase();
    }

    public mensagem(obj: string) {
        this.texto = obj.toUpperCase();
        if ((obj.search(this.palavra) == -1)) {
            for (let x of this.no) {
                let composite: Composite = <Composite>x;
                composite.mensagem(obj);
            }
        } else {
            console.log("Exculta acao nó: " + this.acao);
            for (let x of this.no) {
                let composite: Composite = <Composite>x;
                composite.mensagem(this.texto);
            }
        }
    }

    public add(composite: Composite) {
        this.no.push(composite);
        return this.no;
    };
}