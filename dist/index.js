"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(5),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
const todoSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    done: zod_1.z.boolean(),
    userId: zod_1.z.number(),
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const zodData = userSchema.parse(data);
        const response = yield prisma.user.create({
            data: zodData
        });
        console.log(response);
        res.status(200).send({
            message: "Data inserted Successfully",
        });
    }
    catch (e) {
        res.status(404).send({
            message: `Error!!! data is not able to inserted ${e}`,
        });
    }
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const zodData = todoSchema.parse(data);
        const response = yield prisma.todos.create({
            data: zodData
        });
        console.log(response);
        res.status(200).send({
            message: "Data inserted Successfully",
        });
    }
    catch (e) {
        res.status(404).send({
            message: `Error!!! data is not able to inserted ${e}`,
        });
    }
}));
app.get("/getTodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.id;
        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
            throw new Error("Invalid user ID");
        }
        const response = yield prisma.todos.findMany({
            where: {
                id: userIdNumber,
            }
        });
        console.log(userId);
        console.log(userIdNumber);
        console.log(response);
        res.status(200).send({
            message: "Data inserted Successfully",
        });
    }
    catch (e) {
        res.status(404).send({
            message: `Error!!! data is not able to inserted ${e}`,
        });
    }
}));
app.listen(3000);
