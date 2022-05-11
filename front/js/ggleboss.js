// définition des points d'insertion dans le HTML
const toPageTitle = document.querySelector("head > title");
const toDescription = document.querySelector("#description");
const toTitle = document.querySelector("#title");
const toImage = document.querySelector(".item__img");
const toPrice = document.querySelector("#price");
const toColor = document.querySelector("#colors")
const toQuantity = document.querySelector("#quantity")
const toAddToCart = document.querySelector("#addToCart")

let thisPage = window.location.href // récupère l'url de la page active
let url = new URL(thisPage);
let search_params = new URLSearchParams(url.search);

let pageId = "";
// si l'url a un ID, on le récupère
if(search_params.has('id')) {
  pageId = search_params.get('id');
  console.log("current product ID: " + pageId);
}

/* mode haut niveau via GG
const getProduct = async () => {
    const response = await fetch("http://localhost:3000/api/products")
    const data = await response.json();
    console.log(data);
}
const product = getProduct();
console.log(product);
*/


// version classique OG
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
        console.log(product);
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

document // log console pour vérification
.querySelector("#addToCart")
.addEventListener("click", addToLocalStorage);

// défini les variables qui seront ajoutés au panier
let productId = pageId;
let productColor = "";
let productQuantity = 0;
let preCart = []

document
    toColor.addEventListener("change", function(e){
        productColor = e.target.value; 
        console.log(productColor);
    })

document
    toQuantity.addEventListener("change", function(e){
        productQuantity = e.target.value;
        console.log(productQuantity);
    })


function addToLocalStorage() {
    let product = {id: productId, color: productColor, quantity: productQuantity};
    let existingProduct = verifyExistingStorage();
    console.log("existingProduct", typeof existingProduct.quantity);
    preCart.push(product);
    console.log("preCart", preCart);
    localStorage.setItem("preCart", JSON.stringify(preCart));
}

function verifyExistingStorage() {
    const localPreCart = JSON.parse(localStorage.getItem("preCart"));
    console.log(localPreCart);
    return localPreCart;
}

verifyExistingStorage();

// tableau.find()
// tableau.find index of
// typeof (pour ajuster quoi c'est)