




function initialize() {
    for (let c of content) {
    let divimg = document.createElement('div');
    let image = document.createElement('img');
    let em = document.createElement('em');
    let a = document.createElement('a');
    let p = document.createElement('p');
    let imgfav = document.createElement('img');
    let imgdet = document.createElement('img');
        em.textContent = c.title;
        p.textContent = c.text;

        image.classList.add('prodotto');
    imgfav.classList.add('fav');
    p.classList.add('hidden');
    imgdet.classList.add('det');

    imgfav.setAttribute('src', "favourite.png");
    image.setAttribute('src', c.img_src);
        imgdet.setAttribute('src', "dettagli.png");
        a.href = "";
    let container = document.querySelector(".product");
        container.appendChild(divimg);
        divimg.appendChild(em);
        divimg.appendChild(imgfav);
    
    
    divimg.appendChild(a);
    a.appendChild(image);
        divimg.appendChild(imgdet);
        divimg.appendChild(p);
  
   

    
    }
}
initialize();

function reset(event) {

    const image = event.currentTarget;
    const content = document.querySelector(".preferiti");
    const em = document.querySelector(".preferiti em");
    let allElementsTitle = document.querySelectorAll('.preferiti div em');
    let Remove = event.target.parentElement.querySelector('em').textContent;
    for (let elem of allElementsTitle) {
        if (elem.textContent === Remove) {
            let mark = elem.parentElement.parentElement.querySelector('.fav');
           image.src = "favourite.png"
            elem.parentElement.remove();
            
           
           
        }
    }
    
   
    image.removeEventListener('click', reset);
    image.addEventListener('click', Favourite);
}

function Favourite(event){
    const image = event.currentTarget;
    image.src = "cuore2.png";

   
    const divv = event.currentTarget.parentElement;
    const container = document.querySelector(".preferiti");
   
    const diiv = divv.cloneNode(true);
    
    container.appendChild(diiv);
    image.removeEventListener('click', Favourite);
    image.addEventListener('click', reset);
}
const image = document.querySelectorAll("img.fav");
for (i of image) {
    i.addEventListener('click', Favourite);
}

function handleSearch(event) {
    console.log(event.target.value);
    let inserimento = event.target.value.toLowerCase();
    let container = document.querySelectorAll('.product div');
   
    if (inserimento !== "") {
        for (let c of container) {
            let nome = c.querySelector('em').firstChild.textContent.toLowerCase();
            console.log(c.querySelector('em').firstChild.textContent.toLowerCase());
            console.log(nome.indexOf(inserimento));
            if (nome.search(inserimento) === -1) {
                console.log(c);
                c.style.display = 'none';

            }
            else if (nome.search(inserimento) !== -1){
                c.style.display ='';
            }
        }
    }
    else {
        for (let c of container) {
            c.style.display = '';
        }
    }
}
const searchBar = document.querySelector('input');
searchBar.addEventListener('keyup', handleSearch);


function Details(event) {
    event.target.parentElement.querySelector('p').classList.remove('hidden');
    event.currentTarget.src = "menodettagli.png";
    event.target.removeEventListener('click', Details);
    event.target.addEventListener('click', NoDetails);
}

function NoDetails(event) {
    event.target.parentElement.querySelector('p').classList.add('hidden');
    event.currentTarget.src = "dettagli.png";
    event.target.removeEventListener('click', NoDetails);
    event.target.addEventListener('click', Details);
}
const det = document.querySelectorAll('img.det');
for (let d of det) {
    d.addEventListener('click', Details);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}
function onSaleJson(json) {
    console.log(json);
    let num_results = json.length;
    let cont = document.querySelector(' #api');
    cont.classList.remove('hidden');
    for (let i = 0; i < num_results; i++) {


        const game = json[i]



        let titlee = document.createElement('em');
        let image = document.createElement('img');
        let price = document.createElement('span');
        let div = document.createElement('div');
        let a = document.createElement("a");

        price.textContent = 'prezzo scontato: ' + game.salePrice + '\nprezzo originale: ' + game.normalPrice;
        titlee.textContent = game.title;
        a.setAttribute('href', '');
        image.classList.add('steamImg');
        image.setAttribute('src', game.thumb);
        cont.appendChild(div);
        div.appendChild(titlee);
        div.appendChild(a);
        a.appendChild(image);
        div.appendChild(price);
    }

}
function hide(event){
    let cont = document.querySelector('#api');
    event.currentTarget.textContent = 'tap to discover steam\'s product in sales';
    cont.classList.add('hidden');
    event.currentTarget.removeEventListener('click', hide);
    event.currentTarget.addEventListener('click', api);
}
function api(event) {
    rest_url = 'https://www.cheapshark.com/api/1.0/deals';
    fetch(rest_url).then(onResponse).then(onSaleJson);
    event.currentTarget.textContent = "tap to hide";
    event.currentTarget.removeEventListener('click', api);
    event.currentTarget.addEventListener('click', hide);
}
let buttSteam = document.querySelector("button")
buttSteam.addEventListener('click', api);