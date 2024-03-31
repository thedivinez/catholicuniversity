import excuteQuery, { insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Notifications(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        await insertOne("notifications", req.body);
        res.status(200).send("new notifications has been added")
    } else if (req.method == "GET") {
        const notifications = await excuteQuery(`SELECT * FROM notifications WHERE id='${req.query.uid}'`)
        res.status(200).send({ data: notifications })
    } else {
        await excuteQuery(`DELETE FROM notifications WHERE id='${req.query.uid}'`)
        res.status(200).send({ data: "notifications has been deleted" })
    }
};