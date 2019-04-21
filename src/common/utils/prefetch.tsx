import { __SERVER__ } from 'common/constants/environment';
import { IPreFetchState, PreFetchContext } from 'common/providers/Prefetched';
import React from 'react';
import { PrefetchKey } from './PrefetchState';

export function prefetch(key: PrefetchKey) {
  return function wrap(WrappedComponent: typeof PrefetchableComponent): {} {
    return class extends React.Component<{}> {
      public static contextType = PreFetchContext;
      public render() {
        const prefetcher: IPreFetchState = this.context;
        const fetcher = () => WrappedComponent.getServerState(this.props);
        let data;
        if (prefetcher.has(key)) {
          data = prefetcher.get(key);
        } else {
          prefetcher.queue(fetcher, key);
        }
        return <WrappedComponent prefetch={data} {...this.props} />;
      }
    };
  };
}

export interface IPrefetchedComponent {
  getServerState(props: {}): Promise<{}>;
}

/* tslint:disable-next-line */
export class PrefetchableComponent<P = {}, S = {}, SS = {}> extends React.Component<P, S, SS> {
  public static async getServerState(_: {}): Promise<{}> {
    throw new Error('Static getServerState method of PrefetchableComponent was not overwritten in implemented class');
  }
}
