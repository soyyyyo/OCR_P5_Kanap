//Gestion du panier
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let choixCouleur = colorPicked.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des options de l'article à ajouter au panier
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}