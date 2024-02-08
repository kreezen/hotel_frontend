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

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.kundeForm.valid) {
      const kundeData = this.kundeForm.value;
      console.log('Form Data:', kundeData);
      //this.createKunde.emit(kundeData);
      this.kundeForm.reset();
      // Optionally, close the modal here
      this.closeModal();
    }
  }

}
