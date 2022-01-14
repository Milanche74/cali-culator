import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  public errorMessages:string[] = [];

  saveMessages(message:string) {
    this.errorMessages.push(message);
  }

  emptyMessages() {
    this.errorMessages = [];
    this.location.back();

  }

  constructor(
    private location: Location
  ) { }
}
