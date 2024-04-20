import app from "./index";
import dotenv from 'dotenv';
dotenv.config({path : './.env'})

const PORT : number = Number(process.env.PORT) || 5102

app.listen(PORT, ()=>{
    console.log(`Server berjalan di PORT ${PORT}`)
})