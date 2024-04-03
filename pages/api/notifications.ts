import { v4 as uuid } from "uuid"
import excuteQuery, { db, insertOne } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Notifications(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const notification = { ...req.body, id: uuid() }
        await insertOne("notifications", notification);
        res.status(200).send({ data: notification })
    } else if (req.method == "GET") {
        let supervisor = req.query.uid
        await db.query("SELECT * FROM users WHERE regNumber=?", [req.query.uid], async (error: any, user: any) => {
            if (error) throw error;
            if (user[0].userType == "student") { supervisor = user[0].supervisor }
            await db.query("SELECT * FROM notifications WHERE supervisor=?", [supervisor], async (error: any, notifications: any) => {
                if (error) throw error;
                return res.status(200).send({ data: notifications })
            })
        });
    } else {
        await excuteQuery(`DELETE FROM notifications WHERE id='${req.query.uid}'`)
        res.status(200).send({ data: "notifications has been deleted" })
    }
};