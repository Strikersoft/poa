import { action } from '../actionCreator';
import applyMiddleware from '../applyMiddleware';
import { dispatch } from '../dispatcher';
import mutator from '../mutator';
import orchestrator from '../orchestrator';
import { mutatorAction } from '../simpleSubscribers';
import createStore from '../createStore';

describe('satcheljs', () => {
  it('mutators subscribe to actions', () => {
    let actualValue;

    // Create an action creator
    let testAction = action('testAction', function testAction(value: string) {
      return {
        value: value
      };
    });

    // Create a mutator that subscribes to it
    let onTestAction = mutator(testAction, function(actionMessage) {
      actualValue = actionMessage.value;
    });

    // Dispatch the action
    testAction('test');

    // Validate that the mutator was called with the dispatched action
    expect(actualValue).toBe('test');
  });

  it('mutatorAction dispatches an action and subscribes to it', () => {
    let arg1Value;
    let arg2Value;

    let testMutatorAction = mutatorAction('testMutatorAction', function testMutatorAction(
      arg1: string,
      arg2: number
    ) {
      arg1Value = arg1;
      arg2Value = arg2;
    });

    testMutatorAction('testValue', 2);

    expect(arg1Value).toBe('testValue');
    expect(arg2Value).toBe(2);
  });

  it('mutators can modify the store', () => {
    let store = createStore('testStore', { testProperty: 'testValue' })();
    let modifyStore = action('modifyStore');

    mutator(modifyStore, _ => {
      store.testProperty = 'newValue';
    });

    modifyStore();

    expect(store.testProperty).toBe('newValue');
  });

  it('middleware gets called during dispatch', () => {
    let actualValue;
    let expectedValue = { type: 'testMiddleware' };

    applyMiddleware((next, actionMessage) => {
      actualValue = actionMessage;
      next(actionMessage);
    });

    dispatch(expectedValue);

    expect(actualValue).toBe(expectedValue);
  });

  it('middleware can handle promises returned from orchestrators', async () => {
    let testAction = action('testAction');
    orchestrator(testAction, () => Promise.resolve(1));
    orchestrator(testAction, () => Promise.resolve(2));

    let returnedPromise;
    applyMiddleware((next, actionMessage) => {
      returnedPromise = next(actionMessage);
    });

    testAction();
    let promiseValues = await returnedPromise;

    expect(promiseValues).toEqual([1, 2]);
  });
});
