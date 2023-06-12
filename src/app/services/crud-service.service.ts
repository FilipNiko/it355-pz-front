import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../modeli/korisnik';
import { map } from 'rxjs';
import { Observable } from "rxjs";
import { Knjiga } from '../modeli/knjiga';
import { Kategorija } from '../modeli/kategorija';
import { Porudzbina } from '../modeli/porudzbina';
import { GrupaKnjiga } from '../modeli/grupaKnjiga';
import { Stavka } from '../modeli/stavka';
import { Povez } from '../modeli/povez';
import { Pismo } from '../modeli/pismo';


const baseKnjigeUrl = 'http://localhost:8080/api/knjige';

const baseKategorijeUrl = 'http://localhost:8080/api/kategorije';

const basePorudzbineUrl = 'http://localhost:8080/api/porudzbine';

const baseStavkeUrl = 'http://localhost:8080/api/stavke';

const basePismoUrl = 'http://localhost:8080/api/pisma';

const basePovezUrl = 'http://localhost:8080/api/povez';

const baseKorisnikInfoUrl = 'http://localhost:8080/api/korisnici';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private http: HttpClient) {

  }


  getKorisnikPoId(id:number): Observable<Korisnik> {
    console.log("Id " + id);
    return this.http.get(`${baseKorisnikInfoUrl}/${id}`).pipe(
      map((data: any) => this.createKorisnik(data)),
    );
  }



//KNJIGE CRUD

  getKnjigeZaPocetnu(): Observable<Knjiga[]> {
    return this.http.get<any>(baseKnjigeUrl +`/limited?_limit=4`)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createKnjige(item))
      ))
  }

  getSveKnjige(): Observable<Knjiga[]> {
    return this.http.get<any>(baseKnjigeUrl)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createKnjige(item))
      ))
  }

  pretraziKnjige(kriterijum: string): Observable<Knjiga[]> {
    return this.http.get<any>(baseKnjigeUrl +`/search?_q=`+kriterijum)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createKnjige(item))
      ))
  }


  getKnjigeKategorije(id: number): Observable<Knjiga[]> {
    return this.http.get<any>(baseKnjigeUrl +`/search/kategorija?_kategorijaId`+id)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createKnjige(item))
      ))
  }
  

  updateKnjiga(novaKnjiga: any): Observable<Knjiga> {
    return this.http.put<any>(baseKnjigeUrl, novaKnjiga)
      .pipe(map((data: any) => this.createKnjige(data)))
  }

  dodajKnjigu(knjiga: Knjiga): Observable<Knjiga> {
    return this.http.post(baseKnjigeUrl, knjiga)
      .pipe(map((data: any) => this.createKnjige(data)))
  }

  deleteKnjiga(id: number) : Observable<any> {
    return this.http.delete<any>(`${baseKnjigeUrl}/${id}`);
  }

  izmeniKnjigu(data:any, id: number) : Observable<Knjiga> {
    return this.http.put<any>(baseKnjigeUrl, data)
    .pipe(map((data: any) => this.createKnjige(data)))
  }

  getKonkretnaKnjiga(id: number): Observable<Knjiga> {
    return this.http.get(`${baseKnjigeUrl}/${id}`).pipe(
      map((data: any) => this.createKnjige(data)),
    );
  }




//CRUD KATEGORIJE

  getSveKategorije(): Observable<Kategorija[]> {
    return this.http.get<any>(baseKategorijeUrl)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createKategorija(item))
      ))
  }

  getKategorija(id: number): Observable<Kategorija> {
    return this.http.get(`${baseKategorijeUrl}/${id}`).pipe(
      map((data: any) => this.createKategorija(data)),
    );
  }

  getNazivKategorije(id: number): Observable<string> {
    return this.http.get(`${baseKnjigeUrl}/${id}`).pipe(
      map((data: any) => data.kategorijaNaziv),
    );
  }

  getKnjigeKategorija(id: number): Observable<Knjiga[]> {
    return this.http.get<any>(baseKnjigeUrl +`/search/kategorija?_kategorijaId=`+id)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createKnjige(item))
      ))
  }

  dodajKategoriju(kategorija: Kategorija): Observable<Kategorija> {
    return this.http.post(baseKategorijeUrl, kategorija)
      .pipe(map((data: any) => this.createKategorija(data)),)
  }

 




