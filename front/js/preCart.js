class Cart {
    constructor(){
        let cart = localStorage.getItem("cart"); // get cart
        if(cart == null) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(cart);
        }
    }

    // sauvegarde le panier dans Local Storage
    save() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    // ajoute un produit en vérifiant dans le local storage si son couple ID/Couleur existe déja
    add(product) {
        const foundProduct = this.cart.find(
            p => p.id === product.id && p.color === color);
        console.log("found product", foundProduct)

        if(foundProduct){
            // si on trouve l'ID && Couleur
            foundProduct.quantity = parseInt(quantity) + parseInt(foundProduct.quantity);
            console.log("j'existe déja");
        } else {
            // si l'ID ou Couleur est différent
            product.quantity = parseInt(quantity);
            this.cart.push(product);
            console.log("je suis nouveau")
        }
        this.save();
    }
    // supprime un objet du local storage en vérifiant l'id et la couleur
         remove(idInObject, colorInObject){
                 const foundProduct = this.cart.find(
                     p => p.id === idInObject.id && p.color === colorInObject.color);
                 if(foundProduct){
                // si on trouve un match, on lui attribue un champ delete, et on filtre pour n'avoir que le reste
                     foundProduct.delete = true;
                     this.cart = this.cart.filter(p => p.delete != true);
                 } else {
                     console.log("remove function isnt working properly")
                 }
                 // on sauvegarde le nouveau local storage, et actualise la page pour rafraichir le display product
                 this.save();
                 //location.reload()
                }

    // change la quantité d'un produit en croisant son id et sa couleur
        changeQuantity(idInObject, colorInObject, quantityInObject) {
            const foundProduct = this.cart.find(
            p => p.id === idInObject.id && p.color === colorInObject.color);
            if(foundProduct) {
            foundProduct.quantity = quantityInObject.quantity
            if(foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
            this.save();
        }
        // met à jour l'affichage de la page et le montant total de la commande
        detailsOfCart(fetchedData)
        }
    }
        // calcule le nombre de produit dans le panier depuis le local storage
        getTotalProduct(){
        let number = 0;
        for(let product of this.cart){
            number += parseInt(product.quantity);
        } 
        return number;
    }
        // calcule le montant total du panier depuis un panier défini.
        getTotalPrice(cartToAnalyse){
        let total = 0;
        for(let product of cartToAnalyse){
            total += product.quantity * product.price;
        } 
        return total;
    }
}
