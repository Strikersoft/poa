import { createSimpleSubscriber } from '../simpleSubscribers';
import { __resetGlobalContext } from '../globalContext';
import * as actionCreator from '../actionCreator';

describe('simpleSubscribers', () => {
  let actionCreatorSpy: jasmine.Spy;
  let decoratorSpy: jasmine.Spy;
  let simpleSubscriber: Function;

  beforeEach(() => {
    __resetGlobalContext();
    actionCreatorSpy = spyOn(actionCreator, 'action').and.callThrough();
    decoratorSpy = jasmine.createSpy('decoratorSpy');
    simpleSubscriber = createSimpleSubscriber(decoratorSpy);
  });

  it('creates and returns a bound action creator', () => {
    let actionId = 'testSubscriber';

    let returnValue = simpleSubscriber(actionId, () => {});

    expect(actionCreatorSpy).toHaveBeenCalled();
    expect(actionCreatorSpy.calls.argsFor(0)[0]).toBe(actionId);
    expect(returnValue).toBe(actionCreatorSpy.calls.first().returnValue);
  });

  it('includes arguments in the action message', () => {
    let returnValue: Function = simpleSubscriber('testSubscriber', () => {});
    let createdAction = returnValue(1, 2, 3);

    expect(Array.from(createdAction.args)).toEqual([1, 2, 3]);
  });

  it('subscribes a callback to the action', () => {
    simpleSubscriber('testSubscriber', () => {});

    expect(decoratorSpy).toHaveBeenCalled();
    expect(decoratorSpy.calls.argsFor(0)[0]).toBe(actionCreatorSpy.calls.first().returnValue);
  });

  it('passes arguments to the callback', () => {
    let callback = jasmine.createSpy('callback');
    let actionMessage = { args: [1, 2, 3] };

    simpleSubscriber('testSubscriber', callback);
    let decoratorCallback = decoratorSpy.calls.argsFor(0)[1];
    decoratorCallback(actionMessage);

    expect(callback).toHaveBeenCalledWith(1, 2, 3);
  });
});
