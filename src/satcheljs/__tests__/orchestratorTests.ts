import orchestrator from '../orchestrator';
import * as dispatcher from '../dispatcher';

describe('orchestrator', () => {
  it('throws if the action creator does not have an action ID', () => {
    let actionCreator: any = {};

    expect(() => {
      orchestrator(actionCreator, () => {});
    }).toThrow();
  });

  it('subscribes the target function to the action', () => {
    let callback = () => {};
    let actionId = 'testAction';
    let actionCreator: any = { __SATCHELJS_ACTION_ID: actionId };
    spyOn(dispatcher, 'subscribe');

    orchestrator(actionCreator, callback);

    expect(dispatcher.subscribe).toHaveBeenCalledWith(actionId, callback);
  });

  it('returns the target function', () => {
    let actionCreator: any = { __SATCHELJS_ACTION_ID: 'testAction' };
    let callback = () => {};

    let returnValue = orchestrator(actionCreator, callback);

    expect(returnValue).toBe(callback);
  });
});
