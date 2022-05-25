fetch("http://localhost:3000/api/products")
  .then((rawData) => rawData.json()) // converti les data pour être lus
  .then((okData) => {
    displayProducts(okData); // appel la fonction d'affichage du produit de la page
    console.table(okData); // affiche les data dans la console sous forme de tableau
  })
  .catch((err) => {
document.querySelector(".item").innerHTML += "<h1>erreur 404</h1>";
console.log("erreur 404 via API: " + err); // définition de l'erreur dans la console
});

// récupére l'ID via l'URL de la page
const thisPage = window.location.href
const url = new URL(thisPage);
const search_params = new URLSearchParams(url.search); 

let pageId = "";
// si l'url a un ID, on le récupère
if(search_params.has('id')) {
  pageId = search_params.get('id');
  console.log("current product ID: " + pageId);
}

// définition des points d'insertion dans le HTML
const toPageTitle = document.querySelector("head > title");
const toDescription = document.querySelector("#description");
const toTitle = document.querySelector("#title");
const toImage = document.querySelector(".item__img");
const toPrice = document.querySelector("#price");
const toColor = document.querySelector("#colors")
const toQuantity = document.querySelector("#quantity")
const toAddToCart = document.querySelector("#addToCart")

// défini les variables qui seront ajoutés au panier
let id = pageId;
let color = "";
let quantity = 0;
let cart = new Cart;

displayProducts = (products) => { // affichage du produit en fonction de son ID
    for(let product of products) {
        if(id === product._id) { // si l'id est égale, on pioche dans les data de la ligne
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

// surveille les changements de valeur de la couleur du produit
document
    toColor.addEventListener("change", function(e){
        color = e.target.value; 
    })

// surveille les changements de valeur de la quantité
document
    toQuantity.addEventListener("change", function(e){
        quantity = e.target.value;
    })

    
// action à effectuer lors de l'ajout au panier
document
.querySelector("#addToCart")
.addEventListener("click", function() {
// informe l'utilisateur des conditions à respecter pour valider le panier
if(color === null || color === "" || quantity === 0 || quantity > 100){
    alert("Veuillez choisir une couleur et une quantité valide.");
} else {
cart.add({id, color, quantity});
alert("Votre article a bien été ajouté au panier&");
}

})

