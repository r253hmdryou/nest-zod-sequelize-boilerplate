import { Sequelize } from 'sequelize';
const uri = process.env.RDB_URI_ADMIN;
export const sequelize = new Sequelize(uri!, {
  logging: false,
});
