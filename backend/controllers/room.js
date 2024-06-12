import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getDefaultRoom = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q ="SELECT workspace_id FROM trader_dairy_db.creating_workspace where user_id=?";
        db.query(q, [req.cookies.user_id], (err, data) => {
            const workspace_id = data[0].workspace_id;

            const q ="SELECT * FROM trader_dairy_db.tables where workspace_id=?";
            db.query(q, [workspace_id], (err, tables) => {

                const q ="SELECT workspace_id,name FROM trader_dairy_db.workspaces w inner join trader_dairy_db.creating_workspace c on w.id=c.workspace_id where user_id = ?";
                db.query(q, [req.cookies.user_id], (err, workspaces) => {
                    return res.status(200).json(
                        {tables: tables,
                        workspaces: workspaces});
                });
            });
        }); 
    });
}

export const getRoomByID = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const workspace_id = req.params.id;

        const q ="SELECT * FROM trader_dairy_db.tables where workspace_id=?";
        db.query(q, [workspace_id], (err, tables) => {
            return res.status(200).json(tables);
        });
    });
}

export const createWorkspace = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const user_id = req.cookies.user_id;
        const workspace_name = req.body.name;

        const q = "INSERT INTO trader_dairy_db.workspaces(`name`) VALUES(?)";
        db.query(q, [workspace_name], (err, data) => {
            if (err) return res.json(err);
            const workspace_id = data.insertId;
            const q = "INSERT INTO trader_dairy_db.creating_workspace(`user_id`, `workspace_id`) VALUES(?)";
            const values = [user_id, workspace_id];
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json ("Workspace has been created!");
            });
        }); 
    });
}

export const deleteWorkspace = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const workspace_id = req.params.id;

        const q = "SELECT id FROM tables where workspace_id=?";
        db.query(q, [workspace_id], (err, data) => {
            if (err) return res.json(err);
            for(let i = 0; i < data.length; i++){
                let table_id = data[i].id
                const q = "DELETE FROM deals WHERE table_id=?";
                db.query(q, [table_id], (err, data) => {
                    if (err) return res.json(err);
                })
                
                const q2 = "DELETE FROM tables WHERE id=?";
                db.query(q2, [table_id], (err, data) => {
                    if (err) return res.json(err);
                })
            }
            const q2 = "DELETE FROM creating_workspace WHERE workspace_id=?";
            db.query(q2, [workspace_id], (err, data) => {
                if (err) return res.json(err);
                const q3 = "DELETE FROM workspaces WHERE id=?";
                db.query(q3, [workspace_id], (err, data) => {
                    if (err) return res.json(err);
                    return res.status(200).json ("Workspace has been delted");
                }); 
            });
        }); 
        
    });
}

export const updateWorkspace = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const workspace_id = req.params.id;
        const workspace_name = req.body.name;

        const q ="UPDATE workspaces SET name = ? WHERE id = ?";
        db.query(q, [workspace_name, workspace_id], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Workspace has been updated");
        }); 
    });
}

export const shareWorkspace = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const workspace_id = req.body.workspace_id;
        const username = req.body.username;

        const q ="SELECT * FROM trader_dairy_db.users WHERE email = ?";
        db.query(q, [username], (err, data) => {
            if (err) return res.json(err);
            if (!data.length) return res.json("User was not found");
            const user_id = data[0].id
            const q = "INSERT INTO creating_workspace (`user_id`, `workspace_id`) VALUES(?)";
            const values = [user_id, workspace_id];
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json("Workspace has been shared");
            });
        }); 
    });
}