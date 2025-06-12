import pgDatabase from "../database/pgDatabase.js";

class equipoController {
  async obtenerEquipo({params, request,response}){
    const id = params.codigo
    const result = await pgDatabase.query('select * from equipo')
    console.log(result.rows)
    return response.json({mensaje:result.rows})
  }  

  async crearEquipo({params, request,response}){
    const {nombre, anio_fund} = request.body()
    const resul = await pgDatabase.query('insert into equipo (nombre, anio_fund) values ($1, $2)', [nombre, anio_fund])
    console.log(resul)
    return response.json({mensaje: 'El equipo fue creado'})
}

 async actualizarEquipo({params, request, response}){
    const {codigo, nombre, anio_fund} = request.body()
    const res = await pgDatabase.query('update equipo set nombre=$2, anio_fund=$3 where codigo=$1', [codigo, nombre, anio_fund])
    console.log(res)
    return response.json({mensaje: 'El equipo ha sido actualizado'})
 }

 async eliminarEquipo({params, request, response}){
    const id = params.codigo
    const res2= await pgDatabase.query('delete from equipo where codigo=$1', [id])
    return response.json({mensaje: 'El equipo fue borrado'})
 }

 async listarNombre({params, request, response}){
    const { nombre } = request.body()
    const res = await pgDatabase.query('select * from equipo where nombre ilike $1', [`%${nombre}%`])
    return response.json({mensaje: res.rows})
 }
    
 async listarAnio({params, request, response}){
    const { anio_fund } = request.body()
    const res = await pgDatabase.query('select * from equipo where anio_fund = $1', [anio_fund])
    return response.json({mensaje: res.rows})
 }

 async filtroNombre({params, request, response}){
    const {nombre} = request.body()
    const res = await pgDatabase.query(' SELECT equipo.* FROM equipoJOIN presidente ON equipo.dni_presi = presidente.dni WHERE presidente.nombre ILIKE $1',[`%${nombre}%`])
    return response.json({mensaje:res.rows})
 }


}
export default equipoController;