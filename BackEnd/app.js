import express from 'express';
import morgan from 'morgan';
import errors from './middleware/errors.js';
import requestDate from './middleware/requestDate.js';
import users from './routes/usersRoutes/users.js';
import cors from 'cors';

const app = express();

app.use(express.json()); // will parse data from the body
app.use(morgan('dev')); // will console log the details of the endpoint
app.use(requestDate); // will just store the date
app.use(cors());

app.use('/users', users); // will mount the users.js file on the path /users (mounting)

app.use(errors, (req, res) => {
  res.status(404).json({
    message: 'Page not found!',
  });
});

export default app;
