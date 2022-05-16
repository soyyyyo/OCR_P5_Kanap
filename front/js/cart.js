fetch("http://localhost:3000/api/products")
  .then((rawData) => rawData.json()) // converti les data pour être lus
  .then((okData) => {
    // displayProducts(okData); // appel la fonction d'affichage du produit de la page
    detailsOfCart(okData);
    displayCart();
    deleteItem();
    // console.table(okData); // affiche les data dans la console sous forme de tableau
  })
  .catch((err) => {
document.querySelector("#cart__items").innerHTML += "<h1>erreur 404</h1>";
console.log("erreur 404 via API: " + err); // définition de l'erreur dans la console
});

// définition du point d'entrée dans le HTML
const toCartItem = document.querySelector("#cart__items");
// const toDeleteItem = document.querySelector(".deleteItem");
// const toDeleteItem = document.querySelectorAll(".cart__item .deleteItem");


/*
Plan de bataille:
- récupérer API
- récupérer local storage => variable array
- croiser les deux pour récupérer total data
- insérer les data dans le html
- event listener sur quantity
- event listener sur supprimer
- mise à jour du total


*/


// on récupére les détails de chaque produit dans une variable finalCart
function detailsOfCart(data) {
let localStorageCart = localStorage.getItem("cart"); // get cart de local storage
finalCart = JSON.parse(localStorageCart)
finalCart.forEach(product => {
    const foundProduct = data.find(p => p._id === product.id);
    if(foundProduct) {
        product.name = foundProduct.name;
        product.price = foundProduct.price;
        product.imageUrl = foundProduct.imageUrl;
        product.description = foundProduct.description;
        product.altTxt = foundProduct.altTxt;
    } else {
        console.log("nothing was founded");
    }
});
    console.log("final cart", finalCart);
    return finalCart;
}

function displayCart() {
    finalCart.forEach(product => {
        toCartItem.innerHTML += 
        `<article class="cart__item" data-id=${product.id} data-color=${product.cartColor}>
    <div class="cart__item__img">
    <img src=${product.imageUrl} alt=${product.altTxt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.cartColor}</p>
        <p>${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
</article>`
    });
}

let cart = new Cart;


// appeler new cart ?
function deleteItem() {
         const toDeleteItem = document.querySelectorAll(".cart__item .deleteItem");
         toDeleteItem.forEach((toDeleteItem) => {
             toDeleteItem.addEventListener("click", () => {
                 let producToDelete = toDeleteItem.closest(".cart__item");
                 let produtToDeleteId = producToDelete.dataset.id;
                 let productToDeleteColor = producToDelete.dataset.color
                cart.remove({id: produtToDeleteId}, {cartColor: productToDeleteColor})    
             })
     })
     };