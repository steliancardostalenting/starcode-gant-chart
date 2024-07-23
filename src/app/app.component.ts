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
import { RegisterDevextremeService } from './services/register-devextreme.service';

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
  constructor(
    private elementRef: ElementRef,
    private service: Service,
    private devExtremeService: RegisterDevextremeService
  ) {}

  customValue: string = '';

  ngOnInit() {
    this.loadTasks();
    this.registerDevExtremeLicense();
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
  }

  private readcustomField(customProperty: string): string {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    return hostElement.getAttribute(customProperty) || '';
  }
}
