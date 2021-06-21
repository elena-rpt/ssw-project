import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KvaasService } from '../../kvaas.service';
import { Postit } from '../postit-list.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {
  @Input() postit: Array<Postit>;
  @Input() chiave : string;
  @Input() service : KvaasService;
  // riferimento a un elemento del DOM identificato da una template reference variable
  @ViewChild('title') titolo; 
  // EventEmitter che informa il componente parent di una modifica dell'array di postit a seguito di una cancellazione
  @Output() deletionEvent = new EventEmitter<Array<Postit>>();
  constructor() {}

  ngOnInit() {}

  async deletePostit(title : string) {
    // controllo se l'elemento è presente
    if (this.postit.some(el => el.titolo === title)) {
      // elimino il postit dal titolo indicato dall'array
      let copy = this.postit;
      this.postit = this.postit.filter(el => el.titolo !== title);
      try {
        await this.service.putData(this.chiave, this.postit);
      } catch(error) {
        alert('Operazione fallita,riprova più tardi');
        this.postit = copy;
        return;
      }
      this.deletionEvent.emit(this.postit);
    }
    // ripulisco il form
    this.titolo.nativeElement.value="";
  }
}