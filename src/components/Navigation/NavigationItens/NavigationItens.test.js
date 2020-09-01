import React from 'react';

import {
  configure,
  shallow
} from 'enzyme';
import Adpater from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItens';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adpater()});

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render tow <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should an exact logout button', () => {
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});