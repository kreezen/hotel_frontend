import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostgresKundeRepository } from 'src/data/repositories/postgres_kunden_repo_impl';
import { Kunde } from 'src/data/entities/kunde';
import { ListKundeComponent } from '../list-kunde/list-kunde.component';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-kunde-main',
  standalone: true,
  imports: [CommonModule, ListKundeComponent],
  templateUrl: './kunde-main.component.html',
  styleUrls: ['./kunde-main.component.css']
})
export class KundeMainComponent implements OnInit{
  kunden: Array<Kunde> = []
  
  error: string = ""
  
  constructor(private kundenRepo: PostgresKundeRepository){

  }

  ngOnInit(): void {
    this.loadKunden()
  }

  lk():Observable<Array<Kunde>>{
    return this.kundenRepo.getAll();
  }

  loadKunden(): void{
    this.kundenRepo.getAll().subscribe(
      {
        next: (kunden) => this.kunden = kunden,
        error: (err) => this.error = err,
        complete: () => console.log(this.kunden)
      }
    )
  }

  updateKunde(updatedKunde: Kunde): void{
    this.kundenRepo.update(updatedKunde.id, updatedKunde).subscribe({error: (err) => console.log(err)});
  }

  delKunde(delKunde: Kunde): void {
    this.kundenRepo.delete(delKunde.id);
  }

}
