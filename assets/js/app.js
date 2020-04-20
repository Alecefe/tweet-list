//Variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners

eventListeners();

function eventListeners(){

    //Cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded',localStorageListo);
}

//Funciones
//Añadir tweet al formulario
function agregarTweet(e){
    e.preventDefault();
    //Leyendo el valor del texto
    const tweet = document.getElementById('tweet').value;
    //Boton de eliminar
    const borrar = document.createElement('a');
    borrar.classList = 'borrar-tweet';
    borrar.innerText = 'X';

    //Creando elemento y añardir contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade boton borrar al tweet y tweet a a lista
    li.appendChild(borrar);
    listaTweets.appendChild(li);

    //Añadir a local storage
    agregarTweetLocalStorage(tweet);
}

//Borrar Tweet

function borrarTweet(e){
    e.preventDefault();

    if(e.target.classList.contains('borrar-tweet')){
        e.target.parentElement.remove();
        borrarTweetLocalstorage(e.target.parentElement.textContent);
    }
}

//Agregar tweet a local storage

function agregarTweetLocalStorage(tweet){
    let tweets;
    
    tweets = obtenerTweetsLocalStorage();
    //Añadir el tweet a nuevos
    tweets.push(tweet);
    //Convertir de arreglo a string
    localStorage.setItem('tweets',JSON.stringify(tweets));

}


//Obtener elementos de local storage (Retorna un arreglo)

function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets')===null){
        tweets = [];
    }else{
        tweets = JSON.parse( localStorage.getItem('tweets') );

    }return tweets;
}

//Mostrar datos de local storage en la página

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet){
        //Boton de eliminar
        const borrar = document.createElement('a');
        borrar.classList = 'borrar-tweet';
        borrar.innerText = 'X';
    
        //Creando elemento y añardir contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade boton borrar al tweet y tweet a a lista
        li.appendChild(borrar);
        listaTweets.appendChild(li);
    });

}

//Eliminar tweets de local storage

function borrarTweetLocalstorage(tweet){
    
    let tweets, tweetBorrar;

    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0,tweet.length - 1);
    
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet,index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));

}