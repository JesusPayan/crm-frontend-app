export interface TicketDetail {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    created_at: Date;
    updated_at: Date;
    assignedTo: number;
    createdBy: string;
    attachments?: string[]; // URLs or file paths to attachments
}    