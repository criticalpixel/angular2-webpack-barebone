import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string = "Angular 2 seed with Webpack 2 - Barebones";
  
  ngOnInit(): void {
  	console.log("app initialized");
  }
}
