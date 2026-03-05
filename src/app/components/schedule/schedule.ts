import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { ScheduleService, ScheduleEventDto } from '../../services/schedule/schedule';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {
  isModalOpen = false;
  selectedDateStr = '';
  newEventTitle = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: []
  };

  constructor(
    private scheduleService: ScheduleService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.scheduleService.getEvents(userId).subscribe({
      next: (data: ScheduleEventDto[]) => {

        this.calendarOptions.events = data.map(e => ({
          title: e.title,
          date: e.eventDate
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Błąd podczas ładowania wydarzeń:', err)
    });
  }

  handleDateClick(arg: any) {
    this.selectedDateStr = arg.dateStr;
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  addEvent() {
    const userId = this.authService.getUserId();

    if (this.newEventTitle.trim() && userId) {
      const newEventDto: ScheduleEventDto = {
        title: this.newEventTitle,
        eventDate: this.selectedDateStr
      };

      this.scheduleService.addEvent(newEventDto, userId).subscribe({
        next: (savedEvent) => {

          this.calendarOptions.events = [
            ...(this.calendarOptions.events as any[]),
            { title: savedEvent.title, date: savedEvent.eventDate }
          ];
          this.closeModal();
        },
        error: (err) => console.error('Błąd podczas zapisywania wydarzenia:', err)
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.newEventTitle = '';
    this.cdr.detectChanges();
  }
}