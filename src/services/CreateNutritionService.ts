/**
 * Autor: Lourenço Monjane
 */
import { DataProps } from '../controllers/CreateNutritionController';
import { GoogleGenerativeAI } from '@google/generative-ai';

class CreateNutritionService {
    async execute({ name, weight, height, age, gender, level, goal }: DataProps): Promise<{ data?: string, message?: string }> {
        try {
            const genAi = new GoogleGenerativeAI(process.env.API_KEY!);
            const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
            const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${goal}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json,nenhuma propriedade pode ter acento e use o portugues de portugal.
`);
            console.log(JSON.stringify(response, null, 2));
            const candidates = response?.response?.candidates;
            if (Array.isArray(candidates) && candidates.length > 0) {
                const jsonText = candidates[0].content.parts[0].text as string;
                console.log('Texto gerado pela IA:', jsonText);
                //Extração do json
            let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();
            let jsonObject = JSON.parse(jsonString);
                return { data: jsonObject };
            } else {
                return { message: 'Nenhuma resposta válida foi gerada pela IA.' };
            }

        } catch (err) {
            console.error("Erro JSON", err);
            return { message: 'Erro ao processar a solicitação.' };
        }
    }
}

export { CreateNutritionService };
