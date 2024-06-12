import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getDeals = (req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const table_id = req.params.id;

        const q =`SELECT * FROM deals where table_id =?`;
        db.query(q, [table_id], (err, data) => {
            if(!data.length){return res.status(200).json("Table is empty")}
            try{
                return res.status(200).json(data);
            }catch(err){
                return res.status(404).json("Table not found")
            }
        });
    });
}

export const createDeal = (req,res)=>{

  const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const user_id = req.cookies.user_id;
        const table_id = req.params.id;

        let profit = req.body.profit;
        if (profit === ""){profit = null}

        let power_of_emotion = req.body.power_of_emotion;
        if (power_of_emotion === ""){power_of_emotion = null}

        const q = "INSERT INTO deals(`market`, `setup`, `long_or_short`, `session`, `result`, `plan_impuls`, `profit`, `short_description`, `notes`, `emotion_before`, `emotion_during`, `power_of_emotion`, `mistake`, `ideas`, `right_actions`, `link`, `comments`, `user_id`, `table_id`) VALUES(?)";            const values = [
              req.body.market,
              req.body.setup,
              req.body.long_or_short,
              req.body.session,
              req.body.result,
              req.body.plan_impuls,
              profit,
              req.body.short_description,
              req.body.notes,
              req.body.emotion_before,
              req.body.emotion_during,
              power_of_emotion,
              req.body.mistake,
              req.body.ideas,
              req.body.right_actions,
              req.body.link,
              req.body.comments,
              user_id,
              table_id,
            ];
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json ("Deal has been created!");
            });
    });

  }


export const editDeal = (req,res)=>{

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const deal_id = req.params.id;

        let profit = req.body.profit;
        if (profit === ""){profit = null}

        let power_of_emotion = req.body.power_of_emotion;
        if (power_of_emotion === ""){power_of_emotion = null}

        const q = "UPDATE deals SET `market` = ?, `setup` = ?, `long_or_short` = ?, `session` = ?, `result` = ?, `plan_impuls` = ?, `profit` = ?, `short_description` = ?, `notes` = ?, `emotion_before` = ?, `emotion_during` = ?, `power_of_emotion` = ?, `mistake` = ?, `ideas` = ?, `right_actions` = ?, `link` = ?, `comments` = ? WHERE `id` = ?";
            const values = [
            req.body.market,
            req.body.setup,
            req.body.long_or_short,
            req.body.session,
            req.body.result,
            req.body.plan_impuls,
            profit,
            req.body.short_description,
            req.body.notes,
            req.body.emotion_before,
            req.body.emotion_during,
            power_of_emotion,
            req.body.mistake,
            req.body.ideas,
            req.body.right_actions,
            req.body.link,
            req.body.comments,
            deal_id
            ];
            db.query(q, values, (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json ("Deal has been modified!");
            });
    });

}

export const deleteDeal = (req,res)=>{

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const deal_id = req.params.id;

        const q = "DELETE FROM deals WHERE id=?";
        db.query(q, [deal_id], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json ("Deal has been delted");
        })
    });

}