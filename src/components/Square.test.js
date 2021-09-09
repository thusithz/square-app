import { render, cleanup, fireEvent } from '@testing-library/react';
import Square from './Square';

describe('Square', () => {

    let props ;

    beforeEach(() => {
         props = {
            id : 1, 
            color: 'red', 
            isClicked: false, 
            onClickSquare: jest.fn(),
         } 
    })
    afterEach(() => {
        cleanup();
    });

    test('Square Render Successfully', () => {
        const { container } = render(<Square />);
        expect(container).toBeDefined();
    });

    test('Square without click', () => {
        const { container } = render(<Square {...props} />);
        expect(container.firstChild).toHaveClass('square');
        expect(container.getElementsByClassName('square-border').length).toBe(0);
        expect(container.getElementsByClassName('rotate').length).toBe(0);
    });

    test('Square clicked', () => {
        const { container } = render(<Square {...props} isClicked={true} />);

        expect(container.firstChild).toHaveClass('square');
        expect(container.getElementsByClassName('square-border').length).toBe(1);
        expect(container.getElementsByClassName('rotate').length).toBe(1);
        
        fireEvent.click(container.querySelector('.rotate'));
        expect(props.onClickSquare).toBeCalledWith(1, true);
    });
})

