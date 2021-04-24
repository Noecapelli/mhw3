
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function onSaleJson(json){
    console.log(json);
    let num_results = json.data.length;
    let cont = document.querySelector('#news');
    if (num_results > 6) {
        num_results = 6;
    }
    for (let i = 0; i < num_results; i++) {


        const news = json.data[i];



        let titlee = document.createElement('em');
       
       
        let div = document.createElement('div');
        let a = document.createElement("a");


        titlee.textContent = news.title;
        a.setAttribute('href', news.url);
        
        
        cont.appendChild(div);
        
        div.appendChild(a);
        a.appendChild(titlee);
    }


}

function apinew() {

    fetch('http://api.mediastack.com/v1/news?access_key=' + videogamenewsapi+ '&categories=technology&languages=en').then(onResponse).then(onSaleJson);
}

const videogamenewsapi = '4e665c71e73acc314b564f95863bbe94';
apinew();