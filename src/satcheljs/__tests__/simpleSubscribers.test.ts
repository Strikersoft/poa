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
    // Arrange
    const actionId = 'testSubscriber';

    // Act
    const returnValue = simpleSubscriber(actionId, () => {});

    // Assert
    expect(actionCreatorSpy).toHaveBeenCalled();
    expect(actionCreatorSpy.calls.argsFor(0)[0]).toBe(actionId);
    expect(returnValue).toBe(actionCreatorSpy.calls.first().returnValue);
  });

  it('includes arguments in the action message', () => {
    // Act
    const returnValue: Function = simpleSubscriber('testSubscriber', () => {});
    const createdAction = returnValue(1, 2, 3);

    // Assert
    expect(Array.from(createdAction.args)).toEqual([1, 2, 3]);
  });

  it('subscribes a callback to the action', () => {
    // Act
    simpleSubscriber('testSubscriber', () => {});

    // Assert
    expect(decoratorSpy).toHaveBeenCalled();
    expect(decoratorSpy.calls.argsFor(0)[0]).toBe(actionCreatorSpy.calls.first().returnValue);
  });

  it('passes arguments to the callback', () => {
    // Arrange
    const callback = jasmine.createSpy('callback');
    const actionMessage = { args: [1, 2, 3] };

    // Act
    simpleSubscriber('testSubscriber', callback);
    const decoratorCallback = decoratorSpy.calls.argsFor(0)[1];
    decoratorCallback(actionMessage);

    // Assert
    expect(callback).toHaveBeenCalledWith(1, 2, 3);
  });
});
