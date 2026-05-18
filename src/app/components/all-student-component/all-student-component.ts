import { Component, inject, OnInit } from '@angular/core';
import { StudentResponse } from '../../models/registration.models';
import { RegistrationService } from '../../services/registration-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-student-component',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './all-student-component.html',
  styleUrl: './all-student-component.css',
})
export class AllStudentComponent implements OnInit{
alert(arg0: string) {
throw new Error('Method not implemented.');
}
  students: any [] = [];
  private regService = inject(RegistrationService);
  private router = inject(Router)

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
  this.regService.getAllStudents().subscribe(res => {
    this.students = res;
    console.log("Données reçues du backend :", res[0]); // Affiche le premier étudiant
  });
}


 handleToggleStatus(student: StudentResponse) {
  const statusObservable = student.enabled
    ? this.regService.disableStudent(student.userId)
    : this.regService.enableStudent(student.userId);

  statusObservable.subscribe({
    next: (response) => {
      student.enabled = !student.enabled;

      const message = student.enabled ? "Étudiant activé avec succès !" : "Étudiant désactivé avec succès !";
      alert(message);
    },
    error: (err) => {
      alert("Erreur lors du changement de statut.");
      console.error("Détails de l'erreur:", err);
    }
  });
}

selectedStudent: any = null;

openEditModal(student: StudentResponse) {
  this.selectedStudent = { ...student };
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

goToDetails(userId: number) {
  this.router.navigate(['/admin', 'student-details', userId]);
}

}
