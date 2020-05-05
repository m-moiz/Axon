import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './form-input.component';

it('renders FormInput Component', () => {
	expect(shallow(<FormInput />)).toMatchSnapshot();
});
