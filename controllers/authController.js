
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUsers, saveUsers } from '../utils/fileStorage.js';


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const users = getUsers();

    if (users.find(u => u.email === email)){
     return res.status(400).json({ message: 'User already exists' });
}

    const hashedPassword = await bcrypt.hash(password, 10);

   
    users.push({ username, email, password: hashedPassword });
    saveUsers(users);

    const token = jwt.sign({ username, email}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({ token}); 
}


    export const loginUser = async (req, res) => {
        const { email, password } = req.body;
        const users = getUsers();

        const user = users.find(u => u.email === email );
        if(!user) return res.status(401).json({message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({username: user.username, email}, process.env.JWT_SECRET, 
            {expiresIn: '1d'});

            res.json({token, username: user.username});
     
    }

    export const getProfile = (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No token'});

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ message: 'Welcome', user: decoded});
        } catch (error) {
            res.status(401).json({message: 'Invalid token'});
        
        }
    };

