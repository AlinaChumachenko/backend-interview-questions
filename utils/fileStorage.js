import fs from 'fs';

const usersFile = './users.json';

export const getUsers =() => {
if (!fs.existsSync(usersFile)) 
    fs.writeFileSync(usersFile, JSON.stringify([]));

const data = fs.readFileSync(usersFile, 'utf-8');
return JSON.parse(data);
}

export const saveUsers = (users) => {
fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

const questionsFile = './questions.json';

export const getQuestionsData = () => {
    if (!fs.existsSync(questionsFile )) {
        fs.writeFileSync(questionsFile, JSON.stringify([]))
    }

    const data = fs.readFileSync(questionsFile , 'utf-8');
    return JSON.parse(data);
}

export const saveQuestionsData = (data) => {
    fs.writeFileSync(questionsFile, JSON.stringify(data, null, 2)); 
  };

  const categoriesFile = './categories.json';

  export const getCategories = () => {
    if (!fs.existsSync(categoriesFile )) {
        fs.writeFileSync(categoriesFile, JSON.stringify([]))
    }

    const data = fs.readFileSync(categoriesFile , 'utf-8');
    return JSON.parse(data);
}

export const saveCategories = (data) => {
    fs.writeFileSync(categoriesFile, JSON.stringify(data, null, 2)); 
  };