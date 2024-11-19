import { Component, inject, signal, ViewChild } from '@angular/core';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GenericListComponent } from "../../../templates/generic-list/generic-list.component";
import { ContactMeDTO } from '../../../../api/dtos/contact-me-dtos';
import { PaginationDTO } from '../../../../api/dtos/paginationDTO';
import { PageSizeOptions } from '../../../../util/utility-variables';
import { HeadersResponses, UrlStrings } from '../../../../util/utility-strings';
import { ContactMeService } from '../../../../api/services/contact-me.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { extractErrors, getHeaderString, getTranslation, getTranslationWithParams } from '../../../../util/utility-functions';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-inbox-control-panel',
  standalone: true,
  imports: [TabTitleComponent, TranslateModule, GenericListComponent, MatTableModule, MatExpansionModule,
    SweetAlert2Module, MatPaginatorModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './inbox-control-panel.component.html',
  styleUrl: './inbox-control-panel.component.css'
})
export class InboxControlPanelComponent{
  contactMeService = inject(ContactMeService);
  translate = inject(TranslateService);

  readonly panelOpenState = signal(false);
  urlStrings = UrlStrings;

  columnsToShow = ['id', 'name', 'email', 'phoneNumer', 'message', 'readed', 'obtained', 'actions'];

  messages!: ContactMeDTO[];
  pagination: PaginationDTO = { page: 1, recordsPerPage: 10 };
  totalAmoutOfRecords!: number;
  pageSize = PageSizeOptions;
  errors: string[] = [];
  propertiesList!: MatTableDataSource<ContactMeDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.loadRecords();
  }

  loadRecords() {
    this.contactMeService.getPagination(this.pagination)
      .subscribe(response => {
        this.messages = response.body as ContactMeDTO[];
        this.totalAmoutOfRecords = getHeaderString<ContactMeDTO[]>(response, HeadersResponses.totalAmountOfRecords);
        this.propertiesList = new MatTableDataSource<ContactMeDTO>(this.messages);
        this.propertiesList.paginator = this.paginator;
      });
  }

  updatePagination(data: PageEvent) {
    this.pagination = { page: data.pageIndex + 1, recordsPerPage: data.pageSize };
    this.loadRecords();
  }

  remove(id: number) {
    this.contactMeService.remove(id).subscribe({
      next: () => {
        const success = getTranslation("success", this.translate);
        const userRemove = getTranslationWithParams("controlPanel.users.removed", id.toString(), this.translate);
        Swal.fire(success, userRemove, "success");
        this.loadRecords();
      },
      error: (err) => {
        let errors = extractErrors(err);
        this.errors = errors;
      }
    });
  }

  readed(id: number, readed: boolean) {
    this.contactMeService.update(id, readed).subscribe({
      next: () => {
        this.loadRecords();
      },
      error: (err) => {
        let errors = extractErrors(err);
        this.errors = errors;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.propertiesList.filter = filterValue.trim().toUpperCase();
  }
}
