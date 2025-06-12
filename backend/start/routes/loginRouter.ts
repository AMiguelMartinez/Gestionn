import router from "@adonisjs/core/services/router";
import loginController from "../../app/controller/loginController.js";

const login = new loginController()
router.post('/register', login.register);
router.post('/login', login.login);