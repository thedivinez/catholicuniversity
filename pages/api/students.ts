import excuteQuery from "@/lib/db";
import { Student } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Students(req: NextApiRequest, res: NextApiResponse) {
    try {
        let students: Student[] = []
        const users = await excuteQuery(`SELECT * FROM users WHERE supervisor='${req.query.uid}'`)
        if (users.isNotEmpty()) {
            for (let user of users) {
                const existingdb = await excuteQuery(`SELECT * FROM existingdb WHERE regNumber='${user.regNumber}'`)
                students.push({
                    phone: existingdb[0].phone,
                    email: existingdb[0].email,
                    id: existingdb[0].regNumber,
                    programme: existingdb[0].programme,
                    name: `${existingdb[0].firstName} ${existingdb[0].lastName}`,
                })
            }
        }
        res.status(200).send({ data: students })
    } catch (error) {
        res.status(403).send({ data: "failed to fetch students" })
    }
};