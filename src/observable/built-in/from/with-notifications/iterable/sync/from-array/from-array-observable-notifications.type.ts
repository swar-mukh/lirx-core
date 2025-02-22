import { ICompleteNotification } from '../../../../../../../misc/notifications/built-in/complete/complete-notification.type';
import { INextNotification } from '../../../../../../../misc/notifications/built-in/next/next-notification.type';

export type IFromArrayObservableNotifications<GValue> =
  | INextNotification<GValue>
  | ICompleteNotification
  ;
