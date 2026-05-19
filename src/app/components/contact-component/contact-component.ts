import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('Ticket de support créé avec succès :', this.contactData);

    alert(`Merci ${this.contactData.name}, votre message a bien été transmis au support SGAE !`);

    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

}
