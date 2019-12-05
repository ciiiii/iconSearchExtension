import React from 'react';
import './index';
import Index from '@/pages/index';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <div style={{ width: '600px' }}>
      <Index />
    </div>
  );
};

export default BasicLayout;
