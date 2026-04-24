import { Component, inject, OnInit } from '@angular/core';
import { StudentResponse } from '../../models/registration.models';
import { RegistrationService } from '../../services/registration-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-student-component',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './all-student-component.html',
  styleUrl: './all-student-component.css',
})
export class AllStudentComponent implements OnInit{
  students: StudentResponse[] = [];
  private regService = inject(RegistrationService);

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.regService.getAllStudents().subscribe(res => this.students = res);
  }


  handleToggleStatus(student: StudentResponse) {
  if (student.enabled) {
    this.regService.disableStudent(student.userId).subscribe({
      next: () => {
        student.enabled = false;
        alert("Étudiant désactivé avec succès");
      },
      error: (err) => console.error(err)
    });
  } else {
    this.regService.enableStudent(student.userId).subscribe({
      next: () => {
        student.enabled = true;
        alert("Étudiant réactivé avec succès");
      },
      error: (err) => console.error(err)
    });
  }
}

// Variable pour stocker l'étudiant en cours de modification
selectedStudent: any = null;

openEditModal(student: StudentResponse) {
  // On crée une copie pour ne pas modifier le tableau directement avant validation
  this.selectedStudent = { ...student };
  // Code pour ouvrir la modale Bootstrap manuellement si nécessaire
}

confirmUpdate() {
  const updates = {
    firstname: this.selectedStudent.firstname,
    lastname: this.selectedStudent.lastname,
    email: this.selectedStudent.email,
    phoneNumber: this.selectedStudent.phoneNumber
  };

  this.regService.patchUpdateStudent(this.selectedStudent.userId, updates).subscribe({
    next: (res) => {
      // Mettre à jour la ligne dans le tableau
      const index = this.students.findIndex(s => s.userId === res.userId);
      this.students[index] = res;
      alert("Modifications enregistrées !");
      this.selectedStudent = null; // Ferme la modale (via binding)
    },
    error: (err) => alert("Erreur lors de la modification")
  });
}

}
