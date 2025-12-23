"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/users", (req, res) => {
    client_1.prisma.user.findMany()
        .then(users => {
        res.json(users);
    })
        .catch(err => {
        res.status(500).json({ error: err.message });
    });
});
app.post("/user", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
    }
    client_1.prisma.user.create({
        data: {
            username,
            password
        }
    })
        .then(user => {
        res.status(201).json(user);
    })
        .catch(err => {
        res.status(500).json({ error: err.message });
    });
});
app.listen(3001);
