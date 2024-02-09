import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Kunde } from 'src/data/entities/kunde';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SortOrderDirective } from '../directives/sort-order.directive';

@Component({
  selector: 'app-list-kunde',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SortOrderDirective],
  templateUrl: './list-kunde.component.html',
  styleUrls: ['./list-kunde.component.css']
})
export class ListKundeComponent implements OnChanges {
  @Input() kundenListe: Array<Kunde> = [];
  @Output() kundeUpdatedClicked: EventEmitter<Kunde> = new EventEmitter<Kunde>();
  @Output() kundeDelClicked: EventEmitter<Kunde> = new EventEmitter<Kunde>();

  editRowIndex: number | null = null;
  kundeForm: FormGroup;
  searchTerm: string = "";

  constructor(private fb: FormBuilder) {
    this.kundeForm = this.fb.group({
      kunden: this.fb.array([])
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['kundenListe'] && changes['kundenListe'].currentValue) {
      this.buildKundenForm(changes['kundenListe'].currentValue);
    }
  }

  private buildKundenForm(items: Array<Kunde>): void {
    const kundenFormArray = this.kundeForm.get('kunden') as FormArray;
    kundenFormArray.clear();

    items.forEach((kunde) => {
      const kundeGroup = this.fb.group({
        id: [kunde.id],
        vorname: [kunde.vorname, Validators.required],
        nachname: [kunde.nachname, Validators.required],
        tel: [kunde.tel, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        adresse: this.fb.group({
          strasse: [kunde.adresse.strasse, Validators.required],
          hausnr: [kunde.adresse.hausnr, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
          ort: [kunde.adresse.ort, Validators.required],
          plz: [kunde.adresse.plz, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(5)])],
        }),
      });

      kundenFormArray.push(kundeGroup);
    });

  }

  get kunden(): FormArray {
    return this.kundeForm.get('kunden') as FormArray
  }

  toggleEditRow(index: number): void {
    if (index == this.editRowIndex) {

      if (this.kunden.controls[index].valid) {
        const kunde = this.kunden.controls[index].value
        this.kundeUpdatedClicked.emit(kunde);
        this.editRowIndex = null;
      }
    } else {
      // Enter edit mode
      this.editRowIndex = index;
    }
  }

  confirmDeleteRow(index: number): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.kundeDelClicked.emit(this.kundenListe[index]);
    }
  }

  isEditRow(index: number): boolean {
    return index == this.editRowIndex;
  }

  getKundenErrors(index: number, name: string): string {
    return this.kunden.controls[index].get(name)?.hasError('required')
      ? "field required"
      : this.kunden.controls[index].get(name)?.hasError('pattern')
        ? "only numbers"
        : this.kunden.controls[index].get(name)?.hasError('maxlength')
          ? "max lenght is 5"
          : ""
  }

  search(searchTerm: string) {
    // Filtere die Kundenliste basierend auf dem Suchbegriff
    const gefilterteKunden = this.kundenListe.filter((kunde) =>
      // Überprüfe jedes Feld auf Übereinstimmung mit dem Suchbegriff
      Object.values(kunde).some((wert) =>
        wert.toString().toLowerCase().includes(searchTerm)
      ) ||
      // Überprüfe das Adresse-Objekt
      Object.values(kunde.adresse).some((wert) =>
        wert.toString().toLowerCase().includes(searchTerm)
      )
    );
    this.buildKundenForm(gefilterteKunden)
  }

  sortTable(sortParams: string) {

    const [columnName, sortOrder] = sortParams.split(':');
    const numericSortOrder = +sortOrder; // convert string to number


    this.kunden.controls.sort((a, b) => {
      const valueA = a.get(columnName)?.value;
      const valueB = b.get(columnName)?.value;

      if (valueA < valueB) {
        return -1 * numericSortOrder;
      } else if (valueA > valueB) {
        return 1 * numericSortOrder;
      } else {
        return 0;
      }
    });
  }

}
