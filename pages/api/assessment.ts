import excuteQuery, { insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Assessment(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        await insertOne("assessment", req.body);
        res.status(200).send("new week has been added")
    } else if (req.method == "GET") {
        const tasks = await excuteQuery(`SELECT * FROM assessment WHERE regNumber='${req.query.uid}'`)
        res.status(200).send({ data: tasks })
    } else {
        await excuteQuery(`DELETE FROM assessment WHERE id='${req.query.uid}'`)
        res.status(200).send({ data: "task has been deleted" })
    }
};