import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpModule } from '@angular/http';
import { AboutComponent } from './about.component';
import { aboutRouting } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    aboutRouting,
    HttpModule
  ],
  declarations: [
    AboutComponent
  ],
  providers: []
})
export class AboutModule { }
