import orchestrator from '../orchestrator';
import * as dispatcher from '../dispatcher';

describe('orchestrator', () => {
  it('throws if the action creator does not have an action ID', () => {
    const actionCreator: any = {};

    expect(() => {
      orchestrator(actionCreator, () => {});
    }).toThrow();
  });

  it('subscribes the target function to the action', () => {
    const callback = () => {};
    const actionId = 'testAction';
    const actionCreator: any = { __SATCHELJS_ACTION_ID: actionId };
    spyOn(dispatcher, 'subscribe');

    orchestrator(actionCreator, callback);

    // Assert
    expect(dispatcher.subscribe).toHaveBeenCalledWith(actionId, callback);
  });

  it('returns the target function', () => {
    const actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    const callback = () => {};

    const returnValue = orchestrator(actionCreator, callback);

    // Assert
    expect(returnValue).toBe(callback);
  });
});
