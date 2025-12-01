const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const recipeRoutes = require('./routes/recipeRoutes');
const app = express();

app.use(express.json());
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server runnning in PORT ${PORT}`);
});