import { IObservable, IUnsubscribeOfObservable } from '../../../observable/type/observable.type';
import { runAllowSignalWritesContext } from '../internal/allow-signal-writes';
import { runSignalContextAndObserveChanges } from '../internal/run-signal-context';
import { SuperSignal } from '../internal/super-signal.class';
import { ISignalToObservableOptions } from '../signal/signal-to-observable-options.type';
import { SIGNAL } from '../signal/signal.symbol';
import { ISignal } from '../signal/signal.type';
import { IComputedFunction } from './computed-function.type';
import { IComputedOptions } from './computed-options.type';

export function computed<GValue>(
  computedFunction: IComputedFunction<GValue>,
  options?: IComputedOptions<GValue>,
): ISignal<GValue> {
  const _signal = new SuperSignal<GValue>(void 0 as GValue, options);

  let unsubscribeOfSignals: IUnsubscribeOfObservable;
  let requiresUpdate: boolean = true;

  const update = (): void => {
    let computedValue!: GValue;

    const signalsChange$: IObservable<unknown> = runSignalContextAndObserveChanges(
      (): void => {
        computedValue = computedFunction();
      },
      {
        allowSignalWrites: false,
        throwIfChildSignalContext: false,
      },
    );

    runAllowSignalWritesContext((): void => {
      _signal.set(computedValue);
    }, true);

    unsubscribeOfSignals = signalsChange$((): void => {
      unsubscribeOfSignals();
      update();
    });
  };

  const newSignal: ISignal<GValue> = ((): GValue => {
    if (requiresUpdate) {
      requiresUpdate = false;
      update();
    }
    return _signal.get();
  }) as ISignal<GValue>;

  newSignal.toObservable = (
    {
      emitCurrentValue = true,
      ...options
    }: ISignalToObservableOptions = {},
  ): IObservable<GValue> => {
    if (emitCurrentValue && requiresUpdate) {
      requiresUpdate = false;
      update();
    }
    return _signal.toObservable({
      ...options,
      emitCurrentValue,
    });
  };

  newSignal[SIGNAL] = void 0;

  return newSignal;
}
