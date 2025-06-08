import pgDatabase from "../database/pgDatabase.js";

class presiController {
    
    async crearPresi({params, request, response}){
    const {dni, nombre} = request.body()
    const res = await pgDatabase.query('insert into presidente (dni, nombre) values ($1, $2)', [dni, nombre])
    console.log(res)
    return response.json({mensaje: 'Presidente creado'})
 }

    async obtenerPresi({params, request, response}){

    const res = await pgDatabase.query('select * from presidente')
    console.log(res)
    return response.json({mensaje: res.rows})
 }
    
    async actualizarPresi({params, request, response}){
    const {dni, nombre} = request.body()
    const res = await pgDatabase.query('update presidente set nombre = $2 where dni = $1', [dni, nombre])
    console.log(res)
    return response.json({mensaje: 'El presidente ha sido actualizado'})
 }

async eliminarPresi({params, request, response}){
    const id = params.dni
    const res = await pgDatabase.query('delete from presidente where dni = $1', [id])
    console.log(res)
    return response.json({mensaje: 'Presidente eliminado'})
 }
 

}

export default presiController;