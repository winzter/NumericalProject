import { evaluate } from "mathjs";

const error =(xold:number, xnew:number)=> Math.abs((xnew-xold)/xnew)*100;

const Calfalsepos = (xl:number, xr:number,equation:string):number => {

    var fXnew,fXr,ea=100,xnew:number,xold=0,fXl;
    var iter = 0;
    var MAX = 50;
    
    do
    {
      fXl = evaluate(equation,{x:xl})
      fXr = evaluate(equation, {x:xr})
      xnew = (xl*fXr - xr*fXl)/(fXr-fXl);
      fXnew = evaluate(equation, {x:xnew})
      iter++;
      if (fXnew*fXr > 0)
      {
          ea = error(xold, xnew);
          xr = xnew;
      }
      else if (fXnew*fXr < 0)
      {
          ea = error(xold, xnew);
          xl = xnew;
      }else{
        break
      }
      xold = xnew;
    }while(ea>0.000001 && iter<MAX)

    return xnew
    
}

describe("FalsePosition", () => {

    test("FalsePos Equation 1", () => {
      expect(Calfalsepos(3, 5, "(x^2)-16")).toBeCloseTo(4,5);
    });

    test("FalsePos Equation 2", () => {
        expect(Calfalsepos(1, 3, "(x^4)-1")).toBeCloseTo(1);
    });
    
    test("FalsePos Equation 3", () => {
        expect(Calfalsepos(5,12, "2x-20")).toBeCloseTo(10,5);
    });

  });