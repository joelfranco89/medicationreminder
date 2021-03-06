import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from "@angular/forms";
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css']
})
export class ReminderFormComponent implements OnInit {


  frequencyOptions = ['Hourly', 'Every Minute']

  selectedFrequency = 'Hourly'

  hourlyTimelineArray = [];

  everyMinuteTimelineArray = [];
  
  selectedHourlyTimeline;

  selectedEveryMinuteTimeline;

  allReminders;

  reminderSent;

  
  firstName;
  lastName;
  email;
  medicineName;
  frequency;
  amountOfPills;
  


  constructor(private reminderService: RoutesService) { }

  ngOnInit() {

    this.reminderService.getReminder().subscribe(reminders => this.allReminders = reminders);


    for (var i = 2; i < 25; i++){
      this.hourlyTimelineArray.push(i);
    }

    for (var i = 2; i < 61; i++){
      this.everyMinuteTimelineArray.push(i);
    }
    console.log(this.reminderSent);
  }

  frequencySelected(selection){
    this.selectedFrequency = selection;
    console.log(this.selectedFrequency);
  }

  hourlyTimelineSelected(timeline){
    this.selectedHourlyTimeline = timeline
    console.log(timeline);
  }

  everyMinuteTimelineSelected(timeline){
    this.selectedEveryMinuteTimeline = timeline
    console.log(timeline);
  }

  onSave(newReminder){
    this.reminderService.saveReminder(newReminder).subscribe(reminder => {
      this.reminderSent = true;
      console.log(this.reminderSent);
      this.ngOnInit()
    });
  }

  reminderSubmitted(){
    this.reminderSent = true
  }



}
