import React from 'react';
import { shallow } from 'enzyme';
import CustomButton from './custom-button.component';

it('renders custom-button component', () => {
	expect(shallow(<CustomButton>Hello</CustomButton>)).toMatchSnapshot();
});
