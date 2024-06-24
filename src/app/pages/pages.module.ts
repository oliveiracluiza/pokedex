import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing.module';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteListComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    FavoriteListComponent
  ],
  imports: [
    CommonModule, 
    RoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
