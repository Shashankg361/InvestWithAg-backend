import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StockApiService {
  private readonly BASE_URL = 'https://yahoo-finance15.p.rapidapi.com';
  private readonly API_KEY = process.env.RAPIDAPI_KEY;

  /** ---------------- Get Stock Quote ---------------- */
  async getStockQuote(symbol: string) {
    const url = `${this.BASE_URL}/api/yahoo/qu/quote/${symbol}`;
  
    try {
      const { data } = await axios.get(url, {
        headers: {
          'x-rapidapi-key': this.API_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      });
  
      const q = data?.body?.[0];
  
      if (!q) {
        throw new NotFoundException(`No quote data found for ${symbol}`);
      }
  
      return {
        symbol: q.symbol,
        name: q.longName ?? q.shortName,
        price: q.regularMarketPrice,
        currency: q.currency,
        change: q.regularMarketChange,
        changePercent: q.regularMarketChangePercent,
        high: q.regularMarketDayHigh,
        low: q.regularMarketDayLow,
        open: q.regularMarketOpen,
        previousClose: q.regularMarketPreviousClose,
        volume: q.regularMarketVolume,
        marketState: q.marketState,
      };
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Yahoo Finance API blocked this quote');
    }
  }
  

  /** ---------------- Search Stocks ---------------- */
  async searchStocks(query: string) {
    const url = `${this.BASE_URL}/api/v1/markets/search?q=${query}`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          'x-rapidapi-key': this.API_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      });

      if (!data?.body) return [];

      return data.body.map((item) => ({
        symbol: item.symbol,
        name: item.name,
        type: item.type,
        exchange: item.exchange,
      }));
    } catch {
      return [];
    }
  }

/** ---------------- Historical Chart ---------------- */
async getStockChart(symbol: string) {
  const url = `${this.BASE_URL}/api/v1/markets/stock/history?ticker=${symbol}&interval=1d`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        'x-rapidapi-key': this.API_KEY,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
      },
    });

    const rawData = data?.body;

    if (!rawData || typeof rawData !== "object") {
      throw new NotFoundException(`Invalid chart response for ${symbol}`);
    }

    /** Convert object → array */
    const candles = Object.keys(rawData).map((timestamp) => {
      const c = rawData[timestamp];
      return {
        timestamp: Number(timestamp) * 1000, // convert seconds → ms
        date: c.date,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
        volume: c.volume,
      };
    });

    /** Sort ascending by time */
    candles.sort((a, b) => a.timestamp - b.timestamp);

    return candles;

  } catch (err) {
    console.log(err.response?.data);
    throw new NotFoundException(`Unable to fetch chart data for ${symbol}`);
  }
}

  

}

