import equipoController from "../../app/controller/equipoController.js";
import Router from "@adonisjs/core/services/router";

const equipos = new equipoController()
Router.get('/equipo',equipos.obtenerEquipo);
Router.post('/equipo', equipos.crearEquipo);
Router.put('/equipo/:codigo', equipos.actualizarEquipo);
Router.delete('/equipo/:codigo', equipos.eliminarEquipo);
Router.get('/listarN', equipos.listarNombre);
Router.get('/listarA', equipos.listarAnio);
Router.get('/filtrar', equipos.filtroNombre);