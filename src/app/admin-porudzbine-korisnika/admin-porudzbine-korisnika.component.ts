import { Component } from '@angular/core';
import { Porudzbina } from '../modeli/porudzbina';
import { CrudServiceService } from '../services/crud-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Korisnik } from '../modeli/korisnik';
import { Status } from '../modeli/status';

@Component({
  selector: 'app-admin-porudzbine-korisnika',
  templateUrl: './admin-porudzbine-korisnika.component.html',
  styleUrls: ['./admin-porudzbine-korisnika.component.scss']
})
export class AdminPorudzbineKorisnikaComponent {
  listaPorudzbina: Porudzbina[] = [];
  listaKorisnika: Korisnik[] = [];
  korisnik:Korisnik = new Korisnik(" ", " ");
  promenaStatusaForma: FormGroup;
  porudzbina : Porudzbina;
  idKorisnika :number;

  constructor(private crudService: CrudServiceService, fb:FormBuilder, private _route: ActivatedRoute){
    this.promenaStatusaForma = fb.group({
      "status": ['']
    })
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.idKorisnika=id;
      this.crudService.getPorudzbinePoKorisniku(id).subscribe((data) => {
        this.listaPorudzbina = data; 
        this.getKorisnikPoId(); 
      });
      

    })

  }

  ngOnInit(){
    
  }

  getKorisnikPoId(){
    this.crudService.getKorisnikPoId(this.idKorisnika).subscribe((data) => {
      this.korisnik=data;
    });
  }

 getPorudzbinePoKorisniku(){
  this.crudService.getPorudzbinePoKorisniku(this.idKorisnika).subscribe((data) => {
    this.listaPorudzbina = data;  
  });
 }

  popuniStatusForma(porudzbina:Porudzbina){
    this.porudzbina=porudzbina;
    this.promenaStatusaForma.controls["status"].setValue(this.porudzbina.status);
  }

  promeniStatus(){
    const status = new Status();


    let noviStatus = this.promenaStatusaForma.get("status")?.value;


    if(noviStatus=="Kreirana"){
      status.id=1;
    }else if(noviStatus=="Isporuka"){
      status.id=2;
    }else if(noviStatus=="Završena"){
      status.id=3;
    }else{
      status.id=4;
    }

    this.porudzbina.status=status;

    console.log(noviStatus);
    this.crudService.izmeniPorudzbinu(this.porudzbina).subscribe(res => {
      let ref = document.getElementById('cancelStatus');
      ref?.click();
      this.promenaStatusaForma.reset();
      this.getPorudzbinePoKorisniku();
    })
  }


}
