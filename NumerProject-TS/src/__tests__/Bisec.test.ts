import { evaluate } from 'mathjs';

const error = (xold: number, xnew: number): number => Math.abs((xnew - xold) / xnew) * 100;

const CalBisec = (xl: number, xr: number,equation:string):number=> {
    let xm, fXm, fXr, ea=100;
    let iter = 0;
    const MAX = 50;

    do {
      xm = (xl + xr) / 2.0;
      fXr = evaluate(equation, { x : xr });
      fXm = evaluate(equation, { x: xm });
      iter++;

      if (fXm * fXr > 0) {
        ea = error(xr, xm);
        xr = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xl, xm);
        xl = xm;
      }else{
        ea = 0;
        break
      }
    } while (ea > 0.000001 && iter < MAX);
    return xm
};

describe("Bisection", () => {

    test("Bisection Equation 1", () => {
      expect(CalBisec(1, 2, "(x^4)-13")).toBe(1.8988289088010788);
    });

    test("Bisection Equation 2", () => {
        expect(CalBisec(-1, 5, "(x^2)-4")).toBe(2);
    });
    
    test("Bisection Equation 3", () => {
        expect(CalBisec(5,12, "2x-20")).toBeCloseTo(10,5);
    });

  });