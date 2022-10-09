import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { gidenIrsaliyeListesi } from 'src/app/models/invoice.model';

@Component({
  selector: 'app-arsiv-giden-irsaliye-listesi',
  templateUrl: './arsiv-giden-irsaliye-listesi.component.html',
  styleUrls: ['./arsiv-giden-irsaliye-listesi.component.css']
})
export class ArsivGidenIrsaliyeListesiComponent implements OnInit {

  selected = 'Select Actions';

  gidenFaturaListesi: gidenIrsaliyeListesi[] = [];

  displayedColumns: string[] = ["irsaliyeNo", "tckn", "adSoyad", "vergiDairesi", "eposta", "telefon", "irsaliyeDurumu", "işlemler"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private store: Store<{ invoice: any }>) {
    this.store.select("invoice").subscribe((x: any) => {
      this.dataSource = new MatTableDataSource(x.archiveOutgoingWaybillList);
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
