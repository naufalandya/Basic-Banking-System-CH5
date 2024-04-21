import app from "./index";
import dotenv from 'dotenv';
dotenv.config({path : './.env'})
import { cekpw } from "./src/auth/token.auth";

const PORT : number = Number(process.env.PORT) || 5102

app.listen(PORT, ()=>{
    console.log(`Server berjalan di PORT ${PORT}`)
    cekpw("55555")
})