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
      tel: ['', Validators.required],
      adresse: this.fb.group({
        strasse: ['', Validators.required],
        hausnr: ['', Validators.required],
        ort: ['', Validators.required],
        plz: ['', Validators.required],
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

}
