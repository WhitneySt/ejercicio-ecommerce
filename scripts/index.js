//-----funciones

import {
  crearProducto,
  eliminarProducto,
  filtrarProductosPorCategoria,
  obtenerCategorias,
  obtenerProductos,
} from "../modules/services.js";

const pintarCategorias = (listaCategorias, contenedor) => {
  contenedor.innerHTML = ""; //Esta línea no debería ser implementada si en el HTML está contenido otro botón (por ejem. El botón que quita el filtrado)
  listaCategorias.forEach((categoria) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.setAttribute("src", `../assets/${categoria.imagen}`);
    img.setAttribute("alt", categoria.nombre);

    figcaption.textContent = categoria.nombre;
    img.style.backgroundColor = categoria.color;

    button.addEventListener("click", async () => {
      const productosFiltrados = await filtrarProductosPorCategoria(
        categoria.nombre
      );
      pintarProductos(productosFiltrados);
    });

    figure.appendChild(img);
    figure.appendChild(figcaption);

    button.appendChild(figure);
    li.appendChild(button);
    contenedor.appendChild(li);
  });
};

const pintarProductos = (listaProductos, contenedor = "") => {
  const contenedorProductos = contenedor
    ? contenedor
    : document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";
  listaProductos.forEach((producto) => {
    const card = document.createElement("article");
    const figure = document.createElement("figure");
    const imagen = document.createElement("img");
    const h3 = document.createElement("h3");
    const div = document.createElement("div");
    const acciones = document.createElement("div");
    const editar = document.createElement("button");
    const eliminar = document.createElement("button");

    editar.textContent = "Editar";
    eliminar.textContent = "Eliminar";

    eliminar.addEventListener("click", async () => {
      const confirmacion = confirm(
        "Esta acción es irreversible ¿Está seguro que desea eliminar el producto?"
      );
      if (confirmacion) {
        await eliminarProducto(producto.id);
        const productos = await obtenerProductos();
        pintarProductos(productos);
      }
    });

    editar.addEventListener("click", () => {
      console.log(`Quiero editar este producto: ${producto.id}`);
    });

    imagen.setAttribute("src", producto.imagenes[0]);
    imagen.setAttribute("alt", producto.nombre);
    h3.textContent = producto.nombre;

    div.innerHTML = `
        <figure>
            <img src="../assets/star.svg" alt="estrella">
            <figcaption>${producto.puntuacion}</figcaption>
        </figure>
        <span>$ ${producto.precioUnitario}</span>
      `;
    figure.appendChild(imagen);
    acciones.appendChild(editar);
    acciones.appendChild(eliminar);
    card.classList.add("card");
    card.appendChild(figure);
    card.appendChild(h3);
    card.appendChild(div);
    card.appendChild(acciones);
    contenedorProductos.appendChild(card);
  });
};

const mostrarModal = (callback) => {
  const modal = document.createElement("div");
  const article = document.createElement("article");
  const botonCerrar = document.createElement("button");

  modal.id = "modal";
  botonCerrar.innerHTML = "&times;";
  botonCerrar.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  callback(article);

  modal.classList.add("modal");
  botonCerrar.classList.add("cerrar");
  article.appendChild(botonCerrar);
  modal.appendChild(article);
  document.body.appendChild(modal);
};

const cerrarModal = () => {
  const modal = document.getElementById("modal");
  if (modal) document.body.removeChild(modal);
};

const insertarOpciones = async (select) => {
  const categorias = await obtenerCategorias();
  categorias.forEach((item) => {
    const option = document.createElement("option");

    option.textContent = item.nombre;
    option.value = item.nombre;

    select.appendChild(option);
  });
};

