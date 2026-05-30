// Arreglo de datos para las experiencias de DATE BOX
let listaCombos = [
  { id: 1, nombre: "Box Romance Premium (Champaña & Bombones)", categoria: "Champaña y Dulces", precio: 380.00, stock: 6, imagen: "combo1.jpeg" },
  { id: 2, nombre: "Box Friends Night Out (Snacks & Compartir)", categoria: "Para Amigos / Compartir", precio: 250.00, stock: 10, imagen: "producto.amigos.jpeg" },
  { id: 3, nombre: "Box Sweet Date (Mix de Golosinas & Globos)", categoria: "Golosinas Mix", precio: 145.00, stock: 15, imagen: "mix.jpeg" },
  { id: 4, nombre: "Box Picnic Chic (Vino Tinto, Quesos & Galletas)", categoria: "Edición Especial", precio: 320.00, stock: 4, imagen: "parejas.jpeg" }
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  actualizarInterfaz();
});

function actualizarInterfaz() {
  renderarCatalogo();
  renderizarCarrito();
}

// Renderiza los productos dentro del contenedor idéntico al de referencia
function renderarCatalogo() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  listaCombos.forEach(combo => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-combo";
    
    const estaAgotado = combo.stock === 0;
    const textoBoton = estaAgotado ? "Agotado" : "Agregar al Carrito";
    const estiloAtributo = estaAgotado ? "disabled style='opacity: 0.5; background-color: #ccc; cursor: not-allowed;'" : "";

    // SE CORRIGIÓ AQUÍ: Agregamos la etiqueta img apuntando a combo.imagen
    tarjeta.innerHTML = `
      <img src="${combo.imagen}" alt="${combo.nombre}" class="imagen-producto">
      <h3>${combo.nombre}</h3>
      <p style="font-size: 0.85rem; color: #666; font-style: italic;">${combo.categoria}</p>
      <p class="precio-tag">Q${combo.precio.toFixed(2)}</p>
      <p style="margin-bottom: 15px; font-size: 0.9rem;">Disponibles: ${combo.stock} unidades</p>
      <button onclick="agregarAlCarrito(${combo.id})" class="boton-agregar" ${estiloAtributo}>
        ${textoBoton}
      </button>
    `;
    contenedor.appendChild(tarjeta);
  });
}

function agregarAlCarrito(id) {
  const combo = listaCombos.find(c => c.id === id);
  
  if (!combo || combo.stock <= 0) {
    alert("Lo sentimos, esta experiencia se encuentra temporalmente agotada.");
    return;
  }

  const itemEnCarrito = carrito.find(item => item.id === id);
  
  if (itemEnCarrito) {
    if (itemEnCarrito.cantidad >= combo.stock) {
      alert("Has alcanzado el límite máximo de unidades disponibles para este Box.");
      return;
    }
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...combo, cantidad: 1 });
  }

  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedorCarrito = document.getElementById("contenido-carrito");
  const totalPago = document.getElementById("total-pago");
  
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
    totalPago.textContent = "0.00";
    return;
  }

  contenedorCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const divItem = document.createElement("div");
    divItem.className = "item-carrito";
    divItem.innerHTML = `
      <span><strong>${item.nombre}</strong> (x${item.cantidad})</span>
      <strong>Q${subtotal.toFixed(2)}</strong>
    `;
    contenedorCarrito.appendChild(divItem);
  });

  totalPago.textContent = total.toFixed(2);
}

function simularCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Elige una experiencia del catálogo primero.");
    return;
  }

  carrito.forEach(itemCarrito => {
    const comboReal = listaCombos.find(c => c.id === itemCarrito.id);
    if (comboReal) {
      comboReal.stock -= itemCarrito.cantidad;
    }
  });

  alert("¡Compra procesada con éxito! Disfruta al máximo de tu DATE BOX. Las existencias han sido actualizadas.");
  
  carrito = [];
  actualizarInterfaz();
}