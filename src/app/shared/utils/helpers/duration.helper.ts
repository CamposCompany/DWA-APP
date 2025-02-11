export function formatDuration(timeStr: string): string {

  const getTotalSeconds = (timeStr: string): number => {
    if (!timeStr.includes(':')) {
      return parseInt(timeStr);
    }
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTimeUnits = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60); 
    const s = totalSeconds % 60;

    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}min`);
    if (s > 0) parts.push(`${s}s`);

    return parts.join(' ') || '0s';
  };

  const totalSeconds = getTotalSeconds(timeStr);
  return formatTimeUnits(totalSeconds);
}