import fs from 'fs';

const usersFile = './users.json';

export const getUsers =() => {
if (!fs.existsSync(usersFile)) 
    fs.writeFileSync(usersFile, JSON.stringify([]));

const data = fs.readFileSync(usersFile);
return JSON.parse(data);
}

export const saveUsers = (users) => {
fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}