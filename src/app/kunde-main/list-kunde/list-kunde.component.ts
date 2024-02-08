import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Kunde } from 'src/data/entities/kunde';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-kunde',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-kunde.component.html',
  styleUrls: ['./list-kunde.component.css']
})
export class ListKundeComponent implements OnChanges {
  @Input() items: Array<Kunde> = [];
  @Output() kundeUpdatedClicked: EventEmitter<Kunde> = new EventEmitter<Kunde>();
  @Output() kundeDelClicked: EventEmitter<Kunde> = new EventEmitter<Kunde>();

  editRowIndex: number | null = null;
  kundeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.kundeForm = this.fb.group({
      kunden: this.fb.array([])
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && changes['items'].currentValue) {
      this.buildKundenForm(changes['items'].currentValue);
    }
  }

  private buildKundenForm(items: Array<Kunde>): void {
    const kundenFormArray = this.kundeForm.get('kunden') as FormArray;
    kundenFormArray.clear();

    items.forEach((kunde) => {
      const kundeGroup = this.fb.group({
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
    if (index === this.editRowIndex) {

      if (this.kundeForm.valid) {
        this.kundeUpdatedClicked.emit(this.items[index]);
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
      this.kundeDelClicked.emit(this.items[index]);
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
        : ""
  }

  getKundenErrorsNested(index: number, nestedName: string, name = 'adresse'): string {
    return this.kunden.controls[index].get(name)?.get(nestedName)?.hasError('required')
      ? "field required"
      : this.kunden.controls[index].get(name)?.get(nestedName)?.hasError('pattern')
        ? "only numbers"
        : this.kunden.controls[index].get(name)?.get(nestedName)?.hasError('maxlength')
          ? "max lenght is 5"
          : ""
  }


}
