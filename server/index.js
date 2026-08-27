import express from 'express';
import cors from 'cors';
import './config/db.js';
import gameRoutes from './routes/gameRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use('/api/favorites', gameRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port} and starting at http://localhost:${port}`)
});

export default app;