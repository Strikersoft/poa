import { action, actionCreator, getPrivateActionId } from '../actionCreator';
import * as createActionId from '../createActionId';
import * as dispatcher from '../dispatcher';

describe('actionCreator', () => {
  it('returns the created action message', () => {
    const testAction = actionCreator('testAction', (arg0, arg1) => {
      return {
        arg0,
        arg1
      };
    });

    const actionMessage = testAction('value0', 'value1');

    expect(actionMessage.arg0).toBe('value0');
    expect(actionMessage.arg1).toBe('value1');
  });

  it('returns a default action message if no factory is provided', () => {
    const testAction = actionCreator('testAction');

    const actionMessage = testAction();

    expect(actionMessage).not.toBeNull();
  });

  it('stamps the action message with the type and private action ID', () => {
    spyOn(createActionId, 'default').and.returnValue('id0');
    const actionType = 'testAction';
    const testAction = actionCreator(actionType);

    const actionMessage = testAction();

    expect((actionMessage as any).type).toBe(actionType);
    expect(getPrivateActionId(actionMessage)).toBe('id0');
  });

  it('does not dispatch the action message', () => {
    const testAction = actionCreator('testAction');
    spyOn(dispatcher, 'dispatch');

    testAction();

    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it('throws if the action message already has a type', () => {
    const testAction = actionCreator('testAction', () => {
      return { type: 'testAction' };
    });

    expect(testAction).toThrow();
  });

  it('gets stamped with the private action ID', () => {
    spyOn(createActionId, 'default').and.returnValue('id1');

    const testAction = actionCreator('testAction');

    expect(getPrivateActionId(testAction)).toBe('id1');
  });
});

describe('action', () => {
  it('dispatches the action message', () => {
    const actionMessage = {};
    const testAction = action('testAction', () => actionMessage);
    spyOn(dispatcher, 'dispatch');

    testAction();

    expect(dispatcher.dispatch).toHaveBeenCalledWith(actionMessage);
  });
});
