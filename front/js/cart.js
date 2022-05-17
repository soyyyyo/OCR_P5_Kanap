fetch("http://localhost:3000/api/products")
  .then((rawData) => rawData.json()) // converti les data pour être lus
  .then((okData) => {
    // displayProducts(okData); // appel la fonction d'affichage du produit de la page
    detailsOfCart(okData);
    displayCart();
    deleteItem();
    itemQuantity();
    totalItems();
    totalPrice();
    // console.table(okData); // affiche les data dans la console sous forme de tableau
  })
  .catch((err) => {
document.querySelector("#cart__items").innerHTML += "<h1>erreur 404</h1>";
console.log("erreur 404 via API: " + err); // définition de l'erreur dans la console
});

// définition du point d'entrée dans le HTML
// product
const toCartItem = document.querySelector("#cart__items");
const toTotalQuantity = document.querySelector("#totalQuantity");
const toTotalPrice = document.querySelector("#totalPrice");
// form
const toFirstName = document.querySelector("#firstName")
const toLastName = document.querySelector("#lastName")
const toAdress = document.querySelector("#address")
const toCity = document.querySelector("#city")
const toEmail = document.querySelector("#email")
const toOrder = document.querySelector("#order")


// const toDeleteItem = document.querySelector(".deleteItem");
// const toDeleteItem = document.querySelectorAll(".cart__item .deleteItem");



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
        `<article class="cart__item" data-id=${product.id} data-color=${product.color}>
    <div class="cart__item__img">
    <img src=${product.imageUrl} alt=${product.altTxt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
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
                cart.remove({id: produtToDeleteId}, {color: productToDeleteColor})    
             })
     })
     };

function itemQuantity() {
    const toItemQuantity = document.querySelectorAll(".cart__item .itemQuantity");
    toItemQuantity.forEach((toItemQuantity) => {
        toItemQuantity.addEventListener("change", function(e) {
            let productToModify = toItemQuantity.closest(".cart__item");
            let productToModifyId = productToModify.dataset.id;
            let productToModifyColor = productToModify.dataset.color
            let productToModifyQuantity = e.target.value
            cart.changeQuantity({id: productToModifyId}, {color: productToModifyColor}, {quantity: productToModifyQuantity})    
        })
})
};

function totalItems() {
    toTotalQuantity.innerHTML = cart.getTotalProduct();
}

function totalPrice() {
    toTotalPrice.innerHTML = cart.getTotalPrice();
}


/// regex
/*
field.setCustomValidity() to set the result of the validation:
an empty string means the constraint is satisfied,
and any other string means there is an error and this string is the error message to display to the user.
*/

/*
toFirstName
toLastName
toAdress
toCity
toEmail
toOrder
*/


// regexp pour des lettres uniquement
function validateNames(value) {
    const minRegexp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
    const valid = minRegexp.test(value);
	return valid;
}

// http://emailregex.com/
function validateEmail(value) {
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = emailRegexp.test(value);
    return valid;
}

// regex pour l'adresse en lettre/chiffre/tiret uniquement jusqu'à 100 caractères
function validateAdress(value) {
    const adressRegexp = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{10,100}$/i;
    const valid = adressRegexp.test(value);
    return valid;
}


// let firstName = "";
// let lastName = "";
// let adress = "";
// let city = "";
// let email = "";

let globalContact = {firstName: "", lastName: "", adress: "", city: "", email: ""};

const noErrorToDisplay = null;

let textError = false;
const textErrorOutput = "Seules les lettres et tirets sont autorisés."

let adressError = false;
const adressErrorOutput = "Votre adresse semble invalide, certains caractéres spéciaux ne sont pas autorisés."

let emailError = false;
const emailErrorOutput = "Veuillez rentrer une adresse mail valide."






toFirstName.addEventListener("change", function(e) {
   if(validateNames(e.target.value)){
    globalContact.firstName = e.target.value;
    textError = false
   } else {
    textError = true;
   }
   displayError("firstName", "text", textError);
})


function displayError(value, option, error){
    if(textError === true){
        document.querySelector("#"+value+"ErrorMsg").innerHTML = textErrorOutput;
    } else {
        document.querySelector("#"+value+"ErrorMsg").innerHTML = noErrorToDisplay;
    }
    }





///////

toLastName.addEventListener("change", function(e) {
   lastName = e.target.value;
})
toAdress.addEventListener("change", function(e) {
    adress = e.target.value;
})
toCity.addEventListener("change", function(e) {
    city= e.target.value;
})
toEmail.addEventListener("change", function(e) {
    email = e.target.value;
})

