import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Service } from './app.service';
import { DxGanttComponent, DxGanttModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { Task } from './models/task';
import { RegisterDevextremeService } from './services/dev-extreme/register-devextreme.service';
import {
  TaskDeletedEvent,
  TaskInsertedEvent,
  TaskUpdatedEvent,
} from 'devextreme/ui/gantt';
import { TasksService } from './services/tasks/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DxGanttModule, HttpClientModule],
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild(DxGanttComponent, { static: false }) gantt!: DxGanttComponent;
  tasks: Task[] = [];
  apiUrl: string = '';
  constructor(
    private elementRef: ElementRef,
    private service: Service,
    private devExtremeService: RegisterDevextremeService,
    private tasksService: TasksService
  ) {}

  customValue: string = '';

  ngOnInit() {
    this.loadTasks();
    this.registerDevExtremeLicense();
    this.logIframeUrl();
  }
  logIframeUrl() {
    var url =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href;
    console.log(url);
  }

  private registerDevExtremeLicense(): void {
    this.devExtremeService.licenseKey = this.readcustomField(
      'data-custom-dev-extreme-license'
    );
    this.devExtremeService.registerLicense();
  }

  private loadTasks() {
    this.apiUrl = this.readcustomField('data-custom-url');
    if (this.apiUrl) {
      this.service.getProductionOrderTasks(this.apiUrl).then((res) => {
        this.tasks = res;
      });
    }

    //this.tasks = this.devExtremeService.getDefaultTasks();
  }

  private readcustomField(customProperty: string): string {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    return hostElement.getAttribute(customProperty) || '';
  }

  onTaskUpdated(e: TaskUpdatedEvent) {
    let initialObject = this.tasks.find((x) => x.id == e.key);
    if (initialObject) {
      this.tasksService.updateDifferences(initialObject, e.values);
      this.service
        .updateTaskInDb(this.apiUrl, initialObject)
        .subscribe((error) => {
          console.log(error);
        });
    }
  }

  onTaskInserted(e: TaskInsertedEvent) {
    this.service.createTaskInDB(this.apiUrl, e.values).subscribe();
  }

  onTaskDeleted(e: TaskDeletedEvent) {
    this.service.deleteTask(this.apiUrl, e.key).subscribe();
  }
}
