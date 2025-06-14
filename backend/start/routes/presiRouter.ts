import presiController from "../../app/controller/presiController.js";
import Router from "@adonisjs/core/services/router";

const presi = new presiController()
Router.get('/presi', presi.obtenerPresi);
Router.post('/presi', presi.crearPresi);
Router.put('/presi/:dni_presi', presi.actualizarPresi);
Router.delete('/presi/:dni_presi', presi.eliminarPresi);
Router.get('/presi/:dni_presi', presi.obtenerPresiPorDni); // 👈 NUEVA ruta GET para ver un presi por DNI
