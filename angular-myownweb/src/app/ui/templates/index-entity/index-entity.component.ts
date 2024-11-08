import { Component, inject, Input } from '@angular/core';
import { SERVICE_CRUD_INJECTION_TOKEN, PageSizeOptions } from '../../../util/utility-variables';
import { PaginationDTO } from '../../../api/dtos/paginationDTO';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GenericListComponent } from '../generic-list/generic-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
import { IServiceCRUD } from '../../../lib/interfaces/IServiceCRUD';
import { getHeaderString, getYearMonthString } from '../../../util/utility-functions';
import { HeadersResponses } from '../../../util/utility-strings';

@Component({
  selector: 'app-index-entity',
  standalone: true,
  imports: [TranslateModule, RouterLink, MatButtonModule, GenericListComponent, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './index-entity.component.html',
  styleUrl: './index-entity.component.css'
})
export class IndexEntityComponent<TDTO, TCreationDTO> {
  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  urlCreate!: string;

  @Input({ required: true })
  urlEdit!: string;

  @Input({ required: true })
  columnsToShow: string[] = [];

  @Input({ required: true })
  transalteString!: Function;

  serviceCRUD = inject(SERVICE_CRUD_INJECTION_TOKEN) as IServiceCRUD<TDTO, TCreationDTO>;

  pagination: PaginationDTO = { page: 1, recordsPerPage: 5 };
  entities!: TDTO[];
  totalAmoutOfRecords!: number;
  pageSize = PageSizeOptions;

  constructor() {
    this.loadRecords();
  }

  loadRecords() {
    this.serviceCRUD.getPagination(this.pagination).subscribe((response: HttpResponse<TDTO[]>) => {
      this.entities = response.body as TDTO[];
      this.totalAmoutOfRecords = getHeaderString<TDTO[]>(response, HeadersResponses.totalAmountOfRecords);
    })
  }

  updatePagination(data: PageEvent) {
    this.pagination = { page: data.pageIndex + 1, recordsPerPage: data.pageSize };
    this.loadRecords();
  }

  remove(id: number) {
    this.serviceCRUD.remove(id).subscribe(() => {
      this.pagination.page = 1;
      this.loadRecords();
    })
  }

  firstCapitalLetter(value: string) {
    if (!value) return value;

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
