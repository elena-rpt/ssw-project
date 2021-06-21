# Progettino per l'esame di Sviluppo dei Servizi web

Il sistema è composto da quattro componenti e da un service.

### KvaaS Service

Gestisce la comunicazione col server KvaaS. In particolare fornisce 3 funzioni, ognuna di queste invoca una *fetch* sull'url opportuno, ottenendo come risultato una Promise. Nel caso la Promise termini con successo nel *then* vengono estratti i dati ricevuti che saranno poi restituiti da una seconda *then* concatenata. Se invece la Promise fallisce l'errore restituito viene sollevato con un *throw*, di modo che il component che invoca la funzione possa decidere come gestirlo all'interno di un try-catch.
1. getKey(): esegue una POST per ottenere una nuova chiave, che restituisce.
2. getData(): prende in input una chiave ed esegue una GET per recuperare la stringa associata a tale chiave. Se lo status della risposta è diverso da 200 vuol dire che la richiesta è fallita, perciò viene notificato che la chiave inserita non è valida e viene restituito null. Se invece non ci sono postit associati alla chiave verrà restituito un array vuoto.
3. putData(): prende in input una chiave e un array di postit, che sarà trasformato in stringa ed associato alla chiave tramite una POST.

### App Component

Questo componente si occupa delle funzionalità di inserimento e richiesta di una chiave.  
Per l'inserimento c'è un box di input dove inserire la propria chiave, quando viene premuto invio viene invocata la funzione showPostit() che prende in input il contenuto del box e effettua una invocazione della funzione getData() del service. Dato che tale invocazione restituisce una Promise la funzione è dichiarata come *async*, e la keyword *await* permette di attendere il termine delle operazioni di getData() per ottenere il risultato. Se viene sollevato un errore esso viene segnalato e la funzione termina. Se la chiave inserita non era valida riceverò null e la funzione termina. Se invece l'operazione ha successo la chiave inserita viene salvata nella variabile "chiave", il box di login viene nascosto e viene mostrato il component child "PostitList", fino a quel momento invisibile.  
Per richiedere una chiave è presente un bottone sull'interfaccia grafica che al click invoca la funzione getNewKey(), anch'essa asincrona, che fa una chiamata della funzione getKey() del service e mostra sull'interfaccia il valore ricevuto, oppure fa comparire un alert in caso il server non rispondesse.

### PostitList Component

Questo componente è figlio del componente App e da esso riceve come input la chiave, l'array di postit e l'istanza del service. Si occupa della visualizzazione dei postit, che inizialmente vengono visualizzati tutti con soltanto il titolo.  
Un bottone permette di visualizzare solo i postit indicati come importanti, cliccandolo si esegue la funzione showImportant() che mette a false la variabile *showAll*. Grazie alla direttiva \*ngIf vengono visualizzati solo gli elementi della lista di postit che rispettano la condizione (showAll || elem.importante), quindi quando *showAll* è true saranno visualizzati tutti, quando è false solo quelli il cui campo *importante* è true.  
Ogni postit è munito di un checkbox, cliccando su di esso la funzione select() mette a true il campo *selected* del postit. Ne risulta che la direttiva \*ngIf posta sull'elemento che contiene il testo del postit diventi verificata, mostrando quindi il contenuto del postit.  
La creazione e cancellazione di postit sono affidate a due componenti child. In paricolare il componente Delete può inviare un DeletionEvent, il quale indica che un postit è stato rimosso dalla collezione, ed è quindi necessario aggiornare l'array contenuto nel parent, sostituendolo con quello ricevuto dall'evento, di questo si occupa la funzione refreshList().

### Create Component

Questo componente realizza e gestisce il box per creare un nuovo postit.  
Quando viene cliccato il tasto 'Crea' viene invocata la funzione createPostit(), che prende come parametri i valori degli input per titolo e testo del postit e del checkbox. Questi valori sono recuperati attraverso le template reference variables assegnate ai rispettivi elementi html. La funzione è asincrona, infatti crea un nuovo oggetto Postit, lo aggiunge all'array locale e poi fa una chiamata alla funzione putData() del service. In caso il server non rispondesse viene mostrato un alert e il postit viene immediatamente eliminato dall'array, per mantenere la consistenza con l'oggetto memorizzato sul server.  
L'utilizzo della direttiva @ViewChild permette di accedere agli elementi del DOM in modo da poter riportare il form allo stato iniziale dopo la creazione di un postit.  
Il controllo che impedisce di creare più postit con lo stesso titolo è coerente alla scelta di eliminare un postit in base al suo titolo, in questo modo non c'è il rischio di eliminare contemporaneamente due postit con titolo uguale ma contenuto diverso.  
La funzione clean() serve semplicemente a rendere il campo di input del testo più comodo da usare.

### Delete Component

Questo componente funziona in modo speculare a Create: qui viene richiesto soltanto il titolo del postit, che viene passato alla funzione asincrona deletePostit(). Per prima cosa, la funzione controlla se c'è davvero un postit con quel titolo nella collezione, in caso contrario non fa nulla. Se invece il postit c'è viene rimosso dall'array locale tramite una *filter*, poi viene invocato il metodo putData() del service. Se l'operazione va a buon fine il nuovo array viene passato al componente parent grazie a un EventEmitter, se invece fallisce viene mostrato un alert, l'evento non viene emesso e l'array viene riportato allo stato precedente alla rimozione.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/ssw-project)
