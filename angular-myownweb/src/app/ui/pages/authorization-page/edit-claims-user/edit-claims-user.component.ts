import { Component, inject, Input, OnInit } from '@angular/core';
import { SecurityService } from '../../../../api/services/security.service';
import { ClaimDTO } from '../../../../api/dtos/authorization-dtos';
import { addTagToErrors, extractErrors, extractErrorsEntity } from '../../../../util/utility-functions';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from "../../../../util/loading/loading.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationDTO } from '../../../../api/dtos/paginationDTO';
import { PageSizeOptions } from '../../../../util/utility-variables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterLink } from '@angular/router';
import { UrlStrings } from '../../../../util/utility-strings';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ShowErrorsComponent } from "../../../features/show-errors/show-errors.component";
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-edit-claims-user',
  standalone: true,
  imports: [TranslateModule, LoadingComponent, MatTableModule, MatButtonModule, MatPaginatorModule, SweetAlert2Module,
    RouterLink, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, ShowErrorsComponent, TabTitleComponent],
  templateUrl: './edit-claims-user.component.html',
  styleUrl: './edit-claims-user.component.css'
})
export class EditClaimsUserComponent implements OnInit{
  @Input('username')
  username!: string;

  urlStrings = UrlStrings;

  claim!: ClaimDTO;
  errors: string[] = [];
  loading = true;
  pagination: PaginationDTO = { page: 1, recordsPerPage: 5 };
  totalAmoutOfRecords!: number;
  pageSize = PageSizeOptions;
  columnsToShow = ['claimType', 'actions'];
  
  securityService = inject(SecurityService);
  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    claimType: ['', { validators: [Validators.required] }]
  }); 

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(){
    this.securityService.getClaimsFromUser(this.username).subscribe({
      next: (userClaim) => {
        this.claim = userClaim.body as ClaimDTO;
        this.totalAmoutOfRecords = this.claim.claimType.length;
        this.loading = false;
      },
      error: (err) =>{
        const errors = extractErrorsEntity(err);
        this.errors = addTagToErrors(errors, "authorization.err.");
      }
    });
  }

  addClaims(){
    this.loading = true;
    let claimType = this.form.controls.claimType.getRawValue()?.split(' ');
    let claimDTO: ClaimDTO = {claimType: claimType!, userName: this.username};
    this.securityService.addClaim(claimDTO).subscribe({
      next: () =>{
        this.loadRecords();
      },
      error: (err)=>{
        const errors = extractErrorsEntity(err);
        this.errors = addTagToErrors(errors, "authorization.err.");
      }
    });
  }

  removeClaim(claimType: string){
    this.loading = true;
    let claimDTO: ClaimDTO = {claimType: [claimType], userName: this.username};
    this.securityService.removeClaim(claimDTO).subscribe({
      next: () =>{
        this.loadRecords();
      },
      error: (err) => {
        const errors = extractErrorsEntity(err);
        this.errors = addTagToErrors(errors, "authorization.err.");
      }
    });
  }

  reloadContent(){
    this.loadRecords();
  }
}
