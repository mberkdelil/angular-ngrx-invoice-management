import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { FaturaOlusturComponent } from './components/fatura/fatura-olustur/fatura-olustur.component';
import { GidenFaturaListesiComponent } from './components/fatura/giden-fatura-listesi/giden-fatura-listesi.component';
import { GelenFaturaListesiComponent } from './components/fatura/gelen-fatura-listesi/gelen-fatura-listesi.component';
import { ArsivGelenFaturaListesiComponent } from './components/arsiv-fatura/arsiv-gelen-fatura-listesi/arsiv-gelen-fatura-listesi.component';
import { ArsivGidenFaturaListesiComponent } from './components/arsiv-fatura/arsiv-giden-fatura-listesi/arsiv-giden-fatura-listesi.component';
import { IrsaliyeOlusturComponent } from './components/irsaliye/irsaliye-olustur/irsaliye-olustur.component';
import { GelenIrsaliyeListesiComponent } from './components/irsaliye/gelen-irsaliye-listesi/gelen-irsaliye-listesi.component';
import { GidenIrsaliyeListesiComponent } from './components/irsaliye/giden-irsaliye-listesi/giden-irsaliye-listesi.component';
import { ArsivGelenIrsaliyeListesiComponent } from './components/arsiv-irsaliye/arsiv-gelen-irsaliye-listesi/arsiv-gelen-irsaliye-listesi.component';
import { ArsivGidenIrsaliyeListesiComponent } from './components/arsiv-irsaliye/arsiv-giden-irsaliye-listesi/arsiv-giden-irsaliye-listesi.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './redux/reducer';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FaturaOlusturComponent,
    GidenFaturaListesiComponent,
    GelenFaturaListesiComponent,
    ArsivGelenFaturaListesiComponent,
    ArsivGidenFaturaListesiComponent,
    IrsaliyeOlusturComponent,
    GelenIrsaliyeListesiComponent,
    GidenIrsaliyeListesiComponent,
    ArsivGelenIrsaliyeListesiComponent,
    ArsivGidenIrsaliyeListesiComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    StoreModule.forRoot(rootReducer),
    ToastrModule.forRoot({
      timeOut: 3500,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
