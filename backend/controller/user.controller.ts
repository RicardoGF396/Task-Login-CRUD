import { pool } from "../db";
import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;
    const result = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    /* Esto es necesario para poder interactuar con el objeto de tipo usuario */
    const user = JSON.parse(JSON.stringify(result[0]));
    if (user.length === 0) {
      return res.json({ error: "User or password incorrect" });
    } else {
      /* Creamos un token a partir del id del usuario */
      const id = user[0].id;
      const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: "1d" });
      /* Lo guardamos en las cookies de la app para posteriormente poder acceder a ella y hacer comprobaciones */
      res.cookie("token", token);
      return res.json(result);
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const dashboard = async (req: Request, res: Response) => {
  try {
    return res.json({Status: "Success"})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    return res.json({Status: "Success"})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const countUser = async (req: Request, res: Response) => {
  try{
    const result = await pool.query("SELECT COUNT(id) AS ADMIN_COUNT FROM users");
    res.json(result[0])
  }catch(error){
  return res.status(500).json({
    message: error
  })
  }
}