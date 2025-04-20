import {Router} from "express";
import {obtenerPacientes, crearPaciente, ActualizarPaciente, EliminarPaciente} from "../controller/ProductController.js";

const router = Router();

router.get("/pacientes", obtenerPacientes);
router.post("/pacientes", crearPaciente);
router.put("/pacientes/:id", ActualizarPaciente);
router.delete("/pacientes/:id", EliminarPaciente);

export default router;
