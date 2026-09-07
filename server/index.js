import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { attachUser } from './auth.js';
import { authRouter } from './routes/auth.js';
import { dogsRouter } from './routes/dogs.js';
import { routesRouter } from './routes/routes.js';
import { walksRouter } from './routes/walks.js';
import { chatRouter } from './routes/chat.js';
import { inventoryRouter } from './routes/inventory.js';
import { financeRouter } from './routes/finance.js';
import { usersRouter } from './routes/users.js';
import './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

app.use('/api/auth', authRouter);
app.use('/api/dogs', dogsRouter);
app.use('/api/routes', routesRouter);
app.use('/api/walks', walksRouter);
app.use('/api/chat', chatRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/finance', financeRouter);
app.use('/api/users', usersRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'No encontrado.' });
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
});

const PORT = process.env.PORT || 4173;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Paseos Juan (interno) escuchando en puerto ${PORT}`);
});
