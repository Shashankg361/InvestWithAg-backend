import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stocksService.findAll();
  }

  @Get('/getstockdata')
  getStocksData(@Query('symbol') symbol:string){
    return this.stocksService.stockData(symbol);
  }

  @Get('/getchartdetails')
  getChartdetails(@Query('symbol') symbol:string){
    console.log("I'm symbol",symbol);
    return this.stocksService.getStockChartdetails(symbol);
  }

  @Get('/stocksnews')
  getStocksNews(@Query('symbol') symbol:string){
    return this.stocksService.getStockNews(symbol);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
