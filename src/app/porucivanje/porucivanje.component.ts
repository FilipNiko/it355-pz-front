import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudServiceService } from '../services/crud-service.service';
import { Porudzbina } from '../modeli/porudzbina';
import { formatDate } from '@angular/common';
import { GrupaKnjiga } from '../modeli/grupaKnjiga';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGrupovaneKnjige } from '../korpa-state/korpa.selectors';
import { Stavka } from '../modeli/stavka';
import { ocistiKorpu } from '../korpa-state/korpa.actions';
import { Knjiga } from '../modeli/knjiga';
import { Status } from '../modeli/status';
import { Korisnik } from '../modeli/korisnik';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-porucivanje',
  templateUrl: './porucivanje.component.html',
  styleUrls: ['./porucivanje.component.scss']
})
export class PorucivanjeComponent {

  forma: FormGroup;
  porudzbina: Porudzbina;
  porudzbine: Porudzbina[] = [];
  stavke: Stavka[] = [];
  knjige: Knjiga[] = [];
  korpaUnosi$: Observable<GrupaKnjiga[]>

  constructor(fb: FormBuilder, private crudService: CrudServiceService, private storageService: StorageService, private store: Store) {
    this.forma = fb.group({
      "ime": ['', Validators.required],
      "prezime": ['', Validators.required],
      "grad": ['', Validators.required],
      "adresa": ['', Validators.required],
      "zip": ['', Validators.required],
      "brTelefona": ['', Validators.required],
    })
    this.korpaUnosi$ = store.select(selectGrupovaneKnjige);
  }

  ocistiKorpu() {
    this.store.dispatch(ocistiKorpu());
  }


  kreirajPorudzbinu(): void {
    let ime = this.forma.get("ime")?.value;
    let prezime = this.forma.get("prezime")?.value;
    let grad = this.forma.get("grad")?.value;
    let adresa = this.forma.get("adresa")?.value;
    let zip = this.forma.get("zip")?.value;
    let brTelefona = this.forma.get("brTelefona")?.value;
    let danasnjiDatum = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    let korisniciId = this.storageService.getIdKorisnika();

    const noviKorisnik =  new Korisnik();
    noviKorisnik.id=korisniciId;

    this.crudService.upisiPorudzbinu(new Porudzbina(noviKorisnik, danasnjiDatum, ime, prezime, grad, adresa, zip, brTelefona, new Status(1, "Kreirana"))).subscribe((data) => {
      alert("Uspešno ste se izvršili naručivanje!");
      this.porudzbine.unshift(data);
      this.upisiStavkePorudzbine(this.porudzbine[0].id);
      this.ocistiKorpu();

    })


  }



  upisiStavkePorudzbine(idPorudzbine: number) {
    this.korpaUnosi$.forEach(grupaKnjiga =>
      grupaKnjiga.forEach(knjiga => {
        const novaPorudzbina = new Porudzbina();
        novaPorudzbina.id = idPorudzbine; 
        this.crudService.upisiStavkuPorudzbine(new Stavka(knjiga.knjiga, knjiga.broj, novaPorudzbina)).subscribe((data) => {
          this.stavke.unshift(data);
          this.crudService.getKonkretnaKnjiga(knjiga.knjiga.id).subscribe((data) => {
            this.knjige.unshift(data);
            const novaKnjiga =new Knjiga(this.knjige[0].naziv, this.knjige[0].autor, this.knjige[0].opis, this.knjige[0].pismo, this.knjige[0].povez, this.knjige[0].brojStrana, this.knjige[0].stanje - knjiga.broj, this.knjige[0].slikaUrl, this.knjige[0].kategorija, this.knjige[0].cena); 
            novaKnjiga.id=knjiga.knjiga.id;
            this.crudService.updateKnjiga(novaKnjiga).subscribe((data) => {
              this.knjige.unshift(data);
            })
          })
        })
      })
    );
  }

}
