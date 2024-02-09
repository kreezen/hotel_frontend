import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Kunde } from 'src/data/entities/kunde';

@Component({
  selector: 'app-filter-kunde',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-kunde.component.html',
  styleUrls: ['./filter-kunde.component.css']
})
export class FilterKundeComponent {
  @Output() filteredKundeClicked = new EventEmitter<Array<Kunde>>();
  @Input() kundenListe: Array<Kunde> = [];
  searchTerm: string = '';

  search() {
    // Führe die Filterung durch und emittiere das Ergebnis
    const filteredKunden = this.performFilter(this.searchTerm);
    this.filteredKundeClicked.emit(filteredKunden);
  }

  private performFilter(searchTerm: string): Array<Kunde> {
    // Filtere die Kundenliste basierend auf dem Suchbegriff
    const gefilterteKunden = this.kundenListe.filter((kunde) =>
      // Überprüfe jedes Feld auf Übereinstimmung mit dem Suchbegriff
      Object.values(kunde).some((wert) =>
        wert?.toString().toLowerCase().includes(searchTerm)
      ) ||
      // Überprüfe das Adresse-Objekt
      Object.values(kunde.adresse).some((wert) =>
        wert?.toString().toLowerCase().includes(searchTerm)
      )
    );

    return gefilterteKunden

  }

}
