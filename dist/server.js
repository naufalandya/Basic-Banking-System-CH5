"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const PORT = Number(process.env.PORT) || 5102;
index_1.default.listen(PORT, () => {
    console.log(`Server berjalan di PORT ${PORT}`);
});
