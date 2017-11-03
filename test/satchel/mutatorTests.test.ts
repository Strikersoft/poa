import mutator from '../../src/state-lib/satchel/mutator';
import * as dispatcher from '../../src/state-lib/satchel/dispatcher';
import * as globalContext from '../../src/state-lib/satchel/globalContext';

jest.genMockFromModule('mobx');

const mobx = require('mobx');

describe('mutator', () => {
  let mockGlobalContext: any;

  beforeEach(() => {
    mockGlobalContext = { inMutator: false };
    spyOn(globalContext, 'getGlobalContext').and.returnValue(mockGlobalContext);
    spyOn(dispatcher, 'subscribe');
  });

  it('throws if the action creator does not have an action ID', () => {
    // Arrange
    let actionCreator: any = {};

    // Act / Assert
    expect(() => {
      mutator(actionCreator, () => ({}));
    }).toThrow();
  });

  it('subscribes the target function to the action', () => {
    // Arrange
    let actionId = 'testAction';
    let actionCreator: any = { __SATCHELJS_ACTION_ID: actionId };

    // Act
    mutator(actionCreator, () => ({}));

    // Assert
    expect(dispatcher.subscribe).toHaveBeenCalled();
    expect((dispatcher.subscribe as any).calls.argsFor(0)[0]).toBe(actionId);
  });

  it('wraps the subscribed callback in a MobX action', () => {
    // Arrange
    let callback = () => {
      //
    };
    let wrappedCallback = () => {
      //
    };
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    jest.spyOn(mobx, 'action').mockReturnValueOnce(wrappedCallback);

    // Act
    mutator(actionCreator, callback);

    // Assert
    expect(mobx.action).toHaveBeenCalledWith(callback);
  });

  it('returns the target function', () => {
    // Arrange
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let callback = () => ({});

    // Act
    let returnValue = mutator(actionCreator, callback);

    // Assert
    expect(returnValue).toBe(callback);
  });

  it('throws if the target function is async', () => {
    // Arrange
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let callback = async () => ({});

    mutator(actionCreator, callback);
    let subscribedCallback = (dispatcher.subscribe as jasmine.Spy).calls.argsFor(0)[1];

    // Act / Assert
    expect(subscribedCallback).toThrow();
  });

  it('sets the inMutator flag to true for the duration of the mutator callback', () => {
    // Arrange
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let inMutatorValue;
    let callback = () => {
      expect(mockGlobalContext.inMutator).toBeTruthy();
    };
    mutator(actionCreator, callback);

    // Act
    let subscribedCallback = (dispatcher.subscribe as jasmine.Spy).calls.argsFor(0)[1];
    subscribedCallback();

    // Assert
    expect(mockGlobalContext.inMutator).toBeFalsy();
  });
});
