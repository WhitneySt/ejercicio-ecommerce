//-----funciones

import {
  filtrarProductosPorCategoria,
  obtenerCategorias,
  obtenerProductos,
} from "../modules/services.js";

const pintarCategorias = (listaCategorias, contenedor) => {
  contenedor.innerHTML = "";
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
      console.log(productosFiltrados);
    });

    figure.appendChild(img);
    figure.appendChild(figcaption);

    button.appendChild(figure);
    li.appendChild(button);
    contenedor.appendChild(li);
  });
};

const pintarProductos = (listaProductos, contenedor) => {
  contenedor.innerHTML = "";
  listaProductos.forEach((producto) => {
    const card = document.createElement("article");
    const figure = document.createElement("figure");
    const imagen = document.createElement("img");
    const h3 = document.createElement("h3");
    const div = document.createElement("div");

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

    card.classList.add("card");
    card.appendChild(figure);
    card.appendChild(h3);
    card.appendChild(div);
    contenedor.appendChild(card);
  });
};

//-----variables/constantes
const contenedorFiltros = document.getElementById("filtros");

const contenedorProductos = document.getElementById("contenedorProductos");

//------ejecución
document.addEventListener("DOMContentLoaded", async () => {
  const categorias = await obtenerCategorias();
  const productos = await obtenerProductos();
  pintarCategorias(categorias, contenedorFiltros);
  pintarProductos(productos, contenedorProductos);
});
