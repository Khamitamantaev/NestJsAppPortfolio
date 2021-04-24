import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Model } from 'mongoose';
var Sight = require('./sight.chema');

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}
  getHello(): string {
    return 'Hello to Portfolio App!';
  }

  createCity(city):void {
    var conn2 = this.connection.useDb(city)
    const SightModel = conn2.model('Sight', Sight);
    const sight = new SightModel( { name: "Best", description: "My name is Khamit", architect: "Khamit" });
    sight.save();
    console.log('db has been created!')
  }

  getSights(city): typeof Sight {

    var conn2 = this.connection.useDb(city)
    const SightModel = conn2.model('Sight', Sight);
    var sights = SightModel.find({}, (err, allSights) => {
      if (err) console.error(err);
      console.log(allSights);
    });
   return sights
  }


}
