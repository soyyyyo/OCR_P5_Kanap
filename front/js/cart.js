// sauvegardera le fetch des datas de l'API pour ne pas la rappeler à chaque modifications du panier.
let fetchedData;
fetchApi();




// récupére les produits de l'API et appel les différentes fonctions utiles à la page
async function fetchApi() {
await fetch("http://localhost:3000/api/products")
  .then((rawData) => rawData.json()) // converti les data pour être lus
  .then((okData) => {
    console.table(okData);
    fetchedData = okData
    detailsOfCart(okData);
    displayCart();
    deleteItem();
    itemQuantity();
    totalItems();
    totalPrice();
    formValidation();
  })
  .catch((err) => {
document.querySelector("#cart__items").innerHTML += "<h1>erreur 404</h1>";
console.log("erreur 404 via API: " + err); // définition de l'erreur dans la console
});
}




/////////////////////
// AFFICHAGE ET MODIFICATIONS DU PANIER
/////////////////////

// définition des points d'entrées dans le HTML
// cartes produits, quantité total, et prix total
const toCartItem = document.querySelector("#cart__items");
const toTotalQuantity = document.querySelector("#totalQuantity");
const toTotalPrice = document.querySelector("#totalPrice");
// champs du formulaire
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const address = document.querySelector("#address")
const city = document.querySelector("#city")
const email = document.querySelector("#email")
// bouton de validation de la commande
const toOrder = document.querySelector("#order")
// panier final sous forme d'objet
let finalCartObject = [];




// on récupére les détails de chaque produit dans une variable objet finalCartObject
function detailsOfCart(data) {
    let localStorageCart;
    // si le local storage est null (aprés un clear storage) on le défini afin d'éviter des bugs
    if(localStorage.getItem("cart") === null) {
        localStorageCart = []
    } else {
    localStorageCart = localStorage.getItem("cart"); // get cart de local storage
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
}}




function noCartToDisplay() {
    const newLink = document.createElement("a")
    newLink.setAttribute("href", "./index.html")
    newLink.style.textDecoration = "none";
    newLink.style.color = "var(--text-color)"
    const linkText = document.createTextNode(" Voir les canapés")
    newLink.appendChild(linkText)

    const newDiv = document.createElement("div");
    const newContent = document.createTextNode('Le panier est vide!');
    newDiv.style.textAlign = "center";
    newDiv.appendChild(newContent);
    newDiv.appendChild(newLink)

    toCartItem.appendChild(newDiv)
}



// génére l'affichage ce chaque produit du panier dans la page panier.
function displayCart() {
    // si il n'y a rien dans le panier, on crée une div d'information le précisant, et un lien vers la page d'accueil
    if(finalCartObject.length === 0) {
    noCartToDisplay()
    // si le panier contient des élements, on les affiches dynamiquement
    } else {
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
        <p>${product.price} €</p>
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
    }}




let cart = new Cart;




// gére la suppresion d'un article en récupérant son id et sa couleur
// appelle la fonction cart.remove afin de supprimer la ligne du local storage et recharger la page pour actualiser l'affichage
function deleteItem() {
         const toDeleteItem = document.querySelectorAll(".cart__item .deleteItem");
         toDeleteItem.forEach((toDeleteItem) => {
             toDeleteItem.addEventListener("click", () => {
                 let producToDelete = toDeleteItem.closest(".cart__item");
                 let produtToDeleteId = producToDelete.dataset.id;
                 let productToDeleteColor = producToDelete.dataset.color
                cart.remove({id: produtToDeleteId}, {color: productToDeleteColor})
                producToDelete.remove();
                updateCart();
             })
     })
     };


function updateCart() {
    detailsOfCart();
    totalItems();
    totalPrice();
}

// gére la modification de la quantité d'un produit en récupérant l'id, couleur et nouvelle quantité
// puis appelle cart.changeQuantity afin d'éditer la quantité dans le local storage et dans l'objet finalCartObject
function itemQuantity() {
    const toItemQuantity = document.querySelectorAll(".cart__item .itemQuantity");
    toItemQuantity.forEach((toItemQuantity) => {
        toItemQuantity.addEventListener("change", function(e) {
            let productToModify = toItemQuantity.closest(".cart__item");
            let productToModifyId = productToModify.dataset.id;
            let productToModifyColor = productToModify.dataset.color
            let productToModifyQuantity = e.target.value
            cart.changeQuantity({id: productToModifyId}, {color: productToModifyColor}, {quantity: productToModifyQuantity})
            updateCart();
        })
})
};




