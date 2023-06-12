import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudServiceService } from '../services/crud-service.service';
import { Porudzbina } from '../modeli/porudzbina';
import { Korisnik } from '../modeli/korisnik';
import { Knjiga } from '../modeli/knjiga';
import { Stavka } from '../modeli/stavka';
import { Status } from '../modeli/status';

@Component({
  selector: 'app-admin-porudzbina-detalji',
  templateUrl: './admin-porudzbina-detalji.component.html',
  styleUrls: ['./admin-porudzbina-detalji.component.scss']
})
export class AdminPorudzbinaDetaljiComponent {

  korisnik: Korisnik = new Korisnik("", "");
  status: Status = new Status(0, "");
  listaPorudzbina: Porudzbina[] = []
  porudzbina: Porudzbina = new Porudzbina(this.korisnik, "", "", "", "", "", 0, 0, this.status);
  listaKorisnika: Korisnik[] = [];
  
  listaKnjigaCitanje: Knjiga[] = [];
  listaStavkiCitanje: Stavka[] = [];
  listaKnjigaIspis: Knjiga[] = [];

  constructor(private crudService: CrudServiceService, private _route: ActivatedRoute) {

    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.crudService.getPorudzbinaPoId(id).subscribe((data) => {
        this.porudzbina = data;
        this.getKorisnikPoId();
        this.getKnjigePorudzbine();
        
      });

    })
  }

  ngOnInit() {
  }

  prikaziKupovinu(){
    
  }



  getKonkretnaPorudzbina(id: number) {
    this.crudService.getPorudzbinaPoId(id).subscribe((data) => {
      this.porudzbina = data;
    });
  }

  getKorisnikPoId() {
    this.crudService.getKorisnikPoId(this.porudzbina.korisnik.id).subscribe((data) => {
      this.korisnik = data;
    });
  }

  getKnjigePorudzbine() {
    this.crudService.getStavkeIzPorudzbine(this.porudzbina.id).subscribe((data) => {
      this.listaStavkiCitanje = data;   
       
    });
  }

}
