import { APP_CONFIG } from '@/constants/config';

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return 'Date invalide';
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} à ${hours}:${minutes}`;
}

export function isToday(date: string | Date): boolean {
  const today = new Date();
  const compareDate = new Date(date);
  return (
    today.getDate() === compareDate.getDate() &&
    today.getMonth() === compareDate.getMonth() &&
    today.getFullYear() === compareDate.getFullYear()
  );
}