import { NextFunction, Request, Response, Router } from "express";
import { countUser, dashboard, login, logout } from "../controller/user.controller";
import jwt, { VerifyErrors } from "jsonwebtoken";

const router = Router();
/* Con esto revisamos que exista el token que se tuvo que haber generado en el login */
const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "You are not authenticated"})
    }else {
        jwt.verify(token, "jwt-secret-key", (err: VerifyErrors | null, decoded: any) => {
            if(err){
                return res.json({Error: "Wrong Token"});
                next();
            }
        })
    }
}

router.post("/login", login);
router.get("/dashboard", verifyUser, dashboard);
router.get("/logout", logout);
router.get("/count", countUser);
export default router;