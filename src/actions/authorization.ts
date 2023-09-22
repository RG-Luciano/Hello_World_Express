import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'SecretKey';

const loginUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log("Recebido: username =", username, "password =", password);

    const users = [
        { id: 1, username: 'user1', password: '123' },
        { id: 2, username: 'user2', password: '123' },
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Incorret User or Password' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
};

export default {
    loginUser,
};
