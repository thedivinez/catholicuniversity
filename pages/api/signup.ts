import { v4 as uuid } from "uuid"
import excuteQuery, { insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    try {
        const student = await excuteQuery(`SELECT * FROM existingdb WHERE regNumber='${req.body.regNumber}'`)
        if (student.length != 0) {
            const supervisor = await excuteQuery(`SELECT * FROM existingdb WHERE regNumber='${req.body.regNumber}'`)
            if (supervisor.length != 0) {
                await insertOne("users", { id: uuid(), ...req.body, userType: "student" });
                res.status(200).send("user has been created")
            } else {
                res.status(403).send("Invalid supervisor EC Number please check and try again")
            }
        } else {
            res.status(403).send("Invalid student Reg Number please check and try again")
        }
    } catch (error) {
        res.status(403).send(error)
        console.log(error);
    }
};