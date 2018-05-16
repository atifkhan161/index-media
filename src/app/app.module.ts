import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ElectronService } from './electron-service.service';
import { HomeComponent } from './home/home.component';
import { MediaLinksComponent } from './media-links/media-links.component';
import { DataService } from './services/data.service';
import { LinkPipe } from './utility/link.pipe';
import { DataStore } from './services/data.store';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'media', component: MediaLinksComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MediaLinksComponent,
    LinkPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ElectronService,
    DataService,
    DataStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
