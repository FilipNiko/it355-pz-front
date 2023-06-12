import { Component } from '@angular/core';
import { Porudzbina } from '../modeli/porudzbina';
import { CrudServiceService } from '../services/crud-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Knjiga } from '../modeli/knjiga';
import { Status } from '../modeli/status';

@Component({
  selector: 'app-admin-porudzbine',
  templateUrl: './admin-porudzbine.component.html',
  styleUrls: ['./admin-porudzbine.component.scss']
})
export class AdminPorudzbineComponent {

  listaPorudzbina: Porudzbina[] = [];
  promenaStatusaForma: FormGroup;
  porudzbina : Porudzbina;
  forma: FormGroup;

  constructor(private crudService: CrudServiceService, fb:FormBuilder){

    this.forma = fb.group({
      "kriterijum": ['', Validators.required]
    }),
    
    this.promenaStatusaForma = fb.group({
      "status": ['']
    })

  }

  ngOnInit(){
    this.getSvePorudzbine();
  }

  getSvePorudzbine() {
    this.crudService.getSvePorudzbine().subscribe((data) => {
      this.listaPorudzbina = data;
    })
  }

  popuniStatusForma(porudzbina:Porudzbina){
    this.porudzbina=porudzbina;
    this.promenaStatusaForma.controls["status"].setValue(this.porudzbina.status);
  }

  promeniStatus(){
    let noviStatus = this.promenaStatusaForma.get("status")?.value;
    var statZaUpis = new Status(0," ");
    if(noviStatus == "Kreirana"){
      statZaUpis = new Status(1, "Kreirana");
    }else if(noviStatus == "Isporuka"){
      statZaUpis = new Status(2, "Isporuka");
    }else if(noviStatus == "Završena"){
      statZaUpis = new Status(3, "Završena");
    }else{
      statZaUpis = new Status(4, "Otkazana");
    }

    this.porudzbina.status=statZaUpis;

    console.log(this.porudzbina);

    console.log(statZaUpis);
    this.crudService.izmeniPorudzbinu(this.porudzbina).subscribe(res => {
      let ref = document.getElementById('cancelStatus');
      ref?.click();
      this.promenaStatusaForma.reset();
      this.getSvePorudzbine();
    })
  }

  pretrazi(): boolean {
    let kriterijum = this.forma.get("kriterijum")?.value;
    this.crudService.pretraziPorudzbine(kriterijum).subscribe((data) => {
      this.listaPorudzbina = data;
    })
    return false;

  }

}