// insére le nombre total de produit dans le HTML
function totalItems() {
    toTotalQuantity.innerHTML = cart.getTotalProduct();
}

// insére le montant total de la commande dans le HTML
function totalPrice() {
    toTotalPrice.innerHTML = cart.getTotalPrice(finalCartObject);
}




/////////////////////
// VALIDATION DU FORMULAIRE
/////////////////////

// défini les différentes Regex qui seront à prendre en compte suivant le type de champ du formulaire
function validateRegex(value, type) {
    // Type texte: lettres et accents uniquements, jusqu'à 31 caractéres
    if(type === "text") {
        const minRegexp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
        const valid = minRegexp.test(value);
        return valid;
    // Type email: vérifie le @, une extension de domaine, le double point etc...
    } if(type === "email") {
        const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = emailRegexp.test(value);
        return valid;
    // Type adresse: lettres, accents et chiffres autorisés, entre 5 et 100 caractéres
    } if(type === "address") {
        const addressRegexp = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{5,100}$/i;
        const valid = addressRegexp.test(value);
        return valid;
    }
}




// défini les infos de contact globales qui seront nécessaire à l'envoi de la commande à l'API
let globalContact = {firstName: "", lastName: "", address: "", city: "", email: ""};
// défini les champs du formulaire
const formFields = [firstName, lastName, address, city, email]
// défini le type de Regex à utiliser, suivant le type de champ du formulaire
const fieldType = ["text", "text", "address", "text", "email"]
// défini le nombre d'erreurs constatés afin de pouvoir valider ou non la commande
let errorCount = [];




// pour chaque element de FormFields on vérifie la correspondance à la Regex attribué par le filedType
// on envoi alors les valeurs formFields, Fieldtype et errorValue à la fonction définissant les messsages d'erreurs
// le données du formFields définissent la key pour l'objet globalContact, ainsi que l'emplacement querySelector pour le displayError
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




// liste des messages d'erreurs à insérer dans le HTML en cas d'erreur de Regex
const textErrorOutput = "Seules les lettres et tirets sont autorisés."
const addressErrorOutput = "Votre addresse semble incompléte ou invalide"
const emailErrorOutput = "Veuillez rentrer une addresse email valide."
const noErrorToDisplay = null;
// rajouter erreur par champs : ex: prenom incorrect, nom de famille incorrect




// défini si on affiche ou non un message d'erreur en fonction de la valeur d'errorValue
function displayError(queryLocation, errorKind, errorValue){
    let errorOnDisplay;
    let keyWord;
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

        switch (queryLocation) {
            case 'firstName':
              keyWord = "prénom";
              break;
              case 'lastName':
                  keyWord = "nom de famille";
                  break;
                  case 'adress':
                      keyWord = "adresse";
                      break;
                      case 'city':
                          keyWord = "ville";
                          break;
                          case 'email':
                              keyWord = "adresse email";
                              break;
          }
        document.querySelector("#"+queryLocation+"ErrorMsg").innerHTML = `Etes vous certain.e.s de votre ${keyWord} ?` + " " + errorOnDisplay;
    } else {
        document.querySelector("#"+queryLocation+"ErrorMsg").innerHTML = noErrorToDisplay;
    }
    }



// le panier sous forme d'array, qui sera envoyé à l'API
let finalCartArray = [];




// converti l'objet finalCart vers un array finalCart sous le format attendu par l'API. Seulement les ID.
function cartConvertToArray(object, array) {
object.forEach(item => {
    array.push(item.id)
});}




// vérifie que toutes les conditions nécessaires sont remplies avant de passer la commande.
// il faut entre autre un errorCount égale à zéro (et donc des données à jour)
// un globalContact ayant tous les champs renseignés
// un panier non vide
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
        alert("Veuillez vérifier les informations saisies")
    }
    cartConvertToArray(finalCartObject, finalCartArray);
    console.log(finalCartArray);
})




/////////////////////
// ENVOI DU FORMULAIRE
/////////////////////


// Envoi la commande à l'API sous le format attendu
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
