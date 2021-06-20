import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { KvaasService } from '../../kvaas.service';
import { Postit } from '../postit-list.component';

@Component({ 
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  @Input() postit : Array<Postit>;
  @Input() chiave : string;
  @Input() service : KvaasService;
  // riferimenti ad elementi del DOM identificati da una template reference variable
  @ViewChild('title') titolo; 
  @ViewChild('content') contenuto; 
  @ViewChild('important') checkbox; 
  constructor() { }

  ngOnInit() {}

  async createPostit(title : string, content : string, important : boolean){
    // impedisco che vengano creati più postit con lo stesso titolo
    if (this.postit.some(el => el.titolo === title)) {
      alert("Esiste già un postit con questo titolo!");
      return;
    }
    // ripulisco il form
    this.titolo.nativeElement.value="";
    this.contenuto.nativeElement.value="Scrivi il contenuto";
    this.checkbox.nativeElement.checked=false;
    let newP = new Postit();
    newP.titolo = title;
    newP.contenuto = content;
    if(important) newP.importante = true;
    this.postit.push(newP);
    try {
      await this.service.putData(this.chiave, this.postit);
    } catch(error) {
      alert('Operazione fallita, riprova più tardi');
      this.postit.pop();
    }
  }

  clean(){
    if(this.contenuto.nativeElement.value==="Scrivi il contenuto")
      this.contenuto.nativeElement.value="";
  }
}