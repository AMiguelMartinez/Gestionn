import pgDatabase from "../database/pgDatabase.js";
import hash from "@adonisjs/core/src/hash";

class loginController {

  async register({request, response}){
      const {email, password} = request.body();

      const newpass = await hash.make(password);

      const respuesta = await pgDatabase.query('insert into usuario (email, password) values ($1, $2)', [email, newpass]);

      console.log(respuesta.rowCount);

      if (respuesta.rowCount > 0) {

          return response.json({mensaje: 'Usuario registrado'});

      } else {
        return response.json({mensaje: 'Error al registrar usuario'});
      }


  }

  async login({request, response}){
    const {email, password} = request.body();

    const respuesta = await pgDatabase.query('select * from usuario where email = $1', [email]);


    if (respuesta.rows.length > 0) {
        const hashedPassword = respuesta.rows[0].password;
        const valido = await hash.verify(hashedPassword, password);

        if (valido) {
            return response.json({mensaje: 'Usuario logueado'});
        } else {
            return response.json({mensaje: 'Contraseña incorrecta'});
        }

    } else {
        return response.json({mensaje: 'Usuario no encontrado'});
    }

  }




}

export default loginController;