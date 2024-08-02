// Array de productos
const products = [
    { id:1, name: "Aceite de oliva Don Bosco 1 l.", price: 1949, image: "img/aceite.png", stock: 25 },
    { id:2, name: "Fideos mostacholes Luchetti 500gr.", price: 1600, image: "img/fideos.png", stock: 20 },
    { id:3, name: "Mayonesa Hellmann's 475gr.", price: 1555, image: "img/mayonesa.png", stock: 15 },
    { id:4, name: "Harina Pureza Leudante 1kg.", price: 1429, image: "img/harina.png", stock: 10 },
    { id:5, name: "Arroz Gallo 500gr.", price: 1575, image: "img/arroz.png", stock: 5 }
];


let total = 0;

// se cargan los productos al iniciar la pagina
inicializarProducts();

// Funcion para mostrar los productos en la pagina
function inicializarProducts(){
    const productsContainer = document.getElementById("product-container"); // Contenedor donde se muestran los productos
    products.forEach(product => {
        const productElement = createProductElement(product); // Crea un elemento para cada producto
        productsContainer.appendChild(productElement); // Agrega el producto al contenedor
    });

}

// Crea un elemento HTML para cada producto
function createProductElement(product){
    const productDiv = document.createElement("div"); // Crea un contenedor para el producto
    productDiv.classList.add("product");

    const productName = document.createElement("h2"); // crea el titulo del producto
    productName.textContent = product.name;

    const productImage = document.createElement("img"); // crea la imagen del producto
    productImage.src = product.image;
    productImage.classList.add("product-image");
    
    const productPrice = document.createElement("p"); // crea el precio del producto
    productPrice.classList.add("price");
    productPrice.id = `price-count-${product.id}`;
    productPrice.textContent= `Precio: $${product.price}`;

    const stock = document.createElement("p"); // crea el stock disponible del producto
    stock.classList.add("stock");
    stock.id = `stock-count-${product.id}`;
    stock.textContent= `Stock disponible: ${product.stock}`;

    const quantityInput = document.createElement("input"); // input para seleccionar la cantidad
    quantityInput.type = "number";
    quantityInput.min= 0;
    quantityInput.value= 0;
    quantityInput.classList.add("quantity");
    quantityInput.id= `quantity-input-${product.id}`;
    quantityInput.addEventListener("input", validateInput);

    // Agrega todos los elementos al contenedor de producto
    productDiv.appendChild(productName);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(stock);
    productDiv.appendChild(quantityInput);
   

    return productDiv;

}

//Funcion que valida el contenido del input
function validateInput(event) {
    const quantityInput = event.target;
    // valida si el valor no es un número
    if (isNaN(quantityInput.value)) {
        quantityInput.value = '';
    }
    // valida si el valor es un negativo
    if (quantityInput.value < 0) {
        quantityInput.value = 0;
    }
}

// Funcion para la compra
function comprar() {
    let total = 0; // Total de la compra
    let error = ''; // Mensajes de error cuando no hay stock


    // Recorre cada producto y procesa la compra
    products.forEach((product) => {
        const quantity = parseInt(document.getElementById(`quantity-input-${product.id}`).value); // trae la cantidad seleccionada

        // Verifica si la cantidad ingresada es mayor que el stock disponible
        if (quantity > product.stock) {
            error += `No hay suficiente stock de ${product.name}. Disponible: ${product.stock}.<br>`;
        } else {
            // sino calcula el total de la compra
            total += quantity * product.price;
        
            // Actualiza el stock
            if(product.stock >= quantity){
                product.stock -= quantity;
                document.getElementById(`stock-count-${product.id}`).textContent =  `Stock disponible: ${product.stock}`;
            }
            
        }

    });

    // elemento para mostrar el mensaje
    const mensajeDiv = document.getElementById('message');
    
    // Muestra los errores o el total de la compra
    if (error) {
        mensajeDiv.innerHTML = `<p id="error">${error}</p>`;
    } 
    else {
       mensajeDiv.innerHTML = `<p id="total">El total de su compra es $${total}</p>`;
    }
}

