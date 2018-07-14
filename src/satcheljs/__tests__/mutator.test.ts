import mutator from '../mutator';
import * as dispatcher from '../dispatcher';
import * as globalContext from '../globalContext';
import * as mobx from 'mobx';

describe('mutator', () => {
  let mockGlobalContext: any;

  beforeEach(() => {
    mockGlobalContext = { inMutator: false };
    spyOn(globalContext, 'getGlobalContext').and.returnValue(mockGlobalContext);
    spyOn(dispatcher, 'subscribe');
  });

  it('throws if the action creator does not have an action ID', () => {
    let actionCreator: any = {};

    expect(() => {
      mutator(actionCreator, () => {});
    }).toThrow();
  });

  it('subscribes the target function to the action', () => {
    let actionId = 'testAction';
    let actionCreator: any = { __SATCHELJS_ACTION_ID: actionId };

    mutator(actionCreator, () => {});

    expect(dispatcher.subscribe).toHaveBeenCalled();
    expect((<jasmine.Spy>dispatcher.subscribe).calls.argsFor(0)[0]).toBe(actionId);
  });

  it('wraps the subscribed callback in a MobX action', () => {
    let callback = () => {};
    let wrappedCallback = () => {};
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    spyOn(mobx, 'action').and.returnValue(wrappedCallback);

    mutator(actionCreator, callback);

    expect(mobx.action).toHaveBeenCalled();
  });

  it('returns the target function', () => {
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let callback = () => {};

    let returnValue = mutator(actionCreator, callback);

    expect(returnValue).toBe(callback);
  });

  it('throws if the target function is async', () => {
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let callback = async () => {};

    mutator(actionCreator, callback);
    let subscribedCallback = (dispatcher.subscribe as jasmine.Spy).calls.argsFor(0)[1];

    expect(subscribedCallback).toThrow();
  });

  it('sets the inMutator flag to true for the duration of the mutator callback', () => {
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let inMutatorValue;
    let callback = () => {
      expect(mockGlobalContext.inMutator).toBeTruthy();
    };
    mutator(actionCreator, callback);

    let subscribedCallback = (dispatcher.subscribe as jasmine.Spy).calls.argsFor(0)[1];
    subscribedCallback();

    expect(mockGlobalContext.inMutator).toBeFalsy();
  });
});
