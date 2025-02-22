import { isNotification } from '../../is-notification';
import { ERROR_NOTIFICATION_NAME } from './error-notification-name.constant';
import { IErrorNotification } from './error-notification.type';

export function isErrorNotification<GValue = any>(
  value: any,
): value is IErrorNotification<GValue> {
  return isNotification<'error', GValue>(value, ERROR_NOTIFICATION_NAME);
}
