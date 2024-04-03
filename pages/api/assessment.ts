import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import excuteQuery, { insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Assessment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const task = { id: uuid(), ...req.body }
        await insertOne("assessment", task);
        res.status(200).send({ data: { task: task, message: "new week has been added" } })
    } else if (req.method == "GET") {
        await db.query("SELECT * FROM assessment WHERE regNumber=?", [req.query.uid], (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send({ data: result })
        });
    } else if (req.method == "PATCH") {
        await db.query(`UPDATE assessment SET ? WHERE id=?`, [req.body, req.body.id], (error: any, result: any) => {
            if (error) throw error;
            res.status(200).send({ data: { task: req.body, message: "task has been updated" } })
        });
    } else {
        await excuteQuery(`DELETE FROM assessment WHERE id='${req.query.uid}'`)
        res.status(200).send({ data: "task has been deleted" })
    }
};