const insertarContador = (contenedor) => {
  const div = document.createElement("div");
  const incremento = document.createElement("button");
  const decremento = document.createElement("button");
  const inputCantidad = document.createElement("input");

  incremento.setAttribute("type", "button");
  decremento.setAttribute("type", "button");
  incremento.textContent = "+";
  decremento.textContent = "-";
  inputCantidad.id = "cantidadEnStock";
  inputCantidad.setAttribute("name", "cantidadEnStock");
  inputCantidad.value = 1;

  incremento.addEventListener("click", () => {
    inputCantidad.value++;
  });

  decremento.addEventListener("click", () => {
    if (inputCantidad.value > 1) {
      inputCantidad.value--;
    }
  });

  div.classList.add("contador");
  div.appendChild(decremento);
  div.appendChild(inputCantidad);
  div.appendChild(incremento);
  contenedor.appendChild(div);
};

const insertarFormulario = (contenedor) => {
  const form = document.createElement("form");
  const boton = document.createElement("button");
  // const div = document.createElement("div");
  // const incremento = document.createElement("button");
  // const decremento = document.createElement("button");
  // const inputCantidad = document.createElement("input");

  const labelCategoria = document.createElement("label");
  const select = document.createElement("select");
  const primeraOpcion = document.createElement("option");

  boton.setAttribute("type", "submit");
  boton.textContent = "Enviar";

  // incremento.textContent = "+";
  // decremento.textContent = "-";
  // inputCantidad.id = "cantidadEnStock";
  // inputCantidad.setAttribute("name", "cantidadEnStock");
  // inputCantidad.value = 1;

  select.id = "categorias";
  select.setAttribute("name", select.id);
  labelCategoria.textContent = "Categorias";
  labelCategoria.setAttribute("for", select.id);
  primeraOpcion.textContent = "Seleccione una categoría";
  primeraOpcion.value = "";

  form.innerHTML = `
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ingrese el nombre del producto">

        <label for="description">Descripción</label>
        <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción del producto">
        <label for="precioUnitario">Precio unitario</label>
        <input type="text" id="precioUnitario" name="precioUnitario" placeholder="Ingrese el precio unitario del producto">

        <div>
            <figure>
                <img id="imagen" src="https://d1eipm3vz40hy0.cloudfront.net/images/SSAC-Blog/mercadotecnia-marketing-productos.jpg" alt="imagen producto">
            </figure>
            <label for="imagenes">Imagen Producto</label>
            <input type="url" id="imagenes" name="imagenes" placeholder="Ingrese una dirección de una imagen">
        </div>
        
        <label>Cantidad</label>
    `;

  const inputImagen = form.querySelector("#imagenes");
  inputImagen.addEventListener("input", () => {
    const imagen = form.querySelector("#imagen");
    imagen.setAttribute("src", inputImagen.value);
  });

  form.classList.add("formulario");
  // div.classList.add("contador");

  select.appendChild(primeraOpcion);
  insertarOpciones(select);
  // div.appendChild(decremento);
  // div.appendChild(inputCantidad);
  // div.appendChild(incremento);

  // form.appendChild(div);
  insertarContador(form);
  form.appendChild(labelCategoria);
  form.appendChild(select);
  form.appendChild(boton);

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const datos = obtenerDatosFormulario(form);
    datos.imagenes = [datos.imagenes];
    datos.categorias = [datos.categorias];
    datos.puntuacion = 0;
    const nuevoProducto = await crearProducto(datos);
    console.log(nuevoProducto);
    const productos = await obtenerProductos();
    pintarProductos(productos);
    cerrarModal();
  });
  contenedor.appendChild(form);
};

function obtenerDatosFormulario(formulario) {
  const datosFormulario = {};
  const dataForm = new FormData(formulario);
  console.log(dataForm);
  for (const [nombrePropiedad, valorPropiedad] of dataForm.entries()) {
    datosFormulario[nombrePropiedad] = valorPropiedad;
  }

  return datosFormulario;
}

//-----variables/constantes
const contenedorFiltros = document.getElementById("filtros");
const botonAgregarProducto = document.getElementById("agregarProducto");

//------ejecución
document.addEventListener("DOMContentLoaded", async () => {
  const categorias = await obtenerCategorias();
  const productos = await obtenerProductos();
  pintarCategorias(categorias, contenedorFiltros);
  pintarProductos(productos);
});

botonAgregarProducto.addEventListener("click", () => {
  mostrarModal(insertarFormulario);
});
