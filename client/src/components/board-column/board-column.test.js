import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BoardColumn from './board-column.component';

it('renders', () => {
	const { asFragment } = render(<BoardColumn />);
	expect(asFragment()).toMatchSnapshot();
});
