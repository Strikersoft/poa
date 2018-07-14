import applyMiddleware from '../applyMiddleware';
import * as dispatcher from '../dispatcher';
import { getGlobalContext, __resetGlobalContext } from '../globalContext';

describe('applyMiddleware', () => {
  it('updates dispatchWithMiddleware to point to the middleware pipeline', () => {
    __resetGlobalContext();
    let testMiddleware = jasmine.createSpy('testMiddleware');

    applyMiddleware(testMiddleware);
    const context = getGlobalContext();

    if (context.dispatchWithMiddleware) {
      context.dispatchWithMiddleware({});
    }

    expect(testMiddleware).toHaveBeenCalled();
  });

  it('the action message and next delegate get passed to middleware', () => {
    __resetGlobalContext();

    let dispatchedActionMessage = {};
    let actualNext;
    let actualActionMessage;

    applyMiddleware((next: any, actionMessage: any) => {
      actualNext = next;
      actualActionMessage = actionMessage;
    });

    const context = getGlobalContext();
    if (context.dispatchWithMiddleware) {
      context.dispatchWithMiddleware(dispatchedActionMessage);
    }

    // Assert
    expect(actualActionMessage).toBe(dispatchedActionMessage);
    expect(actualNext).toBe(dispatcher.finalDispatch);
  });

  it('middleware and finalDispatch get called in order', () => {
    __resetGlobalContext();
    let sequence: string[] = [];

    spyOn(dispatcher, 'finalDispatch').and.callFake(() => {
      sequence.push('finalDispatch');
    });

    applyMiddleware(
      (next: any, actionMessage: any) => {
        sequence.push('middleware1');
        next(actionMessage);
      },
      (next: any, actionMessage: any) => {
        sequence.push('middleware2');
        next(actionMessage);
      }
    );

    const context = getGlobalContext();
    if (context.dispatchWithMiddleware) {
      context.dispatchWithMiddleware({});
    }

    expect(sequence).toEqual(['middleware1', 'middleware2', 'finalDispatch']);
  });
});
