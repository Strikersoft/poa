import * as React from 'react';
import { observable } from 'mobx';
import { Route, RouteProps, Redirect } from 'react-router';
import { PoaRouteConfig, PoaRouteResolveStratery } from './router';
import { getActions } from '../state-lib/state';
import { observer } from 'mobx-react';
import { logger } from '../logger-lib/logger';

const log = logger.get('poa-route');

export interface PoaRouteProps extends RouteProps {
  config: PoaRouteConfig;
}

export enum RouteMode {
  resolved,
  loading,
  rejected
}

@observer
export class InternalPoaRoute extends React.Component<PoaRouteProps> {
  @observable mode: RouteMode = RouteMode.loading;
  redirectTo: string;

  async componentWillMount() {
    if (this.props.config.onActivate) {
      this.mode = RouteMode.loading;
      try {
        const result = await this.props.config.onActivate({
          actions: getActions(),
          location: this.props.location
        });

        if (typeof result === 'string') {
          this.redirectTo = result;
        }

        this.mode = RouteMode.resolved;
      } catch (e) {
        log.debug('Route onActivate error', e);
        this.mode = RouteMode.rejected;
      }
    } else {
      this.mode = RouteMode.resolved;
    }
  }

  render() {
    if (this.props.config.resolveStrategy === PoaRouteResolveStratery.nonwait) {
      if (this.redirectTo) {
        return <Redirect exact={true} to={this.redirectTo} />;
      }

      return <Route {...this.props} />;
    }

    switch (this.mode) {
      case RouteMode.resolved:
        if (this.redirectTo) {
          return <Redirect exact={true} to={this.redirectTo} />;
        }

        return <Route {...this.props} />;
      case RouteMode.rejected:
        return this.props.config.error ? this.props.config.error() : 'Error occured on route';
      case RouteMode.loading:
        return this.props.config.loading ? this.props.config.loading() : 'Loading...';
      default:
        return null;
    }
  }
}
