import { v4 as uuid } from "uuid"
import { insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    try {
        await insertOne("users", { id: uuid(), ...req.body, progress: 0, userType: "student" });
        res.status(200).send("user has been created")
    } catch (error) {
        res.status(403).send(error)
        console.log(error);
    }
};