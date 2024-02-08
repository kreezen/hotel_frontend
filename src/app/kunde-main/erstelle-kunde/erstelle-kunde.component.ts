import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Kunde } from 'src/data/entities/kunde';

@Component({
  selector: 'app-erstelle-kunde',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './erstelle-kunde.component.html',
  styleUrls: ['./erstelle-kunde.component.css']
})
export class ErstelleKundeComponent {
  @Output() createKundeClicked: EventEmitter<Kunde> = new EventEmitter<Kunde>();
  kundeForm: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {
    this.kundeForm = this.createKundenFbBuilder();
  }

  createKundenFbBuilder(): FormGroup<any> {
    return this.fb.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      tel: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      adresse: this.fb.group({
        strasse: ['', Validators.required],
        hausnr: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        ort: ['', Validators.required],
        plz: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(5)])],
      }),
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onCancel(): void {
    this.closeModal();
    this.kundeForm.reset();
  }

  onSubmit() {
    if (this.kundeForm.valid) {
      const kundeData = this.kundeForm.value;
      this.createKundeClicked.emit(kundeData);
      this.kundeForm.reset();
      this.closeModal();
    }
  }

  getKundenErrors(name: string): string {
    return this.kundeForm.get(name)?.hasError('required')
      ? "field required"
      : this.kundeForm.get(name)?.hasError('pattern')
        ? "only numbers"
        : ""
  }

  getKundenErrorsNested(nestedName: string, name = 'adresse'): string {
    return this.kundeForm.get(name)?.get(nestedName)?.hasError('required')
      ? "field required"
      : this.kundeForm.get(name)?.get(nestedName)?.hasError('pattern')
        ? "only numbers"
        : this.kundeForm.get(name)?.get(nestedName)?.hasError('maxlength')
          ? "max lenght is 5"
          : ""
  }

}
