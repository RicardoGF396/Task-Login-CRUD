import { Router } from "express";
import multer from "multer";
import path from "path";
import { countEmployee, createEmployee, deleteEmployee, editEmployee, getEmployees, salarySum, updateEmployee } from "../controller/employee.controller";

/* Se asigna la ruta a guardar de las imágenes y el nombre del archvio así como su extensión */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

/* Asignamos cuál va a ser el almacenamiento de las imágenes */
const upload = multer({ storage: storage })

const router = Router();

router.post("/create", upload.single("image"),createEmployee);

router.get("/all", getEmployees)
router.get("/count", countEmployee)
router.get("/salary", salarySum)
router.get("/get_employee/:id", editEmployee)
router.put("/update_employee/:id", updateEmployee)
router.delete("/delete_employee/:id", deleteEmployee)




export default router;
