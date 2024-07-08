const getData = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(respuesta.statusText);
    }
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getData;
