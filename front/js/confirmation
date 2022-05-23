const orderConfirmation = document.getElementById("orderId")

// Récupération de l'orderId dans l'URL et affichage du message de confirmation de commande
const urlOrder = window.location.search;
const urlSearchParams = new URLSearchParams(urlOrder);
const orderId = urlSearchParams.get("order");
orderConfirmation.textContent = orderId;

// Vider le Local Storage
localStorage.clear();