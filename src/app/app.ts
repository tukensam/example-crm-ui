import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrmLayout } from './components/crm-layout/crm-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrmLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Example CRM UI');
}
