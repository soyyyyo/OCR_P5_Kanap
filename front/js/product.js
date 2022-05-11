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

let thisPage = window.location.href // récupère l'url de la page active
let url = new URL(thisPage);
let search_params = new URLSearchParams(url.search); 

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

// supprimer le local storage
localStorage.clear();
// valable uniquement pendant les phases de test



// let basket = new Basket()
// basket.addBasket({id:"25", price: 19, })
// basket.removeFromBasket ==> renommer en "remove" etc

// LA MEME ORIENTÉ OBJET
class Cart {
    constructor(){
        let cart = localStorage.getItem("cart"); // get cart
        if(cart == null) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(cart);
        }
    }
    save() { // sauvegarde le panier dans Local Storage
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }
    // ajoute un produit avec la quantité attendue
    add(product) {
        const foundProduct = this.cart.find(
            p => p.id === product.id && p.cartColor === cartColor);
        console.log("found product", foundProduct)

        if(foundProduct){ // si on trouve l'ID && Couleur
            foundProduct.quantity = parseInt(quantity) + parseInt(foundProduct.quantity);
            console.log("j'existe déja");
        } else {
            product.quantity = quantity; // si le produit n'existe pas, on le crée
            this.cart.push(product);
            console.log("je suis nouveau")
        }
        this.save();
    }


    // supprime un produit, en filtrant tout ce qui n'est pas l'ID
        remove(product){
        this.cart = this.cart.filter(p => p.id != product.id);
        this.save();
    }
    // change la quantité d'un produit
        changeQuantity(product, quantity) {
        let foundProduct = this.cart.find(p => p.id == product.id);
        if(foundProduct != undefined) {
            foundProduct.quantity += quantity
            if(foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
            this.save();
        }
        }
    }
        getNumberProduct(){
        let number = 0;
        for(let product of this.cart){
            number += product.quantity;
        } 
        return number;
    }
        getTotalPrice(){
        let total = 0;
        for(let product of this.cart){
            total += product.quantity * product.price;
        } 
        return number;
    }
}



// défini les variables qui seront ajoutés au panier
let id = pageId;
let cartColor = "";
let quantity = 0;
// let preCart = [id, cartColor, quantity];
let cart = new Cart;


document
    toColor.addEventListener("change", function(e){
        cartColor = e.target.value; 
    })

document
    toQuantity.addEventListener("change", function(e){
        quantity = e.target.value;
    })
    
document // log console pour vérification
.querySelector("#addToCart")
.addEventListener("click", function() {
// let preCart = [id + cartColor + quantity]
// console.log(preCart);
// console.log(cartColor);
// console.log(quantity);
if(cartColor === null || cartColor === "" || quantity === 0 || quantity > 100){
    alert("Veuillez choisir une couleur et une quantité valide.");
} else
cart.add({id, cartColor, quantity});
})
