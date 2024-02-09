import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostgresKundeRepository } from 'src/data/repositories/postgres_kunden_repo_impl';
import { Kunde } from 'src/data/entities/kunde';
import { ListKundeComponent } from './list-kunde/list-kunde.component';
import { ErstelleKundeComponent } from './erstelle-kunde/erstelle-kunde.component';
import { FilterKundeComponent } from './filter-kunde/filter-kunde.component';


@Component({
  selector: 'app-kunde-main',
  standalone: true,
  imports: [CommonModule, ListKundeComponent, ErstelleKundeComponent, FilterKundeComponent],
  templateUrl: './kunde-main.component.html',
  styleUrls: ['./kunde-main.component.css']
})
export class KundeMainComponent implements OnInit {
  kunden: Array<Kunde> = []
  filterKunden: Array<Kunde> = []
  error: string = ""

  constructor(private kundenRepo: PostgresKundeRepository) {

  }

  ngOnInit(): void {
    this.loadKunden()
  }

  loadKunden(): void {
    this.kundenRepo.getAll().subscribe(
      {
        next: (kunden) => {
          this.kunden = kunden
          this.filterKunden = kunden
        },
        error: (err) => this.error = err,
        complete: () => console.log(this.kunden)
      }
    )
  }

  refreshData() {
    this.loadKunden()
  }

  updateKunde(updatedKunde: Kunde): void {
    this.kundenRepo.update(updatedKunde.id, updatedKunde)
      .subscribe({
        next: (v) => console.log(v),
        error: (err) => this.error = err,
        complete: () => this.refreshData()
      });
  }

  delKunde(delKunde: Kunde): void {
    this.kundenRepo.delete(delKunde.id)
      .subscribe({
        next: (v) => console.log(v),
        error: (err) => this.error = err,
        complete: () => this.refreshData()
      });
  }

  createKunde(kunde: Kunde): void {
    this.kundenRepo.create(kunde)
      .subscribe({
        next: (v) => console.log(v),
        error: (err) => this.error = err,
        complete: () => this.refreshData()
      });
  }

  onFilteredKunde(filteredKunden: Array<Kunde>) {
    this.kunden = filteredKunden
  }

}
