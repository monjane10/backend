import { DataProps } from '../controllers/CreateNutritionController';
import OpenAI from 'openai';

class CreateNutritionService {
    async execute({ name, weight, height, age, gender, level, goal }: DataProps): Promise<{ data?: unknown; message?: string }> {
        try {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) {
                return { message: 'OPENAI_API_KEY nao configurada no backend.' };
            }

            const openai = new OpenAI({ apiKey });
            const prompt = `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${goal}, atualmente nivel de atividade: ${level}. Ignore qualquer outro parametro que nao seja os passados. Retorne em json com as propriedades: nome, sexo, idade, altura, peso, objetivo, refeicoes (array de objetos com horario, nome, alimentos) e suplementos (array). Nao retorne texto fora do json e nao use acentos.`;
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            });

            const jsonText = response.choices[0].message.content;

            if (!jsonText) {
                return { message: 'Nenhuma resposta valida foi gerada pela IA.' };
            }

            const jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
            try {
                const jsonObject = JSON.parse(jsonString);
                return { data: jsonObject };
            } catch (parseError) {
                console.error('Erro ao parsear JSON da IA:', parseError, jsonString);
                return { message: 'Erro ao interpretar resposta da IA.' };
            }
        } catch (err) {
            console.error('Erro IA', err);
            return { message: 'Erro ao processar a solicitacao.' };
        }
    }
}

export { CreateNutritionService };