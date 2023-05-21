import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NfseService } from './service/nfse.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MomentFormComponent } from './components/moment-form/moment-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    HeaderComponent,
    MomentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NfseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
