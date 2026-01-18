import { Injectable } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';

@Injectable()
export class FeedAiService {
    private llm = new ChatOllama({
        model: 'gpt-oss:120b-cloud',
        temperature: 0.3
    })

    async test(){
        const res = await this.llm.invoke('Say hello in one line');
        return res.content;
    }

    async generateFeed(input: {
        stock: any;
        news: any;
        isInitial: boolean;
        }) {
        return {
            sentiment: "neutral",
            summary: "Feed generation placeholder",
            keyDrivers: [], 
            marketContext: "",
            riskFactors: [],
            whyItMatters: "",
            createdAt: new Date(),
            type: input.isInitial ? "INITIAL" : "SCHEDULED",
        };
    } 
}
