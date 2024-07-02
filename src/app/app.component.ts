import { Component } from '@angular/core';

import {
  Service,
  Task,
  Dependency,
  Resource,
  ResourceAssignment,
} from './app.service';
import { DxGanttModule } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DxGanttModule],
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  tasks!: Task[];

  dependencies!: Dependency[];

  resources!: Resource[];

  resourceAssignments!: ResourceAssignment[];
  constructor(service: Service) {
    this.tasks = service.getTasks();
    this.dependencies = service.getDependencies();
    this.resources = service.getResources();
    this.resourceAssignments = service.getResourceAssignments();
  }
}
