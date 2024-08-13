import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Service } from './app.service';
import { DxGanttComponent, DxGanttModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Task } from './models/task';
import {
  TaskDeletedEvent,
  TaskInsertedEvent,
  TaskUpdatedEvent,
} from 'devextreme/ui/gantt';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';

import { ResizeService } from './services/resize/resize.service';
import { Localization } from '../assets/localization/localization';
import { TasksService } from './services/tasks/tasks.service';
import { RegisterDevextremeService } from './services/dev-extreme/register-devextreme.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DxGanttModule, HttpClientModule],
  providers: [Service, ResizeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(DxGanttComponent, { static: false }) gantt!: DxGanttComponent;
  tasks: Task[] = [];
  apiUrl: string = '';

  formatMessage = formatMessage;
  constructor(
    private elementRef: ElementRef,
    private service: Service,
    private devExtremeService: RegisterDevextremeService,
    private tasksService: TasksService,
    private resizeService: ResizeService
  ) {
    this.getElementProperties();
  }
  ngAfterViewInit(): void {
    this.resizeService.initResizeService(this.gantt);
  }

  ngOnInit() {
    this.loadTasks();
    this.registerDevExtremeLicense();
  }

  public onTaskUpdated(e: TaskUpdatedEvent) {
    let initialObject = this.tasks.find((x) => x.id == e.key);
    if (initialObject) {
      this.tasksService.updateDifferences(initialObject, e.values);
      this.service.updateTaskInDb(this.apiUrl, initialObject).subscribe();
    }
  }

  public onTaskInserted(e: TaskInsertedEvent) {
    this.service
      .createTaskInDB(this.apiUrl, e.values)
      .subscribe((result: any) => {
        this.tasks[this.tasks.length - 1].id = result.production_order_id;
      });
    this.gantt.instance.showTaskDetailsDialog(
      this.tasks[this.tasks.length - 1].id
    );
  }

  public onTaskDeleted(e: TaskDeletedEvent) {
    this.service.deleteTask(this.apiUrl, e.key).subscribe();
  }

  /**
   * Translate the gant chart to the value from the parent list
   * @param language The language code
   */
  private translateGantChart(language: string): void {
    const localization = new Localization();

    //Load the dictionary
    loadMessages(localization.getDictionary());

    //Switch to correct dictioanry
    locale(language);
  }

  /**
   * Loop throu all parent node and get the language code if the parent has the user_language key
   * @param spanElement
   * @returns
   */
  private findParentDivWithCustomData(spanElement: HTMLAnchorElement): string {
    let parentElement = spanElement.parentElement;

    // Loop through all parent elements until the root is reached
    while (parentElement) {
      // Check if the parent is a div and has the custom data attribute
      if (
        parentElement.tagName === 'DIV' &&
        parentElement.getAttribute('col-id') === 'user_language'
      ) {
        return spanElement.innerHTML;
      }
      // Move up to the next parent
      parentElement = parentElement.parentElement;
    }

    // If no matching div is found, return empty
    return '';
  }

  /**
   * Loop throu the parent elements and get all the values for the language and API url
   */
  private getElementProperties(): void {
    if (typeof window !== 'undefined') {
      //Get the selected rows from the ag grid
      const selectedRows =
        window.parent.document.querySelectorAll<HTMLDivElement>(
          '.ag-row-selected'
        );

      //Loop the rows and parse the values
      selectedRows.forEach((row) => {
        const languageElement = row.querySelectorAll<HTMLAnchorElement>('span');
        languageElement.forEach((lng) => {
          // find the language code
          const language = this.findParentDivWithCustomData(lng);
          if (language) {
            this.translateGantChart(language);
          }
        });

        // go to all links elements
        const links = row.querySelectorAll<HTMLAnchorElement>('a');
        links.forEach((hyperLink) => {
          if (hyperLink.href.indexOf('index.html') == -1) {
            //save the api URL
            this.apiUrl = hyperLink.href;
          }
        });
      });
    }
  }

  /**
   * Load the tasks from the API
   */
  private loadTasks(): void {
    if (this.apiUrl) {
      this.service.getProductionOrderTasks(this.apiUrl).then((res) => {
        this.tasks = res;
      });
    }

    //this.tasks = this.devExtremeService.getDefaultTasks();
  }

  /**
   * Register the devextreme license
   */
  private registerDevExtremeLicense(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    const licence =
      hostElement.getAttribute('data-custom-dev-extreme-license') || '';
    if (licence) {
      this.devExtremeService.licenseKey = licence;
      this.devExtremeService.registerLicense();
    }
  }
}
