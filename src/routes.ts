import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
} from 'fastify';
import { CreateNutritionController } from './controllers/CreateNutritionController';

export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.get('/teste', (_request: FastifyRequest, reply: FastifyReply) => {
        const responseData = {
            nome: 'Lourenco',
            sexo: 'masculino',
            idade: 23,
            altura: 1.7,
            peso: 65,
            objetivo: 'emagrecer',
            refeicoes: [
                {
                    horario: '07:00',
                    nome: 'Pequeno-almoco',
                    alimentos: [
                        '1 chavena de aveia com leite magro',
                        '1 maca ou banana',
                        '1 colher de sopa de sementes de chia',
                    ],
                },
                {
                    horario: '10:00',
                    nome: 'Meio da manha',
                    alimentos: ['1 iogurte magro com frutos vermelhos'],
                },
                {
                    horario: '13:00',
                    nome: 'Almoco',
                    alimentos: [
                        '150g de salmao grelhado',
                        '1 chavena de brocolos cozidos no vapor',
                        '1/2 chavena de arroz integral',
                    ],
                },
                {
                    horario: '16:00',
                    nome: 'Lanche',
                    alimentos: [
                        '1 fatia de queijo magro',
                        '1 pequena chavena de frutos secos (amendoas ou nozes)',
                    ],
                },
                {
                    horario: '20:00',
                    nome: 'Jantar',
                    alimentos: [
                        '150g de frango grelhado',
                        '1 chavena de salada verde com azeite e vinagre',
                        '1 batata doce media assada',
                    ],
                },
            ],
            suplementos: ['Proteina whey (30g por dia)', 'Creatina (5g por dia - opcional)'],
        };

        return reply.type('application/json').send(responseData);
    });

    fastify.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNutritionController().handle(request, reply);
    });
}