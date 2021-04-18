import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
var mongoose = require('mongoose');
var Sight = require('./sight.chema');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('createcity/:city')
  createCity(@Param() params): void {
    console.log(`You create a city with name: ${params.city}`);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':cityname/sights')
  findOne(@Param() params): string {
    console.log(params.cityname);
    var uri = `mongodb://127.0.0.1:27017/${params.cityname}`;

    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
    const conn = mongoose.createConnection(uri);

    const SightModel = conn.model('Sight', Sight);

    var sights = SightModel.find({}, (err, allSights) => {
      if (err) console.error(err);

      console.log(allSights);
    });

    return sights;
  }
}
