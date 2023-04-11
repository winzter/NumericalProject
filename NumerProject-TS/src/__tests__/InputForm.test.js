import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Bisection from '../pages/RootOfEquation/Bisection';


describe('InputForm', () => {
  it('should call onSubmit with the correct values when submitted', () => {
    render(<Bisection />);
    const fxInput = screen.getByTestId('equ');
    fireEvent.change(fxInput, { target: { value: '(x^4)-13' } });

    const xlInput = screen.getByTestId('xl');
    fireEvent.change(xlInput, { target: { value: 1 } });

    const xrInput = screen.getByTestId('xr');
    fireEvent.change(xrInput, { target: { value: 2 } });

    // const errorInput = screen.getByTestId('err');
    // fireEvent.change(errorInput, { target: { value: 0.000001 } });

    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);

    const ans = screen.getByTestId("ans")
    console.log("Answer "+ans.textContent);

    expect(ans.textContent).toBe( "Answer = 1.8988289088010788");
  });
});
