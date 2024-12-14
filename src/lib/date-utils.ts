export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getCurrentTimestamp(): string {
  return formatTimestamp(new Date());
}