export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  date_creation: string;
  is_read: boolean;
}