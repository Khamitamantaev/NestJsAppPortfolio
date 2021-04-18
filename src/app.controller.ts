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
    var uri = `mongodb://127.0.0.1:27017/${params.city}`;
    const conn = mongoose.createConnection(uri);
    const SightModel = conn.model('Sight', Sight);
    const sight = new SightModel( { name: "Best", description: "My name is Khamit", architect: "Khamit" });
    sight.save();
    console.log('db has been created!')
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':cityname/sights')
  findOne(@Param() params): string {
    console.log(params.cityname);
    var uri = `mongodb://127.0.0.1:27017/${params.cityname}`;
    const conn = mongoose.createConnection(uri);
    const SightModel = conn.model('Sight', Sight);
    var sights = SightModel.find({}, (err, allSights) => {
      if (err) console.error(err);
      console.log(allSights);
    });
    return sights;
  }
}
