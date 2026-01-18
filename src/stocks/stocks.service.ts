import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockApiService } from 'src/integrations/stock-api/stock-api.service';
import { NewsApiService } from 'src/integrations/news-api/news-api.service';

@Injectable()
export class StocksService {
  constructor(private stockApiService: StockApiService, private readonly newsAPiService: NewsApiService) {    
  }
  create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }

  findAll() {
    return `This action returns all stocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }

  stockData(symbol:string){
    console.log("I'm symbol",symbol);
   return this.stockApiService.getStockQuote(symbol); 
  }

  getStockChartdetails(symbol:string){
    return this.stockApiService.getStockChart(symbol);
  }

  getStockNews(symbol:string){
    return this.newsAPiService.getAllStockNews(symbol);
  }

}
