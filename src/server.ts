import app from './app';
import { AppDataSource } from './data-source';

// Conexão com o banco de dados:
AppDataSource.initialize()
  .then((): void => {
    console.log('Database connected.');

    const PORT: number = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on https://localhost:${PORT}`);
    });
  })
  .catch((err: unknown): void => {
    console.error('Error during Data Source initialization', err);
  });
