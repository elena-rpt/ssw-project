import { Injectable } from '@angular/core';
import { Postit } from './postit-list/postit-list.component';

@Injectable({
  providedIn: 'root'
}) 

export class KvaasService {
  baseURL: string = 'https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/kvaas-giwjg/service/kvaas/incoming_webhook';

  constructor() { }

  // funzione che permette di recuperare la lista di postit associata a una chiave
  public getData(key: string) : Promise<Array<Postit>> {
    return fetch(this.baseURL + '/get?key=' + key)
      .then(
        response => {
          if(response.status === 200) return response.json();
          else {
            alert("Chiave inserita non valida");
            return null;
          }
        }, 
        error => {
          throw error;
        })
      .then(
        data => {
          if(data === null) return null;
          if(data === '{}') return [];
          var obj = JSON.parse(data);
          return obj;
      });
  } 

  // funzione che permette di aggiornare la stringa associata a una chiave
  public putData(key: string, list: object) : Promise<string> {
    var msg = JSON.stringify(list);
    return fetch(this.baseURL + '/post?key=' + key + '&msg=' + msg, { method: 'POST' })
      .then(response => response.json()
        .then(data => data))
      .catch(error => {
        throw error;
      })  
  }

  // funzione che permette di ottenere una nuova chiave
  public getKey() : Promise<string> {
    return fetch(this.baseURL + '/new', { method: 'POST' })
      .then(response => response.json()
        .then(key => key) )
      .catch(error => {
        throw error;
      })  
  }
}