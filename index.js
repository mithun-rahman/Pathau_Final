import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());         // middlewar

app.use('/users', usersRoutes);


app.get('/', (req, res) => {
    res.send("Hello From Page");
})

app.listen(PORT, () => console.log(`Server is Running in : http://localhost:${PORT}`));