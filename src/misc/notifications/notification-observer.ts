import { IObserver } from '../../observer/type/observer.type';
import { IGenericNotification, INotification, TInferNotificationGName } from './notification.type';

export type IInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion extends IGenericNotification> = {
  [GName in TInferNotificationGName<GNotificationsUnion>]?: GNotificationsUnion extends INotification<GName, infer GValue>
    ? IObserver<GValue>
    : never;
}

export function notificationObserver<GNotificationsUnion extends IGenericNotification>(
  map: IInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
): IObserver<GNotificationsUnion> {
  return (notification: GNotificationsUnion): void => {
    // @ts-ignore
    if (map[notification.name] !== void 0) {
      // @ts-ignore
      map[notification.name](notification.value);
    }
  };
}





