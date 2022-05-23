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
    formValidation();
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
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const email = document.querySelector("#email")
// validation
const toOrder = document.querySelector("#order")


// on récupére les détails de chaque produit dans une variable finalCartObject
function detailsOfCart(data) {
let localStorageCart = localStorage.getItem("cart"); // get cart de local storage
finalCartObject = JSON.parse(localStorageCart)
finalCartObject.forEach(product => {
    const foundProduct = data.find(p => p._id === product.id);
    if(foundProduct) {
        product.name = foundProduct.name;
        product.price = foundProduct.price;
        product.imageUrl = foundProduct.imageUrl;
        product.description = foundProduct.description;
        product.altTxt = foundProduct.altTxt;
    } else {
        console.log("No product found to be displayed");
    }
});
    console.log("final cart", finalCartObject);
    return finalCartObject;
}


function displayCart() {
    finalCartObject.forEach(product => {
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


// tout en un
function validateRegex(value, type) {
    if(type === "text") {
        const minRegexp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
        const valid = minRegexp.test(value);
        return valid;
    } if(type === "email") {
        const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = emailRegexp.test(value);
        return valid;
    } if(type === "address") {
        const addressRegexp = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{5,100}$/i;
        const valid = addressRegexp.test(value);
        return valid;
    }
}

// défini les infos de contact globales qui seront importés plus tard dans le local storage
let globalContact = {firstName: "", lastName: "", address: "", city: "", email: ""};


// liste des messages d'erreurs
let textError = false;
const textErrorOutput = "Seules les lettres et tirets sont autorisés."
let addressError = false;
const addressErrorOutput = "Votre addresse semble incompléte ou invalide"
let emailError = false;
const emailErrorOutput = "Veuillez rentrer une addresse email valide."
const noErrorToDisplay = null;
// rajouter erreur par champs : ex: prenom incorrect, nom de famille incorrect



const formFields = [firstName, lastName, address, city, email]
const fieldType = ["text", "text", "address", "text", "email"]
let errorCount = [];


function formValidation() {
for (let i = 0; i < formFields.length; i++) {
    let errorValue = false
    let globalContactKey = formFields[i].name;
    formFields[i].addEventListener("change", function(e) {
        if(validateRegex(e.target.value, fieldType[i])) {
            globalContact[globalContactKey] = e.target.value;
            errorValue = false;
            errorCount[i] = 0;
        } else {
            errorValue = true
            errorCount[i] = 1;
        }
        displayError(formFields[i].name, fieldType[i], errorValue);
        console.log(formFields[i].name, fieldType[i], errorValue);
    })
}
}


// défini si on affiche ou non un message d'erreur
function displayError(queryLocation, errorKind, errorValue){
    let errorOnDisplay;
    if(errorValue === true){
        if(errorKind === "text") {
            errorOnDisplay = textErrorOutput;
        }
        if(errorKind === "address") {
            errorOnDisplay = addressErrorOutput;
        }
        if(errorKind === "email") {
            errorOnDisplay = emailErrorOutput;
        }
        document.querySelector("#"+queryLocation+"ErrorMsg").innerHTML = errorOnDisplay;
    } else {
        document.querySelector("#"+queryLocation+"ErrorMsg").innerHTML = noErrorToDisplay;
    }
    }

let finalCartArray = [];

function cartConvertToArray(object, array) {
object.forEach(item => {
    array.push(item.id)
});}


toOrder.addEventListener("click", function(){
    console.log("errorCount", errorCount);
    console.log("globalContact", globalContact)
    if(
        errorCount.reduce((previousValue, currentValue) => previousValue + currentValue, 0) === 0 &&
        finalCartObject.length > 0 &&
        globalContact.firstName != "" &&
        globalContact.lastName != "" &&
        globalContact.address != "" &&
        globalContact.city != "" &&
        globalContact.email != ""
    ) {
        event.preventDefault();
        console.log("ORDER IZ GREAT SUCCESS")
        sendOrder();
    } else {
        event.preventDefault();
        console.log("SOMETHING WENT WRONG")
    }
    cartConvertToArray(finalCartObject, finalCartArray);
    console.log(finalCartArray);
})


///////

function sendOrder() {
const orderData = {
    contact: globalContact,
    products: finalCartArray
}

// Envoi de l'objet orderData à l'API
const sendOrder = {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(orderData)
};

fetch("http://localhost:3000/api/products/order", sendOrder)
.then(
    async (response) => {
        try {
            if(response.ok) {
                const data = await response.json();
                // Réponse envoyée par l'API contenant l'orderId
                console.log(data);
                // Redirection vers la page Confirmation
                window.location.href = `confirmation.html?order=${data.orderId}`;
            }
        }
        catch(error) {
            alert("Le serveur ne répond pas. Si le problème persiste, contactez-nous");
        };
    }
)
}





/*


*/




// essayer avec [0] [1]


/*
toFirstName.addEventListener("change", function(e) {
    let errorValue = false
   if(validateRegex(e.target.value, "text")){
    globalContact.firstName = e.target.value;
    errorValue = false
   } else {
    errorValue = true;
   }
   displayError("firstName", textErrorOutput, errorValue);
})
*/