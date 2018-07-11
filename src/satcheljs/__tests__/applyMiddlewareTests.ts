import applyMiddleware from '../applyMiddleware';
import * as dispatcher from '../dispatcher';
import { getGlobalContext, __resetGlobalContext } from '../globalContext';

describe('applyMiddleware', () => {
  it('updates dispatchWithMiddleware to point to the middleware pipeline', () => {
    __resetGlobalContext();
    let testMiddleware = jasmine.createSpy('testMiddleware');

    applyMiddleware(testMiddleware);
    const dispatch = getGlobalContext().dispatchWithMiddleware;

    if (dispatch) {
      dispatch({});
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

    const dispatch = getGlobalContext().dispatchWithMiddleware;

    if (dispatch) {
      dispatch(dispatchedActionMessage);
    }

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

    const dispatch = getGlobalContext().dispatchWithMiddleware;

    if (dispatch) {
      dispatch({});
    }

    expect(sequence).toEqual(['middleware1', 'middleware2', 'finalDispatch']);
  });
});
