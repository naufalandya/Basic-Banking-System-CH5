"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const file = fs_1.default.readFileSync('./api-docs.yaml', 'utf-8');
const swaggerDocument = yaml_1.default.parse(file);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.get("/helloworld", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
const index_1 = require("./src/routes/index");
const token_auth_1 = require("./src/auth/token.auth");
app.post('/register', token_auth_1.register);
app.post('/login', token_auth_1.login);
app.use('/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api/v1/accounts", index_1.accountRouter);
app.use("/api/v1/users", index_1.userRouter);
app.use("/api/v1/transactions", index_1.transactionRouter);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});
exports.default = app;
