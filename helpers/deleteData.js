const deleteData = async (url) => {
  try {
    const opciones = {
      method: "DELETE",
    };
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) throw new Error(respuesta.statusText);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default deleteData;
