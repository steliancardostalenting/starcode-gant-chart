import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

import { Service } from './app.service';
import { DxGanttModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DxGanttModule, HttpClientModule],
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  apiUrl: string = '';
  constructor(private elementRef: ElementRef, private service: Service) {}

  customValue: string = '';

  ngOnInit() {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    this.apiUrl = hostElement.getAttribute('data-custom-url') || '';
    this.loadTasks();
  }

  loadTasks() {
    this.service.getProductionOrderTasks(this.apiUrl).then((res) => {
      this.tasks = res;
    });
  }
}
