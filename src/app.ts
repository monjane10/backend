import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { routes } from './routes';

// Cria e configura a instancia do Fastify sem iniciar o servidor.
export function buildApp() {
  dotenv.config();

  const app = Fastify({ logger: true });

  app.setErrorHandler((error, _request, reply) => {
    reply.code(400).send({ message: error.message });
  });

  app.register(cors);
  app.register(routes);

  return app;
}
