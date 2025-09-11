import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/v1/tickets/get_tickets');
  }

  createTicket(newTicket: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/v1/tickets/create_ticket', newTicket);
  }

  // updateTicket(ticket: Ticket): Observable<Ticket> {
  //   return this.http.put<Ticket>(`/api/tickets/${ticket.id}`, ticket);
  // }

  // deleteTicket(id: number): Observable<void> {
  //   return this.http.delete<void>(`/api/tickets/${id}`);
  // }
}
