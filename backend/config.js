export const PORT = 3005;

const mongoDBPassword = process.env.MONGODBSSR;

export const mongoDBURL = `mongodb+srv://rootuser:${mongoDBPassword}@cluster0.l59m1uj.mongodb.net/ssr-database?retryWrites=true&w=majority&appName=AtlasApp`;
