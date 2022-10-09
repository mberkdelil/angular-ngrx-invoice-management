import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArsivGelenFaturaListesiComponent } from './components/arsiv-fatura/arsiv-gelen-fatura-listesi/arsiv-gelen-fatura-listesi.component';
import { ArsivGidenFaturaListesiComponent } from './components/arsiv-fatura/arsiv-giden-fatura-listesi/arsiv-giden-fatura-listesi.component';
import { ArsivGelenIrsaliyeListesiComponent } from './components/arsiv-irsaliye/arsiv-gelen-irsaliye-listesi/arsiv-gelen-irsaliye-listesi.component';
import { ArsivGidenIrsaliyeListesiComponent } from './components/arsiv-irsaliye/arsiv-giden-irsaliye-listesi/arsiv-giden-irsaliye-listesi.component';
import { FaturaOlusturComponent } from './components/fatura/fatura-olustur/fatura-olustur.component';
import { GelenFaturaListesiComponent } from './components/fatura/gelen-fatura-listesi/gelen-fatura-listesi.component';
import { GidenFaturaListesiComponent } from './components/fatura/giden-fatura-listesi/giden-fatura-listesi.component';
import { GelenIrsaliyeListesiComponent } from './components/irsaliye/gelen-irsaliye-listesi/gelen-irsaliye-listesi.component';
import { GidenIrsaliyeListesiComponent } from './components/irsaliye/giden-irsaliye-listesi/giden-irsaliye-listesi.component';
import { IrsaliyeOlusturComponent } from './components/irsaliye/irsaliye-olustur/irsaliye-olustur.component';

const routes: Routes = [
  {
    path: "fatura-islemleri/fatura-olustur", component: FaturaOlusturComponent
  },
  {
    path: "fatura-islemleri/gelen-fatura-listesi", component: GelenFaturaListesiComponent
  },
  {
    path: "fatura-islemleri/giden-fatura-listesi", component: GidenFaturaListesiComponent
  },
  {
    path: "arsiv-fatura-islemleri/arsiv-gelen-fatura-listesi", component: ArsivGelenFaturaListesiComponent
  },
  {
    path: "arsiv-fatura-islemleri/arsiv-giden-fatura-listesi", component: ArsivGidenFaturaListesiComponent
  },
  {
    path: "irsaliye-islemleri/irsaliye-olustur", component: IrsaliyeOlusturComponent
  },
  {
    path: "irsaliye-islemleri/gelen-irsaliye-listesi", component: GelenIrsaliyeListesiComponent
  },
  {
    path: "irsaliye-islemleri/giden-irsaliye-listesi", component: GidenIrsaliyeListesiComponent
  },
  {
    path: "arsiv-irsaliye-islemleri/arsiv-gelen-irsaliye-listesi", component: ArsivGelenIrsaliyeListesiComponent
  },
  {
    path: "arsiv-irsaliye-islemleri/arsiv-giden-irsaliye-listesi", component: ArsivGidenIrsaliyeListesiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
