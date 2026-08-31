import express from 'express';
import cors from 'cors';
import './config/db';
import gameRoutes from './routes/gameRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/api/favorites', gameRoutes);
app.use('/api/auth', authRoutes);   

app.listen(port, () => {
    console.log(`Server listening on port ${port} and starting at http://localhost:${port}`)
});

export default app;