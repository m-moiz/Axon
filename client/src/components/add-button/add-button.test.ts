import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddButton from './add-button.component';

it('renders', () => {
	const { asFragment } = render(<AddButton />);
	expect(asFragment()).toMatchSnapshot();
});
