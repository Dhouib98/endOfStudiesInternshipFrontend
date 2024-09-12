import { Component } from '@angular/core';

@Component({
  selector: 'app-vendeur',  // Fix this selector
  standalone: true,
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent {
  userData = localStorage.getItem('user');
  userDetails:any
  username:string = "not found"

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userDetails = JSON.parse(userData);
      this.username = this.userDetails.username
      
    } else {
      console.log('No user data found in localStorage.');
    }
  }

}
