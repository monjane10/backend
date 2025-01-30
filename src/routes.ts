/**
 * Autor: Lourenço Monjane
 */
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
} from 'fastify';
import {CreateNutritionController} from "./controllers/CreateNutritionController"


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
        let responseText = "```json\n{\n  \"nome\": \"Lourenco\",\n  \"sexo\": \"masculino\",\n  \"idade\": 23,\n  \"altura\": 1.70,\n  \"peso\": 65,\n  \"objetivo\": \"emagrecer\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"07:00\",\n      \"nome\": \"Pequeno-almoço\",\n      \"alimentos\": [\n        \"1 chávena de aveia com leite magro\",\n        \"1 peça de fruta (maçã ou banana)\",\n        \"1 colher de sopa de sementes de chia\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Meio da manhã\",\n      \"alimentos\": [\n        \"1 iogurte magro com frutos vermelhos\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoço\",\n      \"alimentos\": [\n        \"150g de salmão grelhado\",\n        \"1 chávena de brócolos cozidos no vapor\",\n        \"1/2 chávena de arroz integral\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche\",\n      \"alimentos\": [\n        \"1 fatia de queijo magro\",\n        \"1 pequena chávena de frutos secos (amêndoas ou nozes)\"\n      ]\n    },\n    {\n      \"horario\": \"20:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de frango grelhado\",\n        \"1 chávena de salada verde com azeite e vinagre\",\n        \"1 batata doce média assada\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Proteina whey (30g por dia)\",\n    \"Creatina (5g por dia - opcional)\"\n  ]\n}\n```"
        try{
            //Extração do json
            let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

            return reply.send(jsonString);
           
        } catch(error){
            console.log(error);
        }
        
    }
    );

    fastify.post("/create", async(request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateNutritionController().handle(request, reply);
    });

}