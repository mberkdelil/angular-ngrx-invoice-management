import { createAction, props } from "@ngrx/store";

export const createInvoice = createAction(
    "Create Invoice", props<{ invoice: any }>()
)

export const createInvoiceWaybill = createAction(
    "Create Invoice Waybill", props<{ waybill: any }>()
)

export const deleteInvoiceWaybill = createAction(
    "Delete Invoice Waybill", props<{ id: number }>()
)

export const createGoodsService = createAction(
    "Create Goods Service", props<{ goodsService: any }>()
)

export const deleteGoodsService = createAction(
    "Delete Goods Service", props<{ id: number }>()
)

export const createInvoiceNotes = createAction(
    "Create Invoice Notes", props<{ notes: any }>()
)

export const addToIncomingInvoiceList = createAction(
    "Add To Incoming Invoice List", props<{ invoice: any }>()
)

export const deleteOutgoingInvoice = createAction(
    "Delete Outgoing Invoice", props<{ id: number }>()
)

export const outgoingInvoiceRemoveToArchive = createAction(
    "Invoice Remove To Archive", props<{ invoice: any }>()
)

export const incomingInvoiceConfirmInvoice = createAction(
    "Incoming Invoice Confirm Invoice", props<{ id: number }>()
)

export const addOutgoingListToApprovedInvoice = createAction(
    "Add Approved Invoice to Outgoing invoice list", props<{ invoice: any }>()
)

export const rejectIncomingInvoice = createAction(
    "Reject Incoming Invoice", props<{ id: number }>()
)

export const incomingInvoiceRemoveToArchive = createAction(
    "Incoming Invoice Remove To Archive", props<{ invoice: any }>()
)

export const createWaybill = createAction(
    "Create waybill", props<{ waybill: any, productservice: any, notes: any }>()
)

export const addWaybillGoodsService = createAction(
    "Add new waybill goods service", props<{ goodsService: any }>()
)

export const addWaybillNotes = createAction(
    "add new waybill notes", props<{ notes: any }>()
)

export const addIncomingWaybillList = createAction(
    "add incoming waybill list", props<{ waybill: any, goodsService: any, notes: any }>()
)

export const incomingWaybillListConfirmWaybill = createAction(
    "Incoming Waybill List Confirm Waybill", props<{ id: number }>()
)

export const deleteIncomingWaybill = createAction(
    "Delete incoming waybill", props<{ id: number }>()
)

export const incomingWaybillRemoveToArchive = createAction(
    "Remove to archive incoming waybill", props<{ waybill: any }>()
)

export const deleteFromOutgoingWaybillList = createAction(
    "Delete outgoing waybill list waybill", props<{ id: number }>()
)

export const removeToArchiveFromOutgoingWaybillList = createAction(
    "Remove to archive outgoing waybill", props<{ waybill: any }>()
)

export const deleteFromIncomingArchiveWaybill = createAction(
    "Delete to waybill from archive waybill list", props<{ id: number }>()
)