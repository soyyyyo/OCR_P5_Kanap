// définition des points d'insertion dans le HTML
const toPageTitle = document.querySelector("head > title");
const toDescription = document.querySelector("#description");
const toTitle = document.querySelector("#title");
const toImage = document.querySelector(".item__img");
const toPrice = document.querySelector("#price");
const toColor = document.querySelector("#colors")
const toQuantity = document.querySelector("#quantity")
const toAddToCart = document.querySelector("#addToCart")

 // récupère l'url de la page active
let thisPage = window.location.href
let url = new URL(thisPage);
let search_params = new URLSearchParams(url.search);

let pageId = "";
// si l'url a un ID, on le récupère
if(search_params.has('id')) {
  pageId = search_params.get('id');
  console.log("current product ID: " + pageId);
}


// version function (sans classes)
function getApi() {
    return fetch("http://localhost:3000/api/products")
    .then(response => response.json());
}

getApi()
.then(data => displayProduct(data))
.catch((err) => {
    document.querySelector(".item").innerHTML += "<h1>erreur 404</h1>";
    console.log("erreur 404 via API: " + err); // définition de l'erreur dans la console
});

function displayProduct(products){ // affichage du produit en fonction de son ID
    for(let product of products) {
        // console.log(product);
        if(pageId === product._id) { // si l'id est égale, on pioche dans les data de la ligne
            toPageTitle.innerHTML = product.name;
            toDescription.innerHTML = product.description;
            toTitle.innerHTML = product.name;
            toImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
            toPrice.innerHTML = product.price;
        for(let i = 0; i < product.colors.length; i++) { // tant qu'il y a des couleurs, on les rajoute
        toColor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>;`
        }
        }
    }
}

// ajoute le preCart au LocalStorage
document
.querySelector("#addToCart")
.addEventListener("click", addToLocalStorage);

// défini les variables qui seront ajoutés au preCart
let productId = pageId;
let productColor = "";
let productQuantity = 0;
let preCart = []

// supprimer le local storage
localStorage.clear();
// valable uniquement pendant les phases de test


// event listener des couleurs du produit
document
    toColor.addEventListener("change", function(e){
        productColor = e.target.value; 
        console.log(productColor);
    })

// event listener des quantités du produit
document
    toQuantity.addEventListener("change", function(e){
        productQuantity = e.target.value;
        console.log(productQuantity);
    })

// cherche à ajouter le produit au local storage
function addToLocalStorage() {
    let product = {id: productId, color: productColor, quantity: productQuantity};
    let localCart = verifyExistingStorage();
    console.log("localCart", localCart);
    preCart.push(product);   
    console.log("preCart", preCart);
    localStorage.setItem("preCart", JSON.stringify(preCart));
    
    
    let foundProduct = localCart.find(p => p.id == product.id)
    let foundColor = localCart.find(c => c.color == product.color)

    if(foundProduct.id == product.id){
        console.log("id identique");
    } else {
        console.log("id different");
    }
}


// récupére le local sto
function verifyExistingStorage() {
    let localCart = JSON.parse(localStorage.getItem("preCart"));
    console.log("local cart", localCart);
    if(localCart == null){
    localCart = []
    } else {
        return localCart;
    }

}




verifyExistingStorage();

// tableau.find()
// tableau.find index of
// typeof (pour ajuster quoi c'est)