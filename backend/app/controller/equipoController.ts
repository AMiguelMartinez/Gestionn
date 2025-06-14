import pgDatabase from "../database/pgDatabase.js";

class equipoController {
  async obtenerEquipo({params, request,response}){
    const id = params.codigo
    const result = await pgDatabase.query('select * from equipo')
    console.log(result.rows)
    return response.json({mensaje:result.rows})
  }  

  async crearEquipo({ request, response }) {
    const { nombre, anio_fund,codigo } = await request.body();
    await pgDatabase.query('INSERT INTO equipo (nombre, anio_fund,codigo) VALUES ($1, $2, $3)', [nombre, anio_fund,codigo]);
    return response.json({ mensaje: 'El equipo fue creado' });
  }

  async actualizarEquipo({ request, response }) {
    const { codigo, nombre, anio_fund } = await request.body();
    await pgDatabase.query('UPDATE equipo SET nombre = $2, anio_fund = $3 WHERE codigo = $1', [codigo, nombre, anio_fund]);
    return response.json({ mensaje: 'El equipo ha sido actualizado' });
  }

  async eliminarEquipo({ params, response }) {
    const id = params.codigo; // ✅ Usar correctamente el parámetro
    await pgDatabase.query('DELETE FROM equipo WHERE codigo = $1', [id]); // ✅ Corregido: borrar de "equipo"
    return response.json({ mensaje: 'Equipo eliminado' });
  }

  async listarNombre({ request, response }) {
    const { nombre } = await request.body();
    const res = await pgDatabase.query('SELECT * FROM equipo WHERE nombre ILIKE $1', [`%${nombre}%`]);
    return response.json({ mensaje: res.rows });
  }

  async listarAnio({ request, response }) {
    const { anio_fund } = await request.body();
    const res = await pgDatabase.query('SELECT * FROM equipo WHERE anio_fund = $1', [anio_fund]);
    return response.json({ mensaje: res.rows });
  }

  async filtroNombre({ request, response }) {
    const { nombre } = await request.body();
    const res = await pgDatabase.query(
      `SELECT equipo.* FROM equipo JOIN presidente ON equipo.dni_presi = presidente.dni WHERE presidente.nombre ILIKE $1`,
      [`%${nombre}%`]
    );
    return response.json({ mensaje: res.rows });
  }
}

export default equipoController;
