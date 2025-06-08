import presiController from "../../app/controller/presiController.js";
import Router from "@adonisjs/core/services/router";

const presi = new presiController()
Router.get('/presi', presi.obtenerPresi);
Router.post('/presi', presi.crearPresi);
Router.put('/presi/:dni', presi.actualizarPresi);
Router.delete('/presi/:dni', presi.eliminarPresi);
