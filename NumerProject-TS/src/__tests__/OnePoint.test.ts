import { evaluate } from "mathjs";

const error =(xold:number, xnew:number)=> Math.abs((xnew-xold)/xnew)*100;

const calOnePoint = (x:number,equation:string)=>{
    let xnew=0,ea=100,iter=0;
    const MAX = 50;

    do{
        xnew = evaluate(equation,{x:x});
        ea = error(x,xnew);
        x = xnew;
        iter++;
    }while(ea > 0.000001 && iter < MAX)
    return xnew
}

describe("OnePoint",()=>{
    test("OnePoint Equation 1",()=>{
        expect(calOnePoint(0,"1/4+x/2")).toBeCloseTo(0.5)
    })
})
