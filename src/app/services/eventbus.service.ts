import { Injectable, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventBusService {
  private listener: { [name: string]: EventEmitter<any> } = {};
  /**
   * Subscribe to an event with given name. Dont forgot to unsubscribe from event
   * @param eventName event name
   * @param callback callback function
   */
  registerListener<T>(eventName: string, callback: Function): Subscription {
    if (this.listener[eventName]) {
      const event = this.listener[eventName];
      return event.subscribe(callback);
    } else {
      const event = new EventEmitter();
      this.listener[eventName] = event;
      return event.subscribe(callback);
    }
  }
  /**
   * Emit given event with given parameters
   * @param eventName
   * @param args
   */
  emit(eventName: string, args: any) {
    const event = this.listener[eventName];
    if (event) {
      event.emit(args);
    }
  }
}
