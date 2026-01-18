export class FeedResponseDto {
    stockSymbol: string;
    stockName: string;
  
    sentiment: "bullish" | "neutral" | "bearish";
  
    summary: string;
  
    keyDrivers: string[];
  
    marketContext: string;
  
    riskFactors: string[];
  
    whyItMatters: string;
  
    confidenceScore: number;
  
    sources: {
      type: "news" | "price";
      title?: string;
      url?: string;
    }[];
  
    createdAt: Date;
  
    type: "INITIAL" | "SCHEDULED";
  }
  