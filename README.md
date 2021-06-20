# Progettino per l'esame di Sviluppo dei Servizi web

Il sistema è composto da quattro componenti e da un service.

### KvaaS Service

Questo service gestisce la comunicazione col server KvaaS. In particolare fornisce 3 funzioni, ognuna di queste invoca una *fetch* sull'url opportuno, ottenendo come risultato una Promise. Nel caso la Promise termini con successo nel *then* vengono estratti i dati ricevuti che saranno poi restituiti da una seconda *then* concatenata. Se invece la Promise fallisce l'errore restituito viene sollevato con un *throw*, di modo che il component che invoca la funzione possa decidere come gestirlo all'interno di un try-catch.
1. getKey(): esegue una POST per ottenere una nuova chiave, che restituisce.
2. getData(): prende in input una chiave ed esegue una GET per recuperare la stringa associata a tale chiave. Se lo status della risposta è diverso da 200 vuol dire che la richiesta è fallita, perciò viene notificato che la chiave inserita non è valida e viene restituito null. Se invece non ci sono postit associati alla chiave verrà restituito un array vuoto.
3. putData(): prende in input una chiave e un array di postit, che sarà trasformato in stringa ed associato alla chiave tramite una POST.

### App Component

Questo componente si occupa delle funzionalità di inserimento e richiesta di una chiave. 
Per l'inserimento c'è un box di input dove inserire la propria chiave, quando viene premuto invio viene invocata la funzione showPostit() che prende in input il contenuto del box e effettua una invocazione della funzione getData() del service. Dato che tale invocazione restituisce una Promise la funzione è dichiarata come *async*, e la keyword *await* permette di attendere il termine delle operazioni di getData() per ottenere il risultato. Se viene sollevato un errore esso viene segnalato e la funzione termina. Se la chiave inserita non era valida riceverò null e la funzione termina. Se invece l'operazione ha successo la chiave inserita viene salvata nella variabile "chiave", il box di login viene nascosto e viene mostrato il component child "PostitList", fino a quel momento invisibile.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/ssw-project)
