import { render, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import SquareContainer, { createSquareArray } from './SquareContainer';

describe('SquareContainer', () => {

    let getById;

    beforeAll(() => {
       getById = queryByAttribute.bind(null, 'id');
    });

    afterEach(() => {
        cleanup();
    });

    test('SquareContainer Render Successfully', () => {
        const { container } = render(<SquareContainer />);
        expect(container).toBeDefined();
    });

    test('SquareContainer Scroll down', () => {
        const { container } = render(<SquareContainer />);
        fireEvent.scroll(container.querySelector('.square-container'), { target: { scrollY: window.innerHeight * .8 } });
        expect(container).toBeDefined();
    });

    test('SquareContainer Reset', () => {
        const { container, getByText } = render(<SquareContainer />);
        fireEvent.click(container.querySelector('button'));
        expect(getByText(`Cumulative number of squares created: ${createSquareArray().length}`)).toBeDefined();
    });

    test('SquareContainer onClickSquare', () => {
        const { container } = render(<SquareContainer />);
        fireEvent.click(container.querySelector('button'));
        // First click
        fireEvent.click(getById(container, 1));
        fireEvent.click(getById(container, 2));
        fireEvent.click(getById(container, 3));
        fireEvent.click(getById(container, 4));
        fireEvent.click(getById(container, 5));

        //Scond click on 4th square
        fireEvent.click(getById(container, 4));
        expect(container.getElementsByClassName('rotate').length).toBe(4);
    });
})

