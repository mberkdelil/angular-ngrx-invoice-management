import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { gelenFaturaListesi, gelenIrsaliyeListesi, gidenFaturaListesi, gidenIrsaliyeListesi, Invoice, irsaliye, irsaliyeOlustur, malHizmetListesi, notlar } from "../models/invoice.model";
import {
    addIncomingWaybillList,
    addOutgoingListToApprovedInvoice,
    addToIncomingInvoiceList, addWaybillGoodsService, addWaybillNotes, createGoodsService, createInvoice, createInvoiceNotes, createInvoiceWaybill, createWaybill, deleteFromIncomingArchiveWaybill, deleteFromOutgoingWaybillList, deleteGoodsService, deleteIncomingWaybill, deleteInvoiceWaybill,
    deleteOutgoingInvoice, incomingInvoiceConfirmInvoice, incomingInvoiceRemoveToArchive, incomingWaybillListConfirmWaybill, incomingWaybillRemoveToArchive, outgoingInvoiceRemoveToArchive, rejectIncomingInvoice, removeToArchiveFromOutgoingWaybillList
} from "./action";

export interface InvoiceState {
    invoices: Invoice[],
    invoiceWaybill: irsaliye[],
    invoiceGoodsService: malHizmetListesi[],
    invoiceNotes: notlar[],

    waybills: irsaliyeOlustur[],
    waybillGoodsService: malHizmetListesi[],
    waybillNotes: notlar[],

    incomingInvoiceList: gelenFaturaListesi[],
    archiveIncomingInvoiceList: gelenFaturaListesi[],

    outgoingInvoiceList: gidenFaturaListesi[],
    archiveOutgoingInvoiceList: gidenFaturaListesi[],

    incomingWaybillList: gelenIrsaliyeListesi[],
    archiveIncomingWaybillList: gelenIrsaliyeListesi[],

    outgoingWaybillList: gidenIrsaliyeListesi[],
    archiveOutgoingWaybillList: gidenIrsaliyeListesi[]
}

export const initialState: InvoiceState = {
    invoices: [],
    invoiceWaybill: [],
    invoiceGoodsService: [],
    invoiceNotes: [],

    waybills: [],
    waybillGoodsService: [],
    waybillNotes: [],

    incomingInvoiceList: [
        {
            adSoyad: "Ad Soyad",
            faturaDurumu: "Not Approved",
            faturaNo: 1,
            faturaTarihi: "29.08.2022",
            faturaTutari: 1000,
            odenecekTutar: 1180,
            senaryoTipi: "temel",
            tckn: 15480366214,
            toplamKdv: 18
        }
    ],

    archiveIncomingInvoiceList: [],

    outgoingInvoiceList: [
        {
            adSoyad: "Karim Benzema",
            faturaDurumu: "Approved",
            faturaNo: 1,
            faturaTarihi: "29.08.2022",
            faturaTutari: 1000,
            odenecekTutar: 1180,
            senaryoTipi: "Basis",
            tckn: 15480366214,
            toplamKdv: 18
        }
    ],

    archiveOutgoingInvoiceList: [],

    incomingWaybillList: [
        {
            irsaliyeNo: 1,
            aliciTckn: 11111111111,
            aliciEposta: "a@a.com",
            aliciTelefon: 11111111111,
            aliciUnvan: "name surname",
            aliciVergiDairesi: "tax administration",
            irsaliyeDurumu: "onaylanmadı",
            malHizmetListesi: [],
            notlar: []
        }
    ],

    archiveIncomingWaybillList: [],

    outgoingWaybillList: [
        {
            irsaliyeNo: 1,
            aliciTckn: 11111111111,
            aliciEposta: "a@a.com",
            aliciTelefon: 11111111111,
            aliciUnvan: "name surname",
            aliciVergiDairesi: "tax administration",
            irsaliyeDurumu: "onaylanmadı",
            malHizmetListesi: [],
            notlar: []
        }
    ],

    archiveOutgoingWaybillList: []
}

