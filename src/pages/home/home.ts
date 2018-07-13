import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Composite } from '../../modules/composite';
import { No } from '../../modules/no';
import { Folha } from '../../modules/folha';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  texte: string;
  private composite: Composite;

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition, private toastCtrl: ToastController) {

    let consulta: No = new No("PROCESSO", "nav > consulta");

    let processo: No = new No("NÚMERO", "pesquisa o processo pelo numero");
    let oab: No = new No("OAB", "pesquisa o processo pelo oab ");
    let parte: No = new No("PARTE", "pesquisa o processo pelo nome");

    let detalhe: Folha = new Folha("DETALHE", "nav > detalhe", "PROCESSO");
    let nome: Folha = new Folha("PARTES", "nav > parte", "PROCESSO");
    let movimentacao: Folha = new Folha("MOVIMENTAÇÃO", "nav > movimentação", "PROCESSO");

    let oab_detalhe: Folha = new Folha("DETALHE", "nav > detalhe", "OAB");
    let oab_nome: Folha = new Folha("PARTES", "nav > parte", "OAB");
    let oab_movimentacao: Folha = new Folha("MOVIMENTAÇÃO", "nav > movimentação", "OAB");

    let parte_detalhe: Folha = new Folha("DETALHE", "nav > detalhe", "PARTE");
    let parte_nome: Folha = new Folha("PARTES", "nav > parte", "PARTE");
    let parte_movimentacao: Folha = new Folha("MOVIMENTAÇÃO", "nav > movimentação", "PARTE");

    processo.add(movimentacao);
    processo.add(detalhe);
    processo.add(parte);

    oab.add(oab_detalhe);
    oab.add(oab_movimentacao);
    oab.add(oab_nome);

    parte.add(parte_movimentacao);
    parte.add(parte_detalhe);
    parte.add(parte_nome);

    consulta.add(processo);
    consulta.add(oab);
    consulta.add(nome);

    this.composite = consulta;
  }

  ngOnInit() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log("Feito"),
              () => console.log("Erro")
            )
        }
      });
  }

  start() {
    console.log(this.composite.mensagem("Processo"));
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          let mens: string = matches[0];
          console.log(mens);
          this.texte = matches[0];
          this.composite.mensagem(mens.toUpperCase());
          this.toastShow(matches[0]);
        },
        (onerror) => console.log('error', onerror)
      );
  }

  toastShow(ob) {
    let toast = this.toastCtrl.create({
      message: ob,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
