import { cn } from '@/lib/utils';
import { Bell, CreditCard, Car, Settings, Tag } from 'lucide-react';
import { type Notification } from '@/stores/notifications.store';

const typeIcons = {
  booking: Car,
  payment: CreditCard,
  rental: Car,
  system: Settings,
  promo: Tag,
};

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const Icon = typeIcons[notification.type] || Bell;
  const timeAgo = getTimeAgo(notification.timestamp);

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 rounded-lg p-3 cursor-pointer transition-colors hover:bg-muted',
        !notification.read && 'bg-primary/5',
      )}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          !notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', !notification.read && 'font-semibold')}>{notification.title}</p>
        <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
      </div>
      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
