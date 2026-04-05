const botonesAgregar = document.querySelectorAll('.agregar');
const listaCarrito = document.getElementById('lista-carrito');
const totalTexto = document.getElementById('total');
const carrito = document.getElementById('carrito');
const toggleBtn = document.getElementById('toggleCarrito');
const formCompra = document.getElementById('form-compra');

let productosCarrito = [];
let total = 0;

// Agregar productos
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const producto = boton.parentElement;
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseInt(producto.querySelector('p').textContent.replace(/\$|\./g, ''));

    productosCarrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  productosCarrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} - $${item.precio.toLocaleString('es-AR')} <button onclick="eliminar(${index})">X</button>`;
    listaCarrito.appendChild(li);
  });
  totalTexto.textContent = `Total: $${total.toLocaleString('es-AR')}`;
}

function eliminar(index) {
  total -= productosCarrito[index].precio;
  productosCarrito.splice(index, 1);
  actualizarCarrito();
}

// Mostrar / ocultar carrito
toggleBtn.addEventListener('click', () => {
  carrito.classList.toggle('oculto');
});

document.getElementById("btnFactura").addEventListener("click", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const metodo = document.getElementById("metodo").value;

  if (!nombre || !apellido || !correo || !metodo) {
    alert("Por favor completá todos los campos antes de generar la factura.");
    return;
  }

  const carritoItems = document.querySelectorAll("#lista-carrito li");
  if (carritoItems.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let facturaTexto = "===== FACTURA DE COMPRA =====\n\n";
  facturaTexto += `Cliente: ${nombre} ${apellido}\n`;
  facturaTexto += `Correo: ${correo}\n`;
  facturaTexto += `Método de pago: ${metodo}\n`;
  facturaTexto += `Fecha: ${new Date().toLocaleString()}\n\n`;
  facturaTexto += "Productos:\n";

  let total = 0;

  carritoItems.forEach(item => {
    const texto = item.textContent.replace("X", "").trim();
    facturaTexto += `- ${texto}\n`;

    const match = texto.match(/\$(\d+[\.\d]*)/);
    if (match) total += parseFloat(match[1].replace(".", ""));
  });

  facturaTexto += `\nTotal a pagar: $${total.toLocaleString('es-AR')}\n`;
  facturaTexto += "\n¡Gracias por tu compra!\n";

  const blob = new Blob([facturaTexto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "factura.txt";
  enlace.click();
});

// Botón subir
const btnSubir = document.getElementById("btnSubir");

// subir suavemente al hacer clic
btnSubir.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// mostrar u ocultar según el scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnSubir.style.display = "block";
  } else {
    btnSubir.style.display = "none";
  }
});
