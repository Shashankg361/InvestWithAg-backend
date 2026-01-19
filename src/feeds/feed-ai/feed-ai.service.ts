import { Injectable } from '@nestjs/common';
import { ChatOllama } from '@langchain/ollama';
import { FeedAiContext } from '../interface/Feed.interface';
import { PromptTemplate } from '@langchain/core/prompts';

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
 
    // async generateFeed(input: {
    //     stock: any;
    //     news: any;
    //     isInitial: boolean;
    //     }) {
    //     return {
    //         sentiment: "neutral",
    //         summary: "Feed generation placeholder",
    //         keyDrivers: [], 
    //         marketContext: "",
    //         riskFactors: [],
    //         whyItMatters: "",
    //         createdAt: new Date(),
    //         type: input.isInitial ? "INITIAL" : "SCHEDULED",
    //     };
    // } 

    private readonly promptTemplate = `
    You are a financial feed writer.

    Rules:
    - Write only 2 to 3 short lines
    - Simple, neutral language
    - No investment advice
    - No emojis
    - Do not repeat headlines
    - Focus on meaning, not numbers

    Company: {companyName}
    Symbol: {symbol}
    Stock Movement: {direction} ({priceChangePercent}%)

    Recent News Headlines:
    {newsHeadlines}

    News Summary:
    {newsSummary}

    Generate a concise market feed update.
    `;

    async generateFeed(context: FeedAiContext) { 
        const prompt = new PromptTemplate({
          template: this.promptTemplate,
          inputVariables: [
            'companyName',
            'symbol',
            'direction',
            'priceChangePercent',
            'newsHeadlines',
            'newsSummary'
          ]
        });
      
        const formattedPrompt = await prompt.format({
          ...context,
          newsHeadlines: context.newsHeadlines.join('\n- ')
        });
      
        const response = await this.llm.invoke(formattedPrompt);
        return response.content;
      }

    generateFeedAiContext(param:any){
        const {stockContext, newsContext} = param
        console.log("I'm param",param);
        const aiContext: FeedAiContext = {
            companyName: stockContext.companyName,
            symbol: stockContext.symbol,
            priceChangePercent: stockContext.priceChangePercent,
            direction: stockContext.direction,
            newsHeadlines: newsContext.headlines,
            newsSummary: newsContext.combinedSummary
          };

          return this.generateFeed(aiContext);

    }
}
