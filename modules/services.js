import getData from "../helpers/getData.js";

const URL_API = "http://localhost:3000/";

const endpoints = {
  productos: `${URL_API}productos`,
  categorias: `${URL_API}categorias`,
  registroCompras: `${URL_API}registroCompras`,
};

export async function obtenerCategorias() {
  try {
    const dataCategoria = await getData(endpoints.categorias);
    return dataCategoria;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtenerProductos() {
  try {
    const productos = await getData(endpoints.productos);
    return productos;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function filtrarProductosPorCategoria(nombreCategoria) {
  try {
    const url = `${endpoints.productos}?categorias=${nombreCategoria}`;
    const productosFiltrados = await getData(url);
    return productosFiltrados;
  } catch (error) {
    console.error(error);
    return null;
  }
}
