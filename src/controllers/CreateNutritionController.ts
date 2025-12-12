import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateNutritionService } from '../services/CreateNutritionService';

export interface DataProps {
    name: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    level: string;
    goal: string;
}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, weight, height, age, gender, level, goal } = request.body as DataProps;

        const create = new CreateNutritionService();

        const createNutrition = await create.execute({
            name,
            weight,
            height,
            age,
            gender,
            level,
            goal,
        });

        return reply.type('application/json').send(createNutrition);
    }
}

export { CreateNutritionController };
