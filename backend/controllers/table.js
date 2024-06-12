import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getTable = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const table_id = req.params.id;

        const q ="SELECT format FROM tables where id=?";
        db.query(q, [table_id], (err, data) => {
            let tableFormat = data[0].format;
            if(tableFormat === "full"){tableFormat = "email,market,setup,long_or_short,session,result,plan_impuls,profit,short_description,notes,emotion_before,emotion_during,power_of_emotion,mistake,ideas,right_actions,link,comments"};
            const q =`SELECT ${tableFormat} FROM deals w inner join trader_dairy_db.users c on w.user_id=c.id where table_id =?`;
            db.query(q, [table_id], (err, data) => {
                if(!data.length){return res.status(200).json("Table is empty")}
                try{
                    const headersArray = Object.keys(data[0]);
                    const headers = [];
                    
                    for(const item of headersArray){
                        const tmpObj = {};
                        tmpObj["id"] = item;
                        tmpObj["label"] = item;
                        tmpObj["accessor"] = item;
                        tmpObj["minWidth"] = 25;
                        tmpObj["dataType"] = "text";
                        tmpObj["options"] = [];
                        headers.push(tmpObj);
                    }

                    return res.status(200).json({
                        columns: headers,
                        data: data,
                        skipReset: false
                    });
                }catch(err){
                    return res.status(404).json("Table not found")
                }
            });
        }) 
    });
}

export const createTable = (req,res)=>{
  const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        let tableFormat = req.body.tableFormat;
        if (!tableFormat){tableFormat = "full"}

        const q = "INSERT INTO tables(`name`, `workspace_id`, `format`, `description`) VALUES(?)";
            const values = [req.body.tableName, req.body.workspace_id, tableFormat, req.body.tableDescription];
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json ("Table has been created!");
            });
    });

}

export const getTableInfo = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const table_id = req.query.table_id;

        const q ="SELECT * FROM tables where id=?";
        db.query(q, [table_id], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json(data[0]);

        }) 
    });
}

export const editTable = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const table_id = req.params.id;

        let tableFormat = req.body.tableFormat;
        if (!tableFormat){tableFormat = "full"}

        const q = "UPDATE tables SET `name` = ?, `format` = ?, `description` = ? WHERE `id` = ?";
        const values = [req.body.tableName, tableFormat, req.body.tableDescription, table_id];
        db.query(q, values, (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json ("Table has been updated!");
        });
    });
}

export const deleteTable = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const table_id = req.params.id;

        const q = "DELETE FROM deals WHERE table_id=?";
        db.query(q, [table_id], (err, data) => {
            if (err) return res.json(err);

            const q = "DELETE FROM tables WHERE id=?";
            db.query(q, [table_id], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json ("Table has been delted");
            })
        })
    });
}