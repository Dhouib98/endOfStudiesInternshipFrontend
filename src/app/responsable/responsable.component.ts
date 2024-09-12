import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SearchProductService } from '../search-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responsable',
  standalone: true,
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css'],
  imports: [FormsModule,CommonModule] // Add FormsModule here
})
export class ResponsableComponent {
  userData = localStorage.getItem('user');
  userDetails: any;
  nom: string = "not found";
  prenom: string = "not found";
  products: any[] = []; // Ensure products is initialized as an empty array
  searchQuery: string = ''; // Variable to hold the search query

  constructor(private searchProductService: SearchProductService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userDetails = JSON.parse(userData);
      this.nom = this.userDetails.nom;
      this.prenom = this.userDetails.prenom;
    } else {
      console.log('No user data found in localStorage.');
    }
  }

  // Method to call the service and search for products
  searchProduct() {
    this.searchProductService.searchProduct(this.searchQuery).subscribe({
      next: (data:any) => {
        this.products = data; // Assign the results to the products array
        console.log(this.products);
      },
      error: (error:any) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
