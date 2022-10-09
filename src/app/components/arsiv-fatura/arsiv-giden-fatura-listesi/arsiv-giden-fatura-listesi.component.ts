import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { gelenFaturaListesi } from 'src/app/models/invoice.model';

@Component({
  selector: 'app-arsiv-giden-fatura-listesi',
  templateUrl: './arsiv-giden-fatura-listesi.component.html',
  styleUrls: ['./arsiv-giden-fatura-listesi.component.css']
})
export class ArsivGidenFaturaListesiComponent implements OnInit {

  selected = 'Select Actions';

  gidenFaturaListesi: gelenFaturaListesi[] = [];

  displayedColumns: string[] = ["faturaNo", "tckn", "adSoyad", "faturaTarihi", "toplamKdv", "odenecekTutar", "faturaTutari", "senaryoTipi", "faturaDurumu", "işlemler"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private store: Store<{ invoice: any }>) {
    this.store.select("invoice").subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.archiveOutgoingInvoiceList;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
  }

}
