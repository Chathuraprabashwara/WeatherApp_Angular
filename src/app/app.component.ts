import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private weatherService: WeatherService){
 
  }
  cityName: string = 'colombo';
  weatherData?: WeatherData;
  temperture?: number;
  min_temperture?:number;
  max_temperture?:number;


  converttoCelcius(temp: number): number {
    return( (temp -32)  * 5/9)
  }


  ngOnInit(): void {
this.getWeatherData(this.cityName)
  }

  onSubmit() {
this.getWeatherData(this.cityName)
this.cityName ='';
  }
  private getWeatherData(cityName: string){

    this.weatherService.getWeatherData(cityName).subscribe({
      next: (Response) => {
        console.log(Response)
        this.weatherData = Response;
        this.temperture = this.converttoCelcius(Response.main.temp)
        this.min_temperture = this.converttoCelcius(Response.main.temp_min)
        this.max_temperture = this.converttoCelcius(Response.main.temp_max)
      }
    })
  }

}
