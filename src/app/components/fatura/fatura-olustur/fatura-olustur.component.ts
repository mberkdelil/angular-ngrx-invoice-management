import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { irsaliye, malHizmetListesi, notlar } from 'src/app/models/invoice.model';
import { addToIncomingInvoiceList, createGoodsService, createInvoice, createInvoiceNotes, createInvoiceWaybill, deleteGoodsService, deleteInvoiceWaybill } from 'src/app/redux/action';

@Component({
  selector: 'app-fatura-olustur',
  templateUrl: './fatura-olustur.component.html',
  styleUrls: ['./fatura-olustur.component.css']
})
export class FaturaOlusturComponent implements OnInit {

  waybillList: irsaliye[] = [];
  goodsServiceList: malHizmetListesi[] = [];
  notesList: notlar[] = [];

  createInvoiceForm = new FormGroup({
    scenarioType: new FormControl("", [Validators.required]),
    invoiceType: new FormControl("", [Validators.required]),
    invoiceDate: new FormControl("", [Validators.required]),
    currencyUnit: new FormControl("", [Validators.required]),
    tckn: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    appellation: new FormControl("", [Validators.required]),
    postBox: new FormControl("", [Validators.required]),
    taxAdministration: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.minLength(11)]),
    fax: new FormControl(""),
    website: new FormControl(""),
  })

  waybillForm = new FormGroup({
    waybillNo: new FormControl("", [Validators.required]),
    waybillDate: new FormControl("", [Validators.required])
  })

  goodsServiceForm = new FormGroup({
    goodsService: new FormControl("", [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
    unit: new FormControl("", [Validators.required]),
    unitPrice: new FormControl(0, [Validators.required]),
    kdvRate: new FormControl(0, [Validators.required]),
    kdvPrice: new FormControl(0, [Validators.required]),
    totalPrice: new FormControl(0, [Validators.required]),
  })

  notesForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    title: new FormControl("")
  })

  constructor(private store: Store<{ invoice: any }>) {
    this.store.select("invoice").subscribe((x: any) => {
      console.log(x);
      this.waybillList = x.invoiceWaybill;
      this.goodsServiceList = x.invoiceGoodsService;
      this.notesList = x.invoiceNotes;
    })
  }

  createInvoice() {
    this.store.dispatch(createInvoice({ invoice: this.createInvoiceForm.value }));
    this.store.dispatch(addToIncomingInvoiceList({ invoice: this.createInvoiceForm.value }))
  }

  createWaybill() {
    this.store.dispatch(createInvoiceWaybill({ waybill: this.waybillForm.value }))
  }

  deleteInvoiceWaybill(id: number) {
    this.store.dispatch(deleteInvoiceWaybill({ id: id }))
  }

  createInvoiceGoodsService() {
    this.store.dispatch(createGoodsService({ goodsService: this.goodsServiceForm.value }))
  }

  deleteInvoiceGoodsService(id: number) {
    this.store.dispatch(deleteGoodsService({ id: id }))
  }

  createInvoiceNotes() {
    this.store.dispatch(createInvoiceNotes({ notes: this.notesForm.value }))
    this.notesForm.reset()
  }

  ngOnInit(): void { }

}