export const reducer = createReducer(initialState,
    on(createInvoice, (state, { invoice }) => ({

        // create invoice reducer
        ...state, invoices: [...state.invoices, {
            ...invoice,
            goodsServiceList: state.invoiceGoodsService,
            waybill: state.invoiceWaybill,
            notes: state.invoiceNotes
        }]
    })),
    on(createInvoiceWaybill, (state, { waybill }) => ({
        ...state, invoiceWaybill: [...state.invoiceWaybill, waybill]
    })),
    on(deleteInvoiceWaybill, (state, { id }) => ({
        ...state, invoiceWaybill: state.invoiceWaybill.filter((x: any) => x.waybillNo !== id)
    })),
    on(createGoodsService, (state, { goodsService }) => ({
        ...state, invoiceGoodsService: [...state.invoiceGoodsService, { id: state.invoiceGoodsService.length + 1, ...goodsService }]
    })),
    on(deleteGoodsService, (state, { id }) => ({
        ...state, invoiceGoodsService: state.invoiceGoodsService.filter((x: any) => x.id !== id)
    })),
    on(createInvoiceNotes, (state, { notes }) => ({
        ...state, invoiceNotes: [...state.invoiceNotes, { id: state.invoiceNotes.length + 1, ...notes }]
    })),
    on(addToIncomingInvoiceList, (state, { invoice }) => ({
        ...state, incomingInvoiceList: [...state.incomingInvoiceList, {
            ...invoice,
            goodsServiceList: state.invoiceGoodsService,
            waybill: state.invoiceWaybill,
            notes: state.invoiceNotes
        }]
    })),
    on(deleteOutgoingInvoice, (state, { id }) => ({
        ...state, outgoingInvoiceList: state.outgoingInvoiceList.filter((x) => x.faturaNo !== id)
    })),
    on(outgoingInvoiceRemoveToArchive, (state, { invoice }) => ({
        ...state, archiveOutgoingInvoiceList: [...state.archiveOutgoingInvoiceList, invoice]
    })),
    on(incomingInvoiceConfirmInvoice, (state, { id }) => ({
        ...state, incomingInvoiceList: state.incomingInvoiceList.map((x) => x.faturaNo === id ? { ...x, faturaDurumu: "Approved" } : x)
    })),
    on(addOutgoingListToApprovedInvoice, (state, { invoice }) => ({
        ...state, outgoingInvoiceList: [...state.outgoingInvoiceList, invoice]
    })),
    on(rejectIncomingInvoice, (state, { id }) => ({
        ...state, incomingInvoiceList: state.incomingInvoiceList.filter((x: any) => x.faturaNo !== id)
    })),
    on(incomingInvoiceRemoveToArchive, (state, { invoice }) => ({
        ...state, archiveIncomingInvoiceList: [...state.archiveIncomingInvoiceList, invoice]
    })),
    on(createWaybill, (state, { waybill, productservice, notes }) => ({
        ...state, waybills: [...state.waybills, {
            ...waybill,
            malHizmetListesi: { id: Math.floor(Math.random() * 98), ...productservice },
            notlar: { id: Math.floor(Math.random() * 98), ...notes }
        }]
    })),
    on(addWaybillGoodsService, (state, { goodsService }) => ({
        ...state, waybillGoodsService: [...state.waybillGoodsService, {
            id: state.waybillGoodsService.length + 1, ...goodsService
        }]
    })),
    on(addWaybillNotes, (state, { notes }) => ({
        ...state, waybillNotes: [...state.waybillNotes, notes]
    })),
    on(addIncomingWaybillList, (state, { waybill, goodsService, notes }) => ({
        ...state, incomingWaybillList: [...state.incomingWaybillList, {
            irsaliyeNo: state.incomingWaybillList.length + 1,
            irsaliyeDurumu: "onaylanmadı",
            ...waybill,
            malHizmetListesi: goodsService,
            notlar: notes
        }]
    })),
    on(incomingWaybillListConfirmWaybill, (state, { id }) => ({
        ...state, incomingWaybillList: state.incomingWaybillList.map((x: any) => x.irsaliyeNo === id ? { ...x, irsaliyeDurumu: "Onaylandı" } : x)
    })),
    on(deleteIncomingWaybill, (state, { id }) => ({
        ...state, incomingWaybillList: state.incomingWaybillList.filter((x) => x.irsaliyeNo !== id)
    })),
    on(incomingWaybillRemoveToArchive, (state, { waybill }) => ({
        ...state, archiveIncomingWaybillList: [...state.archiveIncomingWaybillList, waybill]
    })),
    on(deleteFromOutgoingWaybillList, (state, { id }) => ({
        ...state, outgoingWaybillList: state.outgoingWaybillList.filter((x: any) => x.irsaliyeNo !== id)
    })),
    on(removeToArchiveFromOutgoingWaybillList, (state, { waybill }) => ({
        ...state, archiveOutgoingWaybillList: [...state.archiveOutgoingWaybillList, waybill]
    })),
    on(deleteFromIncomingArchiveWaybill, (state, { id }) => ({
        ...state, archiveIncomingWaybillList: state.archiveIncomingWaybillList.filter((x: any) => x.irsaliyeNo !== id)
    }))
)

export const rootReducer: ActionReducerMap<any> = {
    invoice: reducer
}