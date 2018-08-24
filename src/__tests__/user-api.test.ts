import { boot, PoaComponent, captureException, PoaRouterType } from '../core';
import { createAction, addMutator, addSideEffects, initAction } from '../state';
import { Link, Outlet } from '../router';
import { t } from '../i18n';

describe('End user Poa API', () => {
  it(`core: boot, PoaComponent, captureException, PoaRouterType`, () => {
    expect(boot).toBeDefined();
    expect(PoaComponent).toBeDefined();
    expect(captureException).toBeDefined();
    expect(PoaRouterType).toBeDefined();
  });

  it(`i18n: t`, () => {
    expect(t).toBeDefined();
  });

  it(`state: createAction, addMutator, addSideEffect, initAction`, () => {
    expect(createAction).toBeDefined();
    expect(addMutator).toBeDefined();
    expect(addSideEffects).toBeDefined();
    expect(initAction).toBeDefined();
  });

  it(`router: <Link />, <Outlet />`, () => {
    expect(Link).toBeDefined();
    expect(Outlet).toBeDefined();
  });
});
