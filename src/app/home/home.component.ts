import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { VendeurComponent } from '../vendeur/vendeur.component';
import { ResponsableComponent } from '../responsable/responsable.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, VendeurComponent, ResponsableComponent], // Add CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  role: string = "not found";

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userDetails = JSON.parse(userData);
      this.role = this.userDetails?.role ?? 'not found';
      console.log('Role:', this.role);
    } else {
      console.log('No user data found in localStorage.');
    }
  }
}
