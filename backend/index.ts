import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import employeeRoutes from "./routes/employee.routes";
import {PORT} from "./config";
import cookieParser from "cookie-parser"
import {
    DB_URL
  } from "./config";

const app = express();

app.use(express.json());
/* Modificamos el cors por defecto para que pueda identificar el origen, los métodos y que las credenciales esten activas */
app.use(cors(
    {
        origin: [`${DB_URL}`],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))

app.use("/api/users",userRoutes);
app.use("/api/employees", employeeRoutes);


app.listen(PORT, () => {
    console.log("Server Running");
})