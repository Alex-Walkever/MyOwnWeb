import { Component, inject, signal } from '@angular/core';
import { SecurityService } from '../../../../api/services/security.service';
import { ClaimDTO, UserDTO } from '../../../../api/dtos/authorization-dtos';
import { PaginationDTO } from '../../../../api/dtos/paginationDTO';
import { PageSizeOptions } from '../../../../util/utility-variables';
import { HeadersResponses, UrlStrings } from '../../../../util/utility-strings';
import { extractErrors, getHeaderString, getTranslation, getTranslationWithParams } from '../../../../util/utility-functions';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GenericListComponent } from "../../../templates/generic-list/generic-list.component";
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-control-panel',
  standalone: true,
  imports: [TranslateModule, GenericListComponent, MatPaginatorModule, MatTableModule, SweetAlert2Module, MatButtonModule, MatExpansionModule, RouterLink],
  templateUrl: './user-control-panel.component.html',
  styleUrl: './user-control-panel.component.css'
})
export class UserControlPanelComponent {
  securityService = inject(SecurityService);
  translate = inject(TranslateService);

  readonly panelOpenState = signal(false);
  urlStrings = UrlStrings;

  columnsToShow = ['email', 'username', 'claims', 'actions'];

  users!: UserDTO[];
  pagination: PaginationDTO = { page: 1, recordsPerPage: 5 };
  totalAmoutOfRecords!: number;
  pageSize = PageSizeOptions;
  errors: string[] = [];

  constructor() {
    this.loadRecords();
  }

  loadRecords() {
    this.securityService.getPagination(this.pagination)
      .subscribe(response => {
        this.users = response.body as UserDTO[];
        this.totalAmoutOfRecords = getHeaderString<UserDTO[]>(response, HeadersResponses.totalAmountOfRecords);
      });
  }

  updatePagination(data: PageEvent) {
    this.pagination = { page: data.pageIndex + 1, recordsPerPage: data.pageSize };
    this.loadRecords();
  }

  remove(username: string) {
    if (username != this.securityService.getJWTField('username')) {
      this.securityService.remove(username).subscribe({
        next: () => {
          const success = getTranslation("success", this.translate);
          const userRemove = getTranslationWithParams("controlPanel.users.removed", username, this.translate);
          Swal.fire(success, userRemove, "success");
          this.loadRecords();
        },
        error: (err) => {
          let errors = extractErrors(err);
          this.errors = errors;
        }
      });
    } else {
      const success = getTranslation("error", this.translate);
      const userRemove = getTranslation("controlPanel.users.err.remove", this.translate);
      Swal.fire(success, userRemove, "error");
    }
  }

  disableExpansionPanel(element: UserDTO): boolean {
    if (element.claims.claimType.length == 0) {
      return true;
    }
    return false;
  }
}
