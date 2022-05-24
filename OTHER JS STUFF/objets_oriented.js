// let basket = new Basket()
// basket.addBasket({id:"25", price: 19, })
// basket.removeFromBasket ==> renommer en "remove" etc

// LA MEME ORIENTÉ OBJET
class Basket {
    constructor(){
        let basket = localStorage.getItem("basket"); // get basket
        if(basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
        }
    }

    
    saveBasket() { // function save basket
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    addBasket(product) {
        // let basket = getBasket();
        let foundProduct = this.basket.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity++;
        } else {
            product.quantity = 1
            this.basket.push(product);
        }
        // saveBasket(this.basket);
        this.saveBasket();
    }

        removeFromBasket(product){
        // let basket = getBasket();
        this.basket = this.basket.filter(p => p.id != product.id);
        // saveBasket(this.basket); 
        this.saveBasket();
    }
        changeQuantity(product, quantity) {
        // let basket = getBasket();
        let foundProduct = this.basket.find(p => p.id == product.id);
        if(foundProduct != undefined) {
            foundProduct.quantity += quantity
            if(foundProduct.quantity <= 0) {
                removeFromBasket(foundProduct);
            } else {
            saveBasket();
        }
        }
    }

        getNumberProduct(){
        // let basket = getBasket();
        let number = 0;
        for(let product of this.basket){
            number += product.quantity;
        } 
        return number;
    }

        getTotalPrice(){
        // let basket = getBasket();
        let total = 0;
        for(let product of this.basket){
            total += product.quantity * product.price;
        } 
        return number;
    }
    

}

// function saveBasket(basket) {
//     localStorage.setItem("basket", JSON.stringify(basket));
// }

function getBasket() {
    // let basket = localStorage.getItem("basket");
    // if(basket == null) {
    //     return [];
    // } else {
    //     return JSON.parse(basket);
    // }
}

// function addBasket(product) {
//     let basket = getBasket();
//     let foundProduct = basket.find(p => p.id == product.id);
//     if(foundProduct != undefined){
//         foundProduct.quantity++;
//     } else {
//         product.quantity = 1
//         basket.push(product);
//     }
//     saveBasket(basket);
// }

// addBasket({id:"50", name:"truc", quantity:5});
// quantité de 1 si ref non existante

// function removeFromBasket(product){
//     let basket = getBasket();
//     basket = basket.filter(p => p.id != product.id);
//     saveBasket(basket); 
// }

// function changeQuantity(product, quantity) {
//     let basket = getBasket();
//     let foundProduct = basket.find(p => p.id == product.id);
//     if(foundProduct != undefined) {
//         foundProduct.quantity += quantity
//         if(foundProduct.quantity <= 0) {
//             removeFromBasket(foundProduct);
//         } else {
//         saveBasket(basket);
//     }
//     }
// }

// changeQuantity({id:"50"}, 5)
// supprime si inférieur à 0

// function getNumberProduct(){
//     let basket = getBasket();
//     let number = 0;
//     for(let product of basket){
//         number += product.quantity;
//     } 
//     return number;
// }

// function getTotalPrice(){
//     let basket = getBasket();
//     let total = 0;
//     for(let product of basket){
//         total += product.quantity * product.price;
//     } 
//     return number;
// }

// add event listener sur le bouton d'ajout et simple appel de la fonction ajouter ua pnier
