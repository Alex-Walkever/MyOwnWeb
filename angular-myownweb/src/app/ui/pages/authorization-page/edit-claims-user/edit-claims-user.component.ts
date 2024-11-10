import { Component, inject, Input, OnInit } from '@angular/core';
import { SecurityService } from '../../../../api/services/security.service';

@Component({
  selector: 'app-edit-claims-user',
  standalone: true,
  imports: [],
  templateUrl: './edit-claims-user.component.html',
  styleUrl: './edit-claims-user.component.css'
})
export class EditClaimsUserComponent implements OnInit{
  @Input('username')
  username!: string;
  
  securityService = inject(SecurityService);

  ngOnInit(): void {
    console.log(this.username);
  }
}
