import createData from "../helpers/createData.js";
import deleteData from "../helpers/deleteData.js";
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
    // const url = `${endpoints.productos}?categorias=${nombreCategoria}`;
    // const productosFiltrados = await getData(url);
    const productos = await obtenerProductos();
    const productosFiltrados = productos.filter((item) =>
      item.categorias.includes(nombreCategoria)
    );
    return productosFiltrados;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function crearProducto(nuevoProducto) {
  try {
    const producto = await createData(endpoints.productos, nuevoProducto);
    alert("El producto se ha guardado exitosamente");
    return producto;
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error en la creación del producto");
    return null;
  }
}

export async function eliminarProducto(idProducto) {
  try {
    const url = `${endpoints.productos}/${idProducto}`;
    const resultado = await deleteData(url);
    console.log(resultado);
    alert("El producto se ha eliminado exitosamente");
  } catch (error) {
    console.error(error);
    alert("Ha ocurrido un error al eliminar el producto");
  }
}
