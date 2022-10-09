import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { gidenIrsaliyeListesi } from 'src/app/models/invoice.model';
import { deleteFromOutgoingWaybillList, removeToArchiveFromOutgoingWaybillList } from 'src/app/redux/action';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface jsPDFWithPlugin extends jsPDF {
  autoTable(arg0: { head: any[][]; body: any[][]; }): unknown;
}

@Component({
  selector: 'app-giden-irsaliye-listesi',
  templateUrl: './giden-irsaliye-listesi.component.html',
  styleUrls: ['./giden-irsaliye-listesi.component.css']
})
export class GidenIrsaliyeListesiComponent implements OnInit {

  selected = 'Select Actions';

  gidenFaturaListesi: gidenIrsaliyeListesi[] = [];

  displayedColumns: string[] = ["irsaliyeNo", "tckn", "adSoyad", "vergiDairesi", "eposta", "telefon", "irsaliyeDurumu", "işlemler"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private store: Store<{ invoice: any }>, private toastr: ToastrService) {
    this.store.select("invoice").subscribe((x: any) => {
      this.dataSource = new MatTableDataSource(x.outgoingWaybillList);
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

  printDocument(waybill: any) {
    this.toastr.info(`Waybill with id number ${waybill.irsaliyeNo} is being printed`)
  }

  deleteWaybill(id: number) {
    this.store.dispatch(deleteFromOutgoingWaybillList({ id: id }))
  }

  removeToArchive(waybill: any) {
    this.store.dispatch(removeToArchiveFromOutgoingWaybillList({ waybill: waybill }));
    this.deleteWaybill(waybill.irsaliyeNo)
  }

  downloadInvoicePdf(waybill: any) {

    const doc = new jsPDF("portrait", "px", "a4") as jsPDFWithPlugin;
    doc.autoTable({
      head: [["Waybill No", "Tckn", "Full Name", "Tax Administration", "Email", "Phone Number", "Waybill Status"]],
      body: [[waybill.irsaliyeNo, waybill.aliciTckn, waybill.aliciUnvan, waybill.aliciVergiDairesi, waybill.aliciEposta, waybill.aliciTelefon, waybill.irsaliyeDurumu]]
    })
    doc.save(`Waybill with ID number ${waybill.irsaliyeNo}`)
    this.toastr.info(`Waybill with id number ${waybill.irsaliyeNo} is downloaded as pdf.`)
  }

  downloadInvoiceXml(waybill: any) {
    var element = document.createElement('a');

    var blob = new Blob([`Waybill No: ${waybill.irsaliyeNo}` + '\n' + `Tckn: ${waybill.aliciTckn}` + '\n' + `Full Name: ${waybill.aliciUnvan}` + '\n' +
      `Tax Administration: ${waybill.aliciVergiDairesi}` + '\n' + `Email: ${waybill.aliciEposta}` + '\n' + `Phone Number: ${waybill.aliciTelefon}` + '\n' +
      `Waybill Status: ${waybill.irsaliyeDurumu}`], {
      type: 'text/xml'
    });
    var url = URL.createObjectURL(blob);
    element.href = url;
    element.setAttribute('download', `Waybill with ID number ${waybill.irsaliyeNo}.xml`);
    document.body.appendChild(element);
    element.click();
    this.toastr.info(`Waybill with id number ${waybill.irsaliyeNo} is downloaded as xml.`)
  }

}
