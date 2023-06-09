import { pool } from "../db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Employee } from "../models/employee";

export const createEmployee = async (req: Request, res: Response) => {
  const { name, email, password, address, salary }:Employee = req.body;
  try {
    const hashPassword = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    const result = await pool.query(
      "INSERT INTO employee (name, email, password, address, salary, image) VALUES (?,?,?,?,?,?)",
      [name, email, hashPassword, address, salary, req.file?.filename]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }

};

export const getEmployees = async (req: Request, res: Response) => {
  try{
    const result = await pool.query("SELECT * FROM employee");
    res.json(result[0])
  }catch(error){
    return res.status(500).json({
      message: error
    })
  }
}

export const countEmployee = async (req: Request, res: Response) => {
  try{
    const result = await pool.query("SELECT COUNT(id) AS EMPLOYEE_COUNT from employee");
    res.json(result[0])
  }catch(error){
  return res.status(500).json({
    message: error
  })
  }
}

export const salarySum = async (req: Request, res: Response) => {
  try{
    const result = await pool.query("SELECT SUM(salary) AS SALARY from employee");
    res.json(result[0])
  }catch(error){
  return res.status(500).json({
    message: error
  })
  }
}

export const editEmployee = async (req: Request, res: Response) => {
  const id = req.params.id
  try{
    const result = await pool.query("SELECT * FROM employee WHERE id = ?",
    [id]
    )
    res.json(result[0]);
  }catch(error){
    return res.status(500).json({
      message: error
    })
  }
}

export const updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {name, address, email, salary}:Employee = req.body 
  try{
    const result = await pool.query("UPDATE employee SET name = ?, address = ?, email = ?, salary = ? WHERE id = ?", 
    [name, address, email, salary, id]
    )
  res.json(result)
  }catch(error){
    return res.status(500).json({
      message: error
    })
  }
}

export const deleteEmployee = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const result = pool.query("DELETE FROM employee WHERE id = ?",
    [id]
    )
    res.json(result)
  }catch(error){
    return res.status(500).json({
      message: error
    })
  }
} 