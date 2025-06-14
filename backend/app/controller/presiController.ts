import pgDatabase from "../database/pgDatabase.js";

class presiController {
  async crearPresi({ request, response }) {
    const { dni, nombre } = request.body();
    const res = await pgDatabase.query(
      "INSERT INTO presidente (dni, nombre) VALUES ($1, $2)",
      [dni, nombre]
    );
    console.log(res);
    return response.json({ mensaje: "Presidente creado" });
  }

  async obtenerPresi({ response }) {
    const res = await pgDatabase.query("SELECT * FROM presidente");
    console.log(res);
    return response.json({ mensaje: res.rows });
  }

  async obtenerPresiPorDni({ params, response }) {
    const { dni_presi } = params;

    try {
      const res = await pgDatabase.query(
        "SELECT * FROM presidente WHERE dni = $1",
        [dni_presi]
      );

      if (res.rows.length === 0) {
        return response.status(404).json({ mensaje: "Presidente no encontrado" });
      }

      return response.json(res.rows[0]);
    } catch (error) {
      console.error("Error al obtener presidente por DNI:", error);
      return response.status(500).json({ mensaje: "Error en el servidor" });
    }
  }

  async actualizarPresi({ request, params, response }) {
    const { nombre } = request.body();
    const { dni_presi } = params;

    const res = await pgDatabase.query(
      "UPDATE presidente SET nombre = $1 WHERE dni = $2",
      [nombre, dni_presi]
    );
    console.log(res);
    return response.json({ mensaje: "El presidente ha sido actualizado" });
  }

  async eliminarPresi({ params, request, response }) {
  const dni = params.dni_presi;
  const resu = await pgDatabase.query("DELETE FROM presidente WHERE dni = $1", [dni]);
  console.log(resu);
  return response.json({ mensaje: `El presidente del dni ${dni} ha sido eliminado` });
}

}

export default presiController;