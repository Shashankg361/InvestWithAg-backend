export interface Feed {
    stockSymbol: string;
    stockName: string;
  
    sentiment: "bullish" | "neutral" | "bearish";
  
    summary: string;
  
    keyDrivers: string[];
  
    marketContext: string;
  
    riskFactors: string[];
  
    whyItMatters: string;
  
    confidenceScore: number; // 0–100 (AI confidence)
  
    sources: {
      type: "news" | "price";
      title?: string;
      url?: string;
    }[];
  
    createdAt: Date;
  
    type: "INITIAL" | "SCHEDULED";
  }
  