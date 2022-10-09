import { Component, OnInit } from '@angular/core';
import { gidenFaturaListesi } from 'src/app/models/invoice.model';
import { Store } from '@ngrx/store';
import { deleteOutgoingInvoice, outgoingInvoiceRemoveToArchive } from 'src/app/redux/action';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


interface jsPDFWithPlugin extends jsPDF {
  autoTable(arg0: { head: any[][]; body: any[][]; }): unknown;
}

@Component({
  selector: 'app-giden-fatura-listesi',
  templateUrl: './giden-fatura-listesi.component.html',
  styleUrls: ['./giden-fatura-listesi.component.css']
})
export class GidenFaturaListesiComponent implements OnInit {

  selected = 'Select Actions';

  gidenFaturaListesi: gidenFaturaListesi[] = [];

  constructor(private store: Store<{ invoice: any }>, private toastr: ToastrService) {
    this.store.select("invoice").subscribe((x) => {
      this.gidenFaturaListesi = x.outgoingInvoiceList
    })
  }

  deleteInvoice(id: number) {
    this.store.dispatch(deleteOutgoingInvoice({ id: id }));
    this.toastr.success("Invoice " + id + " id has been deleted successfully.")
  }

  removeToArchive(invoice: any) {
    this.store.dispatch(outgoingInvoiceRemoveToArchive({ invoice: invoice }));
    this.toastr.warning(`Invoice id ${invoice.faturaNo} has been successfully archived.`)
    this.deleteInvoice(invoice.faturaNo)
  }

  downloadInvoicePdf(invoice: any) {

    const doc = new jsPDF("portrait", "px", "a4") as jsPDFWithPlugin;
    doc.autoTable({
      head: [["Invoice No", "Full Name", "Tckn", "Invoice Date", "Total KDV", "Total Price", "Invoice Price", "Scenario Type", "Invoice Status"]],
      body: [[invoice.faturaNo, invoice.adSoyad, invoice.tckn, invoice.faturaTarihi, invoice.toplamKdv, invoice.toplamTutar, invoice.faturaTutari, invoice.senaryoTipi,
      invoice.faturaDurumu]]
    })
    doc.save(`Invoice with ID number ${invoice.faturaNo}`)
    this.toastr.info(`Invoice with id number ${invoice.faturaNo} is downloaded as pdf.`)
  }

  downloadInvoiceXml(invoice: any) {
    var element = document.createElement('a');

    var blob = new Blob([`Invoice No: ${invoice.faturaNo}` + '\n' + `Full Name: ${invoice.adSoyad}` + '\n' + `Tckn: ${invoice.tckn}` + '\n' +
      `Invoice Date: ${invoice.faturaTarihi}` + '\n' + `Total KDV: ${invoice.toplamKdv}` + '\n' + `Total Price: ${invoice.toplamTutar}` + '\n' +
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

  printDocument(invoice: any) {
    this.toastr.info(`Invoice with id number ${invoice.faturaNo} is being printed.`)
  }


  ngOnInit(): void { }

}
