import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import translateValues from '../../../../../public/i18n/en.json'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TabTitleComponent } from "../../../util/tab-title/tab-title.component";

@Component({
  selector: 'app-show-translate-strings',
  standalone: true,
  imports: [TranslateModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, TabTitleComponent],
  templateUrl: './show-translate-strings.component.html',
  styleUrl: './show-translate-strings.component.css'
})
export class ShowTranslateStringsComponent implements AfterViewInit {
  constructor() {
    this.propertiesList = new MatTableDataSource<string>(Object.keys(translateValues));
    this.propertiesList.filterPredicate = (data: string, filter: string) => data.toUpperCase().includes(filter);
  }

  propertiesList: MatTableDataSource<string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.propertiesList.paginator = this.paginator;
  }

  columnsToShow = ['property', 'translate'];
  pagination = [5, 10, 15];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.propertiesList.filter = filterValue.trim().toUpperCase();
  }
}
