export abstract class Composite {
    codigo: string = "";
    texto: string;

    public add(composite: Composite) { };

    public abstract mensagem(obj: string);
}