import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { gelenIrsaliyeListesi } from 'src/app/models/invoice.model';
import { deleteFromIncomingArchiveWaybill } from 'src/app/redux/action';

@Component({
  selector: 'app-arsiv-gelen-irsaliye-listesi',
  templateUrl: './arsiv-gelen-irsaliye-listesi.component.html',
  styleUrls: ['./arsiv-gelen-irsaliye-listesi.component.css']
})
export class ArsivGelenIrsaliyeListesiComponent implements OnInit {

  selected = 'Select Actions';

  gidenFaturaListesi: gelenIrsaliyeListesi[] = [];

  displayedColumns: string[] = ["irsaliyeNo", "tckn", "adSoyad", "vergiDairesi", "eposta", "telefon", "irsaliyeDurumu", "işlemler"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private store: Store<{ invoice: any }>) {
    this.store.select("invoice").subscribe((x: any) => {
      this.dataSource = new MatTableDataSource(x.archiveIncomingWaybillList);
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

  deleteWaybill(id: number) {
    this.store.dispatch(deleteFromIncomingArchiveWaybill({ id: id }))
  }

}
