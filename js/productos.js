const productos = [
    { name: "Aceite de girasol Cocinero 1.5 l.", price: 1949, image: "img/aceite.jpg", stock: 25 },
    { name: "Fideos mostacholes Luchetti 500gr.", price: 1600, image: "img/fideos.jpg", stock: 20 },
    { name: "Mayonesa Hellmann's 475gr.", price: 1555, image: "img/mayonesa.jpg", stock: 15 },
    { name: "Harina Pureza p/ Pizza 1kg.", price: 1429, image: "img/harina.jpg", stock: 10 },
    { name: "Arroz Gallo 500gr.", price: 1575, image: "img/arroz.jpg", stock: 5 }
];

/* pruebo mostrando por consola
productos.forEach(producto => {
    console.log(`Name: ${producto.name}, Price: ${producto.price}`);
});*/


const container = document.getElementById('productos-container');

// El contenedor debe estar vacío antes de agregar productos
container.innerHTML = '';

productos.forEach(producto => {
    // Crear un contenedor para el producto
    const productoDiv = document.createElement('productEspecif');
    productoDiv.className = 'producto';

    // Crear el contenido del producto
    productoDiv.innerHTML = `
        <h2 id="nombreProduc">${producto.name}</h2>
        <p>Precio: $${producto.price}</p>
        <img src="${producto.image}" alt="${producto.name}" />
        <p>Stock: ${producto.stock}</p>
        <input id="number" type="number" value="0" min="0" max=${producto.stock}/>
    `;

    // Agregar el producto al contenedor
    container.appendChild(productoDiv);
});
