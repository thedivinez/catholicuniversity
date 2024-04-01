import { v4 as uuid } from "uuid"
import excuteQuery, { insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Notifications(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const notification = { ...req.body, id: uuid() }
        await insertOne("notifications", notification);
        res.status(200).send({ data: notification })
    } else if (req.method == "GET") {
        const notifications = await excuteQuery(`SELECT * FROM notifications WHERE supervisor='${req.query.uid}'`)
        res.status(200).send({ data: notifications })
    } else {
        await excuteQuery(`DELETE FROM notifications WHERE id='${req.query.uid}'`)
        res.status(200).send({ data: "notifications has been deleted" })
    }
};