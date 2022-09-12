import { Sequelize } from "sequelize";

if(process.env.DB_URI === undefined) {
    throw new Error("Unable to find db uri");
}
    
export const sequelize = new Sequelize(process.env.DB_URI!);