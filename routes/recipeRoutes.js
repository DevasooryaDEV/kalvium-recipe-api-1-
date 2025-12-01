const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/recipes.json');

const readFile = () => {
    const recipes = fs.readFileSync(filePath);
    return JSON.parse(recipes);
};

const writeFile = (recipes) => {
    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
};

router.get('/', (req, res) => {
    try{
        const recipes = readFile();
        res.json(recipes);
    }catch(err) {
        return res.status(404).json({error: 'recipes not found!!'});
    }
});

router.post('/', (req, res) => {
    const {title, ingredients, instructions, cookTime, difficulty} = req.body;

    if(!title || !ingredients || !instructions) {
        return res.status(404).json({error: 'title, ingredients, instructions are required'});
    }
    const newRecipe = {
        id: Date.now(),
        title,
        ingredients,
        instructions,
        cookTime: cookTime || "Not specified",
        difficulty: difficulty || "medium"
    }
    recipes.push(newRecipe);
    writeFile(newRecipe);

    res.status(201).json(newRecipe);
});

module.exports = router;