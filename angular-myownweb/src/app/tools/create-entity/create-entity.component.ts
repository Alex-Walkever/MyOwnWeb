import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SERVICE_CRUD_TOKEN } from '../providers/providers';
import { IServiceCRUD } from '../interfaces/IServiceCRUD';
import { extractErrors } from '../utilityFunctions';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";

@Component({
  selector: 'app-create-entity',
  standalone: true,
  imports: [ShowErrorsComponent],
  templateUrl: './create-entity.component.html',
  styleUrl: './create-entity.component.css'
})
export class CreateEntityComponent<TDTO, TCreationDTO> implements AfterViewInit {
  ngAfterViewInit(): void {
    this.componentRef = this.containerForm.createComponent(this.form);
    this.componentRef.instance.postForm.subscribe((entity: any) => {
      this.saveChanges(entity);
    });
  }

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  indexRoute!: string;

  @Input({ required: true })
  form: any;

  errors: string[] = [];

  serviceCRUD = inject(SERVICE_CRUD_TOKEN) as IServiceCRUD<TDTO, TCreationDTO>;
  private router = inject(Router);

  @ViewChild('containerForm', { read: ViewContainerRef })
  containerForm!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  saveChanges(entity: TCreationDTO) {
    this.serviceCRUD.create(entity).subscribe({
      next: () => {
        this.router.navigate([this.indexRoute]);
      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;
      }
    })
  }
}
