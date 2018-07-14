import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { HelloComponent } from '../hello.component';

describe('CORE — Hello Component', () => {
  it('renders', () => {
    const component = renderer.create(<HelloComponent />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
