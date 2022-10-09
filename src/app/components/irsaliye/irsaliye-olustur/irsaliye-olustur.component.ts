import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from "ngx-toastr"
import { malHizmetListesi, notlar } from 'src/app/models/invoice.model';
import { addIncomingWaybillList, addWaybillGoodsService, addWaybillNotes, createWaybill } from 'src/app/redux/action';

@Component({
  selector: 'app-irsaliye-olustur',
  templateUrl: './irsaliye-olustur.component.html',
  styleUrls: ['./irsaliye-olustur.component.css']
})
export class IrsaliyeOlusturComponent implements OnInit {

  panelOpenState = false;

  serviceList: malHizmetListesi[] = [];
  notes: notlar[] = []

  constructor(private store: Store<{ invoice: any }>, private toastr: ToastrService) {
    this.store.select("invoice").subscribe((x: any) => {
      console.log(x);
      this.serviceList = x.waybillGoodsService;
      this.notes = x.waybillNotes
    })
  }

  waybillForm = new FormGroup({
    aliciTckn: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    aliciEposta: new FormControl("", [Validators.required, Validators.email]),
    aliciUnvan: new FormControl("", [Validators.required]),
    aliciTelefon: new FormControl("", [Validators.required, Validators.minLength(11)]),
    aliciPostaKutusu: new FormControl(""),
    aliciFaks: new FormControl(""),
    aliciVergiDairesi: new FormControl("", [Validators.required]),
    aliciWebSitesi: new FormControl(""),

    aliciUlke: new FormControl("", [Validators.required]),
    aliciCadde: new FormControl("", [Validators.required]),
    aliciSehir: new FormControl("", [Validators.required]),
    aliciPostaKodu: new FormControl("", [Validators.required]),
    aliciIlce: new FormControl("", [Validators.required]),
    aliciBinaAdi: new FormControl("", [Validators.required]),
    aliciKasaba: new FormControl("", [Validators.required]),
    aliciBinaNo: new FormControl("", [Validators.required]),
    aliciKapiNo: new FormControl("", [Validators.required]),

    teslimEdenAdSoyad: new FormControl("", [Validators.required]),
    teslimEdenTelefon: new FormControl("", [Validators.required]),
    teslimEdenTckn: new FormControl("", [Validators.required]),
    teslimEdenEposta: new FormControl("", [Validators.required, Validators.email])
  });

  waybillGoodsServiceForm = new FormGroup({

    goodsService: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required]),
    unit: new FormControl("", [Validators.required]),
    unitPrice: new FormControl("", [Validators.required]),
    kdvRate: new FormControl("", [Validators.required]),
    kdvPrice: new FormControl("", [Validators.required]),
    totalPrice: new FormControl("", [Validators.required]),
  })

  waybillNotes = new FormGroup({
    title: new FormControl("")
  })

  createWaybill() {
    if (this.waybillForm.invalid) {
      if (this.waybillForm.get('aliciTckn')?.hasError('required')) { this.toastr.error("Tckn field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciEposta')?.hasError('required')) { this.toastr.error("Email field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciUnvan')?.hasError('required')) { this.toastr.error("Title field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciTelefon')?.hasError('required')) { this.toastr.error("Phone field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciVergiDairesi')?.hasError('required')) { this.toastr.error("Tax Administration field is left blank. The form cannot be submitted.") }

      if (this.waybillForm.get('aliciUlke')?.hasError('required')) { this.toastr.error("Country field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciCadde')?.hasError('required')) { this.toastr.error("Street field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciSehir')?.hasError('required')) { this.toastr.error("City field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciPostaKodu')?.hasError('required')) { this.toastr.error("Post box field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciIlce')?.hasError('required')) { this.toastr.error("District field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciBinaAdi')?.hasError('required')) { this.toastr.error("Building name field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciKasaba')?.hasError('required')) { this.toastr.error("Village field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciBinaNo')?.hasError('required')) { this.toastr.error("Building no field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('aliciKapiNo')?.hasError('required')) { this.toastr.error("Door no field is left blank. The form cannot be submitted.") }

      if (this.waybillForm.get('teslimEdenAdSoyad')?.hasError('required')) { this.toastr.error("Submitter name field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('teslimEdenTelefon')?.hasError('required')) { this.toastr.error("Submitter phone field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('teslimEdenTckn')?.hasError('required')) { this.toastr.error("Submitter tckn field is left blank. The form cannot be submitted.") }
      if (this.waybillForm.get('teslimEdenEposta')?.hasError('required')) { this.toastr.error("Submitter email field is left blank. The form cannot be submitted.") }

      if (this.waybillGoodsServiceForm.get('goodsService')?.hasError('required')) { this.toastr.error("Product service field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('quantity')?.hasError('required')) { this.toastr.error("Quantity field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('unit')?.hasError('required')) { this.toastr.error("Unit field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('unitPrice')?.hasError('required')) { this.toastr.error("Unit price field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('kdvRate')?.hasError('required')) { this.toastr.error("Kdv rate field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('kdvPrice')?.hasError('required')) { this.toastr.error("Kdv price field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('totalPrice')?.hasError('required')) { this.toastr.error("Total price field is left blank. The form cannot be submitted.") }
    } else {
      this.store.dispatch(createWaybill({ waybill: this.waybillForm.value, productservice: this.waybillGoodsServiceForm.value, notes: this.waybillNotes.value }))
      this.store.dispatch(addIncomingWaybillList({ waybill: this.waybillForm.value, goodsService: this.waybillGoodsServiceForm.value, notes: this.waybillNotes.value }))
      this.toastr.info("The waybill creation process has been completed successfully.", "Transaction Successful")
    }
  }

  addWaybillService() {
    if (this.waybillGoodsServiceForm.invalid) {
      if (this.waybillGoodsServiceForm.get('goodsService')?.hasError('required')) { this.toastr.error("Product service field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('quantity')?.hasError('required')) { this.toastr.error("Quantity field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('unit')?.hasError('required')) { this.toastr.error("Unit field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('unitPrice')?.hasError('required')) { this.toastr.error("Unit price field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('kdvRate')?.hasError('required')) { this.toastr.error("Kdv rate field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('kdvPrice')?.hasError('required')) { this.toastr.error("Kdv price field is left blank. The form cannot be submitted.") }
      if (this.waybillGoodsServiceForm.get('totalPrice')?.hasError('required')) { this.toastr.error("Total price field is left blank. The form cannot be submitted.") }
    } else {
      this.store.dispatch(addWaybillGoodsService({ goodsService: this.waybillGoodsServiceForm.value }));
      this.toastr.info("The goods service list has been successfully added.", "The operation is successful.")
    }
  }

  addWaybillNote() {
    if (this.waybillNotes.value.title?.trim() === "") {
      this.toastr.error("Blank notes cannot be added.", "Transaction unsuccessful")
    } else {
      this.store.dispatch(addWaybillNotes({ notes: this.waybillNotes.value }));
      this.toastr.info("Note added successfully.", "Transaction Successful")
    }
  }

  ngOnInit(): void {
  }

}
