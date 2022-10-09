export interface irsaliye {
    waybillNo: number,
    waybillDate: string
}

export interface malHizmetListesi {
    id: number,
    goodsService: string,
    quantity: number,
    unit: string,
    unitPrice: number,
    kdvRate: number,
    kdvPrice: number,
    totalPrice: number,
}

export interface notlar {
    id: number,
    title: string
}

export interface Invoice {
    scenarioType: string,
    invoiceType: string,
    invoiceDate: string,
    currencyUnit: string,
    tckn: number,
    appellation: string,
    postBox: string,
    taxAdministration: string,
    email: string,
    phone: number,
    fax: number,
    website: string,

    waybill: irsaliye[],
    goodsServiceList: malHizmetListesi[],
    notes: notlar[]
}

export interface gidenFaturaListesi {
    faturaNo: number,
    tckn: number,
    adSoyad: string,
    faturaTarihi: string,
    toplamKdv: number,
    odenecekTutar: number,
    faturaTutari: number,
    senaryoTipi: string,
    faturaDurumu: string
}

export interface gelenFaturaListesi {
    faturaNo: number,
    tckn: number,
    adSoyad: string,
    faturaTarihi: string,
    toplamKdv: number,
    odenecekTutar: number,
    faturaTutari: number,
    senaryoTipi: string,
    faturaDurumu: string
}

export interface irsaliyeOlustur {
    aliciTckn: number,
    aliciUnvan: string,
    aliciPostaKutusu: string,
    aliciVergiDairesi: string,
    aliciEposta: string,
    aliciTelefon: number,
    aliciFaks: number,
    aliciWebSitesi: string,

    aliciUlke: string,
    aliciSehir: string,
    aliciIlce: string,
    aliciKasaba: string,
    aliciCadde: string,
    aliciPostaKodu: number,
    aliciBinaAdi: string,
    aliciBinaNo: number,
    aliciKapiNo: number, 

    teslimEdenAdSoyad: string,
    teslimEdenTelefon: number,
    teslimEdenTckn: number,
    teslimEdenEposta: string,

    malHizmetListesi: malHizmetListesi[],
    notlar: notlar[]
}

export interface gidenIrsaliyeListesi {
    irsaliyeNo: number,
    aliciTckn: number,
    aliciUnvan: string,
    aliciVergiDairesi: string,
    aliciEposta: string,
    aliciTelefon: number,
    irsaliyeDurumu: string,
    malHizmetListesi: malHizmetListesi[],
    notlar: notlar[]
}

export interface gelenIrsaliyeListesi {
    irsaliyeNo: number,
    aliciTckn: number,
    aliciUnvan: string,
    aliciVergiDairesi: string,
    aliciEposta: string,
    aliciTelefon: number,
    irsaliyeDurumu: string,
    malHizmetListesi: malHizmetListesi[],
    notlar: notlar[]
}