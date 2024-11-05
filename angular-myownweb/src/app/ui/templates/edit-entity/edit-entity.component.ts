import { Component, ComponentRef, inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { extractErrors } from '../../../util/utility-functions';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../util/utility-variables';
import { IServiceCRUD } from '../../../lib/interfaces/IServiceCRUD';
import { ShowErrorsComponent } from "../../features/show-errors/show-errors.component";
import { LoadingComponent } from "../../../util/loading/loading.component";

@Component({
  selector: 'app-edit-entity',
  standalone: true,
  imports: [ShowErrorsComponent, LoadingComponent],
  templateUrl: './edit-entity.component.html',
  styleUrl: './edit-entity.component.css'
})
export class EditEntityComponent<TDTO, TCreationDTO> implements OnInit {
  ngOnInit(): void {
    this.servicieCRUD.getFromId(this.id).subscribe(entity => {
      this.loadComponent(entity);
    });

    this.loading = false;
  }

  loadComponent(entity: any) {
    if (this.containerForm) {
      this.componentRef = this.containerForm.createComponent(this.form);
      this.componentRef.instance.model = entity;
      
      this.componentRef.instance.postForm.subscribe((entity: any) => {
        this.saveChanges(entity);
      });
      this.componentRef.instance.editSubTitle.subscribe((value: string) => {
        this.subTitle = value;
      });
    }
  }

  @Input()
  id!: number;

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  indexRoute!: string;

  @Input({ required: true })
  form: any;

  errors: string[] = [];
  subTitle:string = '';

  servicieCRUD = inject(SERVICE_CRUD_INJECTION_TOKEN) as IServiceCRUD<TDTO, TCreationDTO>;
  private router = inject(Router);
  loading = true;

  @ViewChild('containerForm', { read: ViewContainerRef })
  containerForm!: ViewContainerRef;

  @ViewChild('getSubTitle', { read: ViewContainerRef })
  getSubTitle!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  saveChanges(entity: TCreationDTO) {
    this.servicieCRUD.update(this.id, entity).subscribe({
      next: () => {
        this.router.navigate([this.indexRoute]);
      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;
      }
    })
  }

  // getSubtitleTranslate(): string {
  //   let lang = localStorage.getItem(LocalStorageStrings.language);

  //   if (lang == 'en') {
  //      return this.form?.controls?.enTitle;
  //   } else if (lang == 'es') {
  //      return this.form?.controls?.esTitle;
  //   }

  //   return "";
  // }

}
