import { Component } from '@angular/core';
import { KvaasService } from './kvaas.service';
import { Postit } from './postit-list/postit-list.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {
  visible : boolean = false; // variabile che indica se devo visualizzare o meno il componente child
  showLogin : boolean = true; // variabile che indica se devo visualizzare o meno il box di login
  showKey : boolean = false;
  chiave : string = undefined;
  postit : Array<Postit> = [];

  constructor(public service: KvaasService) {}
 
  async getNewKey() {
    try {
      this.chiave = await this.service.getKey();
    } catch(error) {
      alert('Problema di connessione con il server');
      return;
    }
    this.showKey = true;
  }

  async showPostit(key : string) {
    try {
      this.postit = await this.service.getData(key);
    } catch(error) {
      alert('E\' al momento impossibile recuperare i dati');
      return;
    }
    if (this.postit===null) return;
    this.chiave = key;
    this.showLogin = false;
    this.visible = true;
  }
}