// variable stockant l'ID de la page, et donc du produit en question
let pageId = getSearchParam("id");

// Get search param
function getSearchParam(param) {
	const searchParam = new URLSearchParams(document.location.search);
	if (searchParam.has(param)) {
		return searchParam.get(param);
	}
	return "";
}

fetchApi();

// appel de l'API pour le produit de la page via l'URL
async function fetchApi() {
await fetch(`http://localhost:3000/api/products/${pageId}`)
  .then((rawData) => rawData.json()) // converti les data pour être lus
  .then((okData) => {
    displayProducts(okData); // appel la fonction d'affichage du produit de la page
    console.table(okData); // affiche les data dans la console sous forme de tableau
  })
  .catch((err) => {
document.querySelector(".item").innerHTML += "<h1>erreur 404</h1>";
console.log("erreur 404 via API: " + err); // définition de l'erreur dans la console
});
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

// défini les variables qui seront ajoutés au panier du local storage
let id = pageId;
let color = "";
let quantity = 0;
let cart = new Cart;

// défini l'affichage des produits dans la page
displayProducts = (product) => {
            toPageTitle.innerText = product.name;
            toDescription.innerText = product.description;
            toTitle.innerText = product.name;

            const itemImgContainer = document.querySelector(".item__img");
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", product.imageUrl);
            imgElement.setAttribute("alt", product.altTxt);
            itemImgContainer.appendChild(imgElement);

            toPrice.innerText = product.price;
        for(let i = 0; i < product.colors.length; i++) { // tant qu'il y a des couleurs, on les rajoute
        toColor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>;`
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

    

// défini l'action à effectuer lors de l'ajout d'un produit au panier
document
.querySelector("#addToCart")
.addEventListener("click", function() {
// informe l'utilisateur des conditions à respecter pour valider le panier
if(color === null || color === "" || quantity === 0 || quantity > 100){
    alert("Veuillez choisir une couleur et une quantité valide.");
} else {
cart.add({id, color, quantity});
alert("Votre article a bien été ajouté au panier");
}
})

