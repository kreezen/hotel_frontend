import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { API_ENDPOINT, postgresConfig } from 'src/data/api/api_endpoints';
import { HttpClientModule } from '@angular/common/http';
import { PostgresDbService } from 'src/data/api/postgres_db';
import { PostgresKundeRepository } from 'src/data/repositories/postgres_kunden_repo_impl';
import { ListKundeComponent } from './list-kunde/list-kunde.component';
import { KundeMainComponent } from './kunde-main/kunde-main.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    KundeMainComponent
  ],
  providers: [
    { provide: API_ENDPOINT, useValue: postgresConfig.apiEndpoint },
    PostgresDbService,
    PostgresKundeRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
