import { createAnimationFrame } from '../../../../../../misc/timer/create-animation-frame';
import { createAnimationFrameLoop } from '../../../../../../misc/timer/create-animation-frame-loop';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function fromAnimationFrame(): IObservable<void> {
  return (emit: IObserver<void>): IUnsubscribe => {
    return createAnimationFrameLoop(emit);
  };
}


export function fromSingleAnimationFrame(): IObservable<void> {
  return (emit: IObserver<void>): IUnsubscribe => {
    return createAnimationFrame(emit);
  };
}
