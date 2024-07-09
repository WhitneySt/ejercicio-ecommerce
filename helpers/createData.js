const createData = async (url, nuevaData) => {
  try {
    const opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaData),
    };
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) throw new Error(respuesta.statusText);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createData;