// CRUD PORUDZBINE


  upisiPorudzbinu(porudzbina: Porudzbina): Observable<Porudzbina> {
    return this.http.post(basePorudzbineUrl, porudzbina)
      .pipe(map((data: any) => this.createPorudzbina(data)),)
  }

  upisiStavkuPorudzbine(stavka: Stavka): Observable<Stavka> {
    return this.http.post(baseStavkeUrl, stavka)
      .pipe(map((data: any) => this.createStavka(data)),)
  }


  getSvePorudzbine(): Observable<Porudzbina[]> {
    return this.http.get<any>(basePorudzbineUrl+"/orderDesc")
      .pipe(map((data: any) => data.map((item: any) =>
        this.createPorudzbina(item))
      ))
  }

  izmeniPorudzbinu(data:any) : Observable<Porudzbina> {
    return this.http.put<any>(basePorudzbineUrl, data)
    .pipe(map((data: any) => this.createPorudzbina(data)))
  }

  pretraziPorudzbine(kriterijum: string): Observable<Porudzbina[]> {
    return this.http.get<any>(basePorudzbineUrl +`/search?_q=`+kriterijum)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createPorudzbina(item))
      ))
  }

  getPorudzbinaPoId(id:number): Observable<Porudzbina> {
    return this.http.get(`${basePorudzbineUrl}/${id}`).pipe(
      map((data: any) => this.createPorudzbina(data)),
    );
  }

  getStavkeIzPorudzbine(id:number): Observable<Stavka[]> {
    return this.http.get<any>(baseStavkeUrl +`/search/porudzbina?_porudzbinaId=`+id)
      .pipe(map((data: any) => data.map((item: any) =>
      this.createStavka(item))
    ))
  }

  getPorudzbinePoKorisniku(id:number): Observable<Porudzbina[]> {
    return this.http.get<any>(basePorudzbineUrl +`/search/korisnik?_korisnikId=`+id)
    .pipe(map((data: any) => data.map((item: any) =>
    this.createPorudzbina(item))
  ))
  }




  //POVEZ
  getSviPovezi(): Observable<Povez[]> {
    return this.http.get<any>(basePovezUrl)
    .pipe(map((data: any) => data.map((item: any) =>
      this.createPovez(item))
    ))
  }




  //PISMO
  getSvaPisma(): Observable<Pismo[]> {
    return this.http.get<any>(basePismoUrl)
      .pipe(map((data: any) => data.map((item: any) =>
        this.createPismo(item))
      ))
  }

  dodajPismo(pismo: Pismo): Observable<Pismo> {
    return this.http.post(basePismoUrl, pismo)
      .pipe(map((data: any) => this.createPismo(data)),)
  }




 /* createKnjigaSaKategorijom(item: any): Knjiga {

    let knjiga = new Knjiga(item.naziv, item.autor, item.opis, item.pismo, item.povez, item.brojStrana, item.stanje, item.slikaUrl, item.kategorija, item.cena);
    knjiga.id = item.id;

    this.getNazivKategorije(item.kategorijeId).subscribe(res => knjiga.kategorija = res);


    return knjiga;
  }*/


  createKategorija(item: any): Kategorija {
    let kategorija = new Kategorija(item.kategorijaNaziv);
    kategorija.id = item.id;
    return kategorija;
  }

  createKnjige(item: any): Knjiga {
    let knjiga = new Knjiga(item.naziv, item.autor, item.opis, item.pismo, item.povez, item.brojStrana, item.stanje, item.slikaUrl, item.kategorija, item.cena);
    knjiga.id = item.id;
    return knjiga;
  }

  createKorisnik(item: any): Korisnik {
    console.log(item);
    let korisnik = new Korisnik(item.username, item.email);
    korisnik.id = item.id;
    return korisnik;
  }


  createPorudzbina(item: any): Porudzbina {
    let porudzbina = new Porudzbina(item.korisnik, item.datumKreiranja, item.ime, item.prezime, item.grad, item.adresa, item.zip, item.brTelefona, item.status)
    porudzbina.id = item.id;
    console.log(porudzbina.id);
    return porudzbina;
  }

  createStavka(item: any): Stavka {
    let stavka = new Stavka(item.knjiga, item.brojPrimeraka, item.porudzbina)
    stavka.id = item.id;
    return stavka;
  }

  createPismo(item: any): Pismo {
    let pismo = new Pismo(item.id, item.pismo);
    return pismo;
  }

  createPovez(item: any): Povez {
    let povez = new Povez(item.id, item.vrsta);
    povez.vrsta = item.vrsta;
    return povez;
  }






}
