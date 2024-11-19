import { Component } from '@angular/core';
import { TabTitleComponent } from "../../../../util/tab-title/tab-title.component";
import { TranslateModule } from '@ngx-translate/core';
import { ContactMeFormComponent } from '../contact-me-form/contact-me-form.component';
import { SERVICE_CRUD_INJECTION_TOKEN } from '../../../../util/utility-variables';
import { ContactMeService } from '../../../../api/services/contact-me.service';
import { CreateEntityComponent } from "../../../templates/create-entity/create-entity.component";

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [TabTitleComponent, TranslateModule, CreateEntityComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.css',
  providers:[{provide: SERVICE_CRUD_INJECTION_TOKEN, useClass: ContactMeService}]
})
export class ContactMeComponent {
  contactMeForm = ContactMeFormComponent;
}
