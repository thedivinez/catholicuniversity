import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD
    }
});

const insertOne = async (table: string, data: Object) => {
    try {
        const results = await db.query(`INSERT INTO ${table} (${Object.keys(data)}) VALUES(?)`, [Object.values(data)]);
        await db.end();
        return results;
    } catch (error) {
        return error;
    }
}

export default async function excuteQuery(query: string, values?: any[]) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results as any[];
    } catch (error) {
        return [error] as any[];
    }
}

export { insertOne }