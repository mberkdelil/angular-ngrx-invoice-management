import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { gelenFaturaListesi } from 'src/app/models/invoice.model';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { addOutgoingListToApprovedInvoice, incomingInvoiceConfirmInvoice, incomingInvoiceRemoveToArchive, rejectIncomingInvoice } from 'src/app/redux/action';

interface jsPDFWithPlugin extends jsPDF {
  autoTable(arg0: { head: any[][]; body: any[][]; }): unknown;
}

@Component({
  selector: 'app-gelen-fatura-listesi',
  templateUrl: './gelen-fatura-listesi.component.html',
  styleUrls: ['./gelen-fatura-listesi.component.css']
})
export class GelenFaturaListesiComponent implements OnInit {

  selected = 'Select Actions';

  gidenFaturaListesi: gelenFaturaListesi[] = [];

  displayedColumns: string[] = ["faturaNo", "tckn", "adSoyad", "faturaTarihi", "toplamKdv", "odenecekTutar", "faturaTutari", "senaryoTipi", "faturaDurumu", "işlemler"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private store: Store<{ invoice: any }>, private toastr: ToastrService) {
    this.store.select("invoice").subscribe((x: any) => {
      this.dataSource = new MatTableDataSource(x.incomingInvoiceList);
      console.log(x.incomingInvoiceList);
      console.log(x);
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

  printDocument(invoice: any) {
    this.toastr.info(`Invoice with id number ${invoice.faturaNo} is being printed`)
  }

  downloadInvoicePdf(invoice: any) {

    const doc = new jsPDF("portrait", "px", "a4") as jsPDFWithPlugin;
    doc.autoTable({
      head: [["Invoice No", "Full Name", "Tckn", "Invoice Date", "Total KDV", "Total Price", "Invoice Price", "Scenario Type", "Invoice Status"]],
      body: [[invoice.faturaNo, invoice.adSoyad, invoice.tckn, invoice.faturaTarihi, invoice.toplamKdv, invoice.odenecekTutar, invoice.faturaTutari, invoice.senaryoTipi,
      invoice.faturaDurumu]]
    })
    doc.save(`Invoice with ID number ${invoice.faturaNo}`)
    this.toastr.info(`Invoice with id number ${invoice.faturaNo} is downloaded as pdf.`)
  }

  downloadInvoiceXml(invoice: any) {
    var element = document.createElement('a');

    var blob = new Blob([`Invoice No: ${invoice.faturaNo}` + '\n' + `Full Name: ${invoice.adSoyad}` + '\n' + `Tckn: ${invoice.tckn}` + '\n' +
      `Invoice Date: ${invoice.faturaTarihi}` + '\n' + `Total KDV: ${invoice.toplamKdv}` + '\n' + `Total Price: ${invoice.odenecekTutar}` + '\n' +
      `Invoice Price: ${invoice.faturaTutari}` + '\n' + `Scenario Type: ${invoice.senaryoTipi}` + '\n' + `Invoice Status: ${invoice.faturaDurumu}`], {
      type: 'text/xml'
    });
    var url = URL.createObjectURL(blob);
    element.href = url;
    element.setAttribute('download', `Invoice with ID number ${invoice.faturaNo}.xml`);
    document.body.appendChild(element);
    element.click();
    this.toastr.info(`Invoice with id number ${invoice.faturaNo} is downloaded as xml.`)
  }

  checkInvoice(id: number, invoice: any) {
    this.store.dispatch(incomingInvoiceConfirmInvoice({ id: id }));
    this.toastr.info(`Invoice with id number ${id} has been approved.`);
    this.store.dispatch(addOutgoingListToApprovedInvoice({ invoice: invoice }))
  }

  rejectInvoice(id: number) {
    this.store.dispatch(rejectIncomingInvoice({ id: id }))
  }

  incomingInvoiceRemoveToArchive(invoice: any) {
    this.store.dispatch(incomingInvoiceRemoveToArchive({ invoice: invoice }))
    this.rejectInvoice(invoice.faturaNo)
  }

  ngOnInit(): void {
  }


}
