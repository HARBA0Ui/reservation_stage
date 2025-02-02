import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactService } from "../../contact.service";

import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    CommonModule
  ],
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  router = inject(Router);


  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      prenom: ["", Validators.required],
      nom: ["", Validators.required],
      telephone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.sendEmail(this.contactForm.value).subscribe({
        next: (response) => {
          this.successMessage = "Votre message a été envoyé avec succès !";
          this.errorMessage = null;
          this.contactForm.reset();
          this.router.navigate([''])
        },
        error: () => {
          this.errorMessage = "Échec de l'envoi du message. Réessayez.";
          this.successMessage = null;
        },
      });
    }
  }
}
