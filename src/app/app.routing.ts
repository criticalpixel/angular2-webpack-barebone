import { ModuleWithProviders } from  '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes : Routes = [
	{path: '', component: HomeComponent },
	// {path: 'about', loadChildren: './+about/about.module#AboutModule' },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders =  RouterModule.forRoot(routes);
