import * as React from 'react';
import { Link, Translator, Component, observable, i18n } from '../../../src/poa';

import { Store, Actions } from '../store';

@Component({ namespaces: ['common', 'pages'] })
export class RootPage extends React.Component {
  store: Store;
  actions: Actions;
  t: Translator;

  @observable localState = { newHello: '' };

  render() {
    return (
      <React.Fragment>
        <nav>
          <ul>
            <li>
              <Link to="/about">{this.t('aboutPage')}</Link>
            </li>
            <li>
              <select
                value={i18n.language}
                onChange={({ currentTarget }) => {
                  i18n.changeLanguage(currentTarget.value, () => window.location.reload());
                }}
              >
                <option value="en">{this.t('en')}</option>
                <option value="uk">{this.t('uk')}</option>
              </select>
            </li>
          </ul>
        </nav>
        <h2>{this.store.helloText}</h2>
        <label>
          {this.t('helloText')}
          <input
            value={this.localState.newHello}
            onChange={({ currentTarget }) => (this.localState.newHello = currentTarget.value)}
          />
        </label>
        <button onClick={() => this.actions.changeHelloText(this.localState.newHello)}>
          {this.t('changeHelloValue')}
        </button>
      </React.Fragment>
    );
  }
}
