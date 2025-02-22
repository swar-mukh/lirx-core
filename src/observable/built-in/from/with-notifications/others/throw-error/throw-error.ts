import { noop } from '@lirx/utils';
import { createErrorNotification } from '../../../../../../misc/notifications/built-in/error/create-error-notification';
import { IErrorNotification } from '../../../../../../misc/notifications/built-in/error/error-notification.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribeOfObservable } from '../../../../../type/observable.type';

export function throwError<GError>(
  error: GError,
): IObservable<IErrorNotification<GError>> {
  return (emit: IObserver<IErrorNotification<GError>>): IUnsubscribeOfObservable => {
    emit(createErrorNotification<GError>(error));
    return noop;
  };
}
