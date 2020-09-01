import React from 'react';

import {
  configure,
  shallow
} from 'enzyme';
import Adpater from 'enzyme-adapter-react-16';

import SideDrawer from './SideDrawer';
import { SideContainer } from './styles';

configure({adapter: new Adpater()});

describe('<SideDrawer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SideDrawer />);
  });

  it('should SideContainer className is Open if props open', () => {
    wrapper.setProps({open: true});
    expect(wrapper.exists('.Open')).toEqual(true);
  })

  it('should SideContainer className is Open if props open', () => {
    wrapper.setProps({open: false});
    expect(wrapper.exists('.Close')).toEqual(true);
  })
});