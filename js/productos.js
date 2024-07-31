const products = [
    { id:1, name: "Aceite de girasol Cocinero 1.5 l.", price: 1949, image: "img/aceite.jpg", stock: 25 },
    { id:2, name: "Fideos mostacholes Luchetti 500gr.", price: 1600, image: "img/fideos.jpg", stock: 20 },
    { id:3, name: "Mayonesa Hellmann's 475gr.", price: 1555, image: "img/mayonesa.jpg", stock: 15 },
    { id:4, name: "Harina Pureza p/ Pizza 1kg.", price: 1429, image: "img/harina.jpg", stock: 10 },
    { id:5, name: "Arroz Gallo 500gr.", price: 1575, image: "img/arroz.jpg", stock: 5 }
];

/* pruebo mostrando por consola
productos.forEach(producto => {
    console.log(`Name: ${producto.name}, Price: ${producto.price}`);
});*/

let total = 0;

//al iniciar la pagina se cargan los productos
inicializarProducts();

//funcion para mostrar los productos
function inicializarProducts(){
    const productsContainer = document.getElementById("product-container");
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });

    //agrego el evento en el boton de compra
    //document.getElementById("buttonComprar").addEventListener("click", comprar);
}

//creao cada uno de los productos que esta en el array
function createProductElement(product){
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const productName = document.createElement("h2");
    productName.textContent = product.name;

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.classList.add("product-image")
    

    const stock = document.createElement("p");
    stock.classList.add("stock");
    stock.id = `stock-count-${product.id}`;
    stock.textContent= `Stock disponible: ${product.stock}`;

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min= 0;
    quantityInput.value= 0;
    quantityInput.classList.add("quantity");
    quantityInput.id= `quantity-input-${product.id}`;

    //agrego los elementos al contenedor de productos
    productDiv.appendChild(productName);
    productDiv.appendChild(productImage);
    productDiv.appendChild(stock);
    productDiv.appendChild(quantityInput);

    return productDiv;

}

function comprar() {
    let total = 0; 
    let error = ''; 

    // trae la cantidad seleccionada por el usuario
    products.forEach((product) => {
        const quantity = parseInt(document.getElementById(`quantity-input-${product.id}`).value);

        // verifica si la cantidad es mayor que el stock disponible
        if (quantity > product.stock) {
        error += `No hay suficiente stock de ${product.name}. Disponible: ${product.stock}.<br>`;
    } 
        else {
        //calculo el total de la compra
        total += quantity * product.price;
        //resto el stock
        if(product.stock >= quantity){
            product.stock -= quantity;
            document.getElementById(`stock-count-${product.id}`).textContent =  `Stock disponible: ${product.stock}`;
        }
    }

    });

        // Obtiene el elemento con el id mensaje
    const mensajeDiv = document.getElementById('message');
    
    // Si hay errores, muestra los errores en mensajeDiv.
    if (error) {
        mensajeDiv.innerHTML = `<p id="error">${error}</p>`;
    } 
    // Si no hay errores, muestra el total de la compra en mensajeDiv
    else {
       mensajeDiv.innerHTML = `<p id="total">El total de su compra es $${total}</p>`;
    }
}

