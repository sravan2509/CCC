const dotenv=require('dotenv').config({path: './.env'});
export const APP_PORT = process.env.APP_PORT;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;