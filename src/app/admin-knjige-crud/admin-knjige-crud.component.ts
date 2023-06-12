import { Component, ElementRef, ViewChild } from '@angular/core';
import { CrudServiceService } from '../services/crud-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Knjiga } from '../modeli/knjiga';
import { Kategorija } from '../modeli/kategorija';
import { Pismo } from '../modeli/pismo';
import { Povez } from '../modeli/povez';


declare var jQuery: any;
@Component({
  selector: 'app-admin-knjige-crud',
  templateUrl: './admin-knjige-crud.component.html',
  styleUrls: ['./admin-knjige-crud.component.scss']
})
export class AdminKnjigeCrudComponent {

  listaKnjiga: Knjiga[];
  forma: FormGroup;
  dodavanjeKnjigeForma: FormGroup;
  listaKategorija: Kategorija[] = [];
  listaPisma: Pismo[] = [];
  listaPoveza: Povez[] = [];
  dodavanjeKategorijeForma: FormGroup;
  dodavanjePismaForma: FormGroup;
  izmenaKnjigeForma: FormGroup;
  knjigaZaIzmenu: Knjiga;
  pismo:Pismo;

  @ViewChild('izmenaModal') izmenaModal: ElementRef;

  constructor(private crudService: CrudServiceService, fb: FormBuilder) {

    this.forma = fb.group({
      "kriterijum": ['', Validators.required]
    }),

      this.dodavanjeKategorijeForma = fb.group({
        "kategorija": ['', Validators.required]
      }),

      this.dodavanjePismaForma = fb.group({
        "pismo": ['', Validators.required]
      }),
      this.izmenaKnjigeForma = fb.group({
        "naziv": ['', Validators.required],
        "autor": ['', Validators.required],
        "kategorijeId": ['', Validators.required],
        "opis": ['', Validators.required],
        "pismo": ['', Validators.required],
        "povez": ['', Validators.required],
        "strana": ['', Validators.required],
        "stanje": ['', Validators.required],
        "slikaUrl": ['', Validators.required],
        "cena": ['', Validators.required]
      }),


      this.dodavanjeKnjigeForma = fb.group({
        "naziv": ['', Validators.required],
        "autor": ['', Validators.required],
        "kategorijeId": ['', Validators.required],
        "opis": ['Opis knjige', Validators.required],
        "pismo": ['', Validators.required],
        "povez": ['', Validators.required],
        "strana": ['', Validators.required],
        "stanje": ['', Validators.required],
        "slikaUrl": ['', Validators.required],
        "cena": ['', Validators.required],

      })
  }

  ngOnInit() {
    this.getSveKnjige();
    this.getSvaPisma();
    this.getSviPovezi();
  }

  pretrazi(): boolean {
    let kriterijum = this.forma.get("kriterijum")?.value;
    this.crudService.pretraziKnjige(kriterijum).subscribe((data) => {
      this.listaKnjiga = data;
    })
    return false;

  }

  popuniPolja(knjigaPrimnljena: Knjiga) {

    this.getSveKategorije();
    this.knjigaZaIzmenu = knjigaPrimnljena;

    /*let naziv = this.knjiga.naziv
    let autor = this.knjiga.autor
    let kategorijeId = this.knjiga.kategorijeId
    let opis = this.knjiga.opis
    let pismo = this.knjiga.pismo
    let povez = this.knjiga.povez
    let strana = this.knjiga.strana
    let stanje = this.knjiga.stanje
    let slikaUrl = this.knjiga.slikaUrl
    let cena = this.knjiga.cena*/

    jQuery(this.izmenaModal.nativeElement).modal('show');

    this.izmenaKnjigeForma.reset();

    this.izmenaKnjigeForma.controls["naziv"].setValue(knjigaPrimnljena.naziv);
    this.izmenaKnjigeForma.controls["autor"].setValue(knjigaPrimnljena.autor);
    this.izmenaKnjigeForma.controls["kategorijeId"].setValue(knjigaPrimnljena.kategorija.id);
    this.izmenaKnjigeForma.controls["opis"].setValue(knjigaPrimnljena.opis);
    this.izmenaKnjigeForma.controls["pismo"].setValue(knjigaPrimnljena.pismo.id);
    this.izmenaKnjigeForma.controls["povez"].setValue(knjigaPrimnljena.povez.id);
    this.izmenaKnjigeForma.controls["strana"].setValue(knjigaPrimnljena.brojStrana);
    this.izmenaKnjigeForma.controls["stanje"].setValue(knjigaPrimnljena.stanje);
    this.izmenaKnjigeForma.controls["slikaUrl"].setValue(knjigaPrimnljena.slikaUrl);
    this.izmenaKnjigeForma.controls["cena"].setValue(knjigaPrimnljena.cena);
  }


  ugasiModal(){
    jQuery(this.izmenaModal.nativeElement).modal('hide');
  }


  izmeniKnjigu() {
    let naziv = this.izmenaKnjigeForma.get("naziv")?.value;
    let autor = this.izmenaKnjigeForma.get("autor")?.value;
    let kategorijeId = this.izmenaKnjigeForma.get("kategorijeId")?.value;
    let opis = this.izmenaKnjigeForma.get("opis")?.value;
    let pismoId = this.izmenaKnjigeForma.get("pismo")?.value;
    let povezId = this.izmenaKnjigeForma.get("povez")?.value;
    let strana = this.izmenaKnjigeForma.get("strana")?.value;
    let stanje = this.izmenaKnjigeForma.get("stanje")?.value;
    let slikaUrl = this.izmenaKnjigeForma.get("slikaUrl")?.value;
    let cena = this.izmenaKnjigeForma.get("cena")?.value;

    const kategorija = new Kategorija();
    kategorija.id=kategorijeId;

    const pismo = new Pismo(pismoId);

    const povez = new Povez(povezId);

    let knjigaZaUpis = new Knjiga(naziv, autor, opis, pismo, povez, strana, stanje, slikaUrl, kategorija, cena);
    knjigaZaUpis.id=this.knjigaZaIzmenu.id;

    console.log(knjigaZaUpis);

    this.crudService.updateKnjiga(knjigaZaUpis).subscribe(res => {
      alert("Uspešna izmena!")
      this.ugasiModal();
      this.izmenaKnjigeForma.reset();
      this.getSveKnjige();
    })
  }

  dodajKnjigu(): void {
    let naziv = this.dodavanjeKnjigeForma.get("naziv")?.value;
    let autor = this.dodavanjeKnjigeForma.get("autor")?.value;
    let kategorijeId = this.dodavanjeKnjigeForma.get("kategorijeId")?.value;
    let opis = this.dodavanjeKnjigeForma.get("opis")?.value;
    let pismoId = this.dodavanjeKnjigeForma.get("pismo")?.value;
    let povezId = this.dodavanjeKnjigeForma.get("povez")?.value;
    let strana = this.dodavanjeKnjigeForma.get("strana")?.value;
    let stanje = this.dodavanjeKnjigeForma.get("stanje")?.value;
    let slikaUrl = this.dodavanjeKnjigeForma.get("slikaUrl")?.value;
    let cena = this.dodavanjeKnjigeForma.get("cena")?.value;

    const kategorija = new Kategorija();
    kategorija.id=kategorijeId;

    const pismo = new Pismo(pismoId);

    const povez = new Povez(povezId);

    let knjigaZaUpis=new Knjiga(naziv, autor, opis, pismo, povez, strana, stanje, slikaUrl, kategorija, cena);
    console.log(knjigaZaUpis);

    this.crudService.dodajKnjigu(knjigaZaUpis).subscribe((data) => {
      this.listaKategorija.unshift(data);
      let ref = document.getElementById('cancelForma');
      ref?.click();
      this.dodavanjeKnjigeForma.reset();
      this.getSveKnjige();
    })

  }



  dodajKategoriju() {
    let kategorija = this.dodavanjeKategorijeForma.get("kategorija")?.value;
    console.log(kategorija)
    this.crudService.dodajKategoriju(new Kategorija(kategorija)).subscribe((data) => {
      this.listaKategorija.unshift(data);
      let ref = document.getElementById('cancelKategorija');
      ref?.click();
      this.dodavanjeKategorijeForma.reset();
      window.location.reload();
    })
  }

  dodajPismo() {
    let pismo = this.dodavanjePismaForma.get("pismo")?.value;
    console.log(pismo)
    this.crudService.dodajPismo(new Pismo(0, pismo)).subscribe((data) => {
      this.pismo = data;
      let ref = document.getElementById('cancelPismo');
      ref?.click();
      this.dodavanjePismaForma.reset();
      window.location.reload();
    })
  }



  getSveKategorije() {
    this.crudService.getSveKategorije().subscribe((data) => {
      this.listaKategorija = data;
    })
    
  }

  getSveKnjige() {
    this.crudService.getSveKnjige().subscribe((data) => {
      this.listaKnjiga = data;
    })
  }

  getSvaPisma() {
    this.crudService.getSvaPisma().subscribe((data) => {
      this.listaPisma = data;
      console.log(this.listaPisma);
    })
  }

  getSviPovezi() {
    this.crudService.getSviPovezi().subscribe((data) => {
      this.listaPoveza = data;
      console.log(this.listaPoveza);
    })
    

  }

}
