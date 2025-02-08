export function formatDuration(timeStr: string): string {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  
  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0) result += `${seconds}s`;

  return result.trim();
} 