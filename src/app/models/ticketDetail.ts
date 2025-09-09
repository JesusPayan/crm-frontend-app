export interface TicketDetail {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    createdAt: Date;
    updatedAt: Date;
    assignedTo: string;
    createdBy: string;
    attachments?: string[]; // URLs or file paths to attachments
}    