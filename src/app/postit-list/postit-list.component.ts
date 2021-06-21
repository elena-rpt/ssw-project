import { Component, Input, OnInit } from '@angular/core';
import { KvaasService } from '../kvaas.service';

export class Postit {
  titolo : string;
  contenuto : string;
  importante : boolean = false;
  selected : boolean = false;
} 

@Component({
  selector: 'app-postit-list',
  templateUrl: './postit-list.component.html',
  styleUrls: ['./postit-list.component.css']
})

export class PostitListComponent implements OnInit {
  @Input() chiave : string;
  @Input() postit : Array<Postit>;
  @Input() service : KvaasService;
  // variabile che indica se devo mostrare tutti i postit o solo quelli importanti
  showAll : boolean = true; 
  // testo del bottone per passare dalla visualizzazione normale a quella dei soli postit importanti e viceversa
  impButton : string = 'Mostra solo importanti'; 

  constructor() { }

  ngOnInit() {}

  showImportant() {
    this.showAll = !(this.showAll);
    this.impButton = this.showAll ? 'Mostra solo importanti' : 'Mostra tutti';
  }

  refreshList(list : Array<Postit>) {
    this.postit = list;
  }

  select(el : Postit){
    el.selected = !(el.selected);
  }
}