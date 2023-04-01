import { Router } from "express";
import { createEmployee, deleteEmploye, getEmployees, updateEmployee, getEmployee } from "../controllers/employees.controller.js";

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)

router.post('/employees', createEmployee)

router.patch('/employees/:id', updateEmployee)

router.delete('/employees/:id', deleteEmploye)

export default router