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
            p => p.id === product.id && p.cartColor === cartColor);
        console.log("found product", foundProduct)

        if(foundProduct){
            // si on trouve l'ID && Couleur
            foundProduct.quantity = parseInt(quantity) + parseInt(foundProduct.quantity);
            console.log("j'existe déja");
        } else {
            // si l'ID ou Couleur est différent
            product.quantity = quantity;
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


//////////////////////////////////
    // supprime un produit, en filtrant tout ce qui n'est pas l'ID
    // forme a conserver ?   cart.add({id, cartColor, quantity});

         remove(productId, cartColor){
                 const foundProduct = this.cart.find(
                     p => p.id === productId.id && p.cartColor === cartColor.cartColor);
                 if(foundProduct){
                // si on trouve un match, on lui attribue un champ delete, et on filtre pour n'avoir que le reste
                     foundProduct.delete = true;
                     this.cart = this.cart.filter(p => p.delete != true);
                 } else {
                     console.log("remove function isnt workin properly")
                 }
                 // on sauvegarde le nouveau local storage, et rafraichis la page
                 this.save();
                 location.reload();
                }

        // // complexe
        // let foundProduct = this.cart.find(
        // p => p.id === product.id && p.cartColor === cartColor);

        // // old
        // this.cart = this.cart.filter(p => p.id != product.id);
        // this.save();

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

// let cart = new Cart;

