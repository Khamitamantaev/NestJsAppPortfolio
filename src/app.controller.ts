import { Controller, Get, Param, Post ,Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
var mongoose = require('mongoose');
var Sight = require('./sight.chema');
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  @UseGuards(JwtAuthGuard)
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
  
  @UseGuards(JwtAuthGuard)
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
