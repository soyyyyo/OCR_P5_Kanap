// mode haut niveau via GG
const getProduct = async () => {
    const response = await fetch("http://localhost:3000/api/products")
    const data = await response.json();
    console.log(data);
}
const product = getProduct();
console.log(product);
