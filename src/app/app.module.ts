import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PostitListComponent } from './postit-list/postit-list.component';
import { CreateComponent } from './postit-list/create/create.component';
import { KvaasService } from './kvaas.service';
import { DeleteComponent } from './postit-list/delete/delete.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, PostitListComponent,  CreateComponent, DeleteComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ KvaasService ]
})
export class AppModule { }
