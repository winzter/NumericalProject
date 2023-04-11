import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import InputForm from '../../components/InputForm';
import TableOutput from '../../components/TableOutput';
import Header from '../../components/Header';
import Chart from '../../components/Chart';
import { useClickOutside } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons-react';
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  Grid,
  Transition,
  Alert,
  Dialog
} from '@mantine/core';
import EquationChart from '../../components/EquationChart';

interface BisectionObject {
  iteration: number;
  Xl: number;
  Xm: number;
  Xr: number;
  Err: number;
  ErrNotDecimal: number;
}
interface LabelBisecFalse{
  Xl: string;
  Xm: string;
  Xr: string;
  Err: string;
}

interface LabelForm {
    labelFX:string,
    labelXL:string,
    labelXR:string
}

interface X{
  x:number
}


function Bisection() {

    const [newData, setNewData] = useState<BisectionObject[]>([]);
    const [InValid,setInValid] = useState<boolean>(false)
    const clickOutside = useClickOutside(()=>{setInValid(false)})
    const [PropsEquation,setPropsEquation] = useState("(x^4)-13")
    const [Fxlr,setFxlr] = useState(Array(2).fill(0))
    const [UserInput , setUserInput] = useState({
      Equation:"(x^4)-13",
      X:0,
      XL:0,
      XR:0,
      Error:0.000001,
      starter:"x"
    })
 
    const [Status, setStatus] = useState<boolean>(false);

    const data: BisectionObject[] = [];
    const dataX:X[] = []
    
    const labelForm: LabelForm = {
      labelFX:`Input f(${UserInput.starter})`,
      labelXL:`Input ${UserInput.starter.toUpperCase()}L`,
      labelXR:`Input ${UserInput.starter.toUpperCase()}R`
    }
    const label: LabelBisecFalse = {
      Xl:`${UserInput.starter.toUpperCase()}L`,
      Xm:`${UserInput.starter.toUpperCase()}M`,
      Xr:`${UserInput.starter.toUpperCase()}R`,
      Err:`Error`
    }
    
    
    const error = (xold: number, xnew: number): number => Math.abs((xnew - xold) / xnew) * 100;

    const Calbisection = (xl: number, xr: number,Scope:string): void => {
        setStatus(true)
        let xm, fXm, fXr,fXl, ea=100;
        let iter = 0;
        const MAX = 50;
        let obj: BisectionObject = {} as BisectionObject;
        let X:X = {} as X

        fXl = evaluate(UserInput.Equation,{[Scope]:xl})
        fXr = evaluate(UserInput.Equation, {[Scope]:xr})

        let check:number = fXl*fXr;

        if(check > 0 || xl > xr){
          setInValid(true)
          setStatus(false)
          setFxlr([
            fXl,fXr
          ])
          setUserInput((prevState)=>{
            return{
              ...prevState,
              X:0
            }
          })
          return
        }

        do {
          xm = (xl + xr) / 2.0;
          fXr = evaluate(UserInput.Equation, { [Scope]: xr });
          fXm = evaluate(UserInput.Equation, { [Scope]: xm });
          iter++;
    
          if (fXm * fXr > 0) {
            ea = error(xr, xm);
            X = { x:xm }
            obj = {
              iteration: iter,
              Xl: xl,
              Xm: xm,
              Xr: xr,
              Err: ea,
              ErrNotDecimal: Math.round(ea),
            };
            dataX.push(X)
            data.push(obj);
            xr = xm;
          } else if (fXm * fXr < 0) {
            ea = error(xl, xm);
            X = { x:xm}
            obj = {
              iteration: iter,
              Xl: xl,
              Xm: xm,
              Xr: xr,
              Err: ea,
              ErrNotDecimal: Math.round(ea),
            }
            dataX.push(X)
            data.push(obj);
            xl = xm;
          }else{
            ea = 0;
            X = { x:xm}
            obj = {
              iteration: iter,
              Xl: xl,
              Xm: xm,
              Xr: xr,
              Err: ea,
              ErrNotDecimal: Math.round(ea),
            }
            dataX.push(X)
            data.push(obj);
            break
          }
        } while (ea > 0.000001 && iter < MAX);
    
        setUserInput({
          ...UserInput,
          X:xm
        })
    };

    const Regex = ((Eq:String)=>{
        let test:RegExp = /[a-zA-Z]/i;
        let Alphabet:RegExpMatchArray | null= Eq.match(test)
        if(Alphabet){
          return Alphabet[0];
        }
    })
    
    const calculateRoot = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        //console.log(UserInput);
        
        const xlnum: number = UserInput.XL;
        const xrnum: number = UserInput.XR;
        const Scope:any = Regex(UserInput.Equation);
        Calbisection(xlnum, xrnum,Scope);
        setPropsEquation(UserInput.Equation)
        setNewData(data)
        setUserInput((prevState)=>{
          return{
            ...prevState,
            starter:Scope
          }
        })
    }

    const SetEquation = (event:React.ChangeEvent<HTMLInputElement>)=>{
      //console.log(event.target.value);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          Equation:event.target.value
        }
      })
    }

    const SetXL = (event:number)=>{
      //console.log(event);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          XL:event
        }
      })
    }

    const SetXR = (event:number)=>{
      //console.log(event);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          XR:event
        }
      })
    }

    const SetExampleData = (data:any[])=>{
      if(data[0]){setUserInput((prevState)=>{
        console.log(data[0]);
        
        return{
          ...prevState,
          Equation:data[0].label,
          X:0,
          XL:Number(data[0].xl),
          XR:Number(data[0].xr)
        }
      })}
    }

    const SetERROR = (event:number)=>{
      setUserInput((prevState)=>{
        return{
          ...prevState,
          Error:event
        }
      })
    }

    const SetStarter = (event:React.ChangeEvent<HTMLInputElement>)=>{
      console.log(event.target.value);
      setUserInput((prevState)=>{
        return{
          ...prevState,
          starter:event.target.value
        }
      })
    }

  return (
    <>
      <Header text="Bisection Method"/>
      <Group position="center">
        <Grid justify='center'>
          <Grid.Col span="content">
          <form onSubmit={calculateRoot}>
          <TextInput
              data-testid="equ"
              label="Input F(x)"
              onChange={SetEquation}
              required
            />
            <NumberInput
                data-testid="xl"
                label="xl"
                onChange={SetXL}
                precision={2}
                required
            />
            <NumberInput
                data-testid="xr"
                label="xr"
                onChange={SetXR}
                precision={2}
                required
            />
            {/* <NumberInput
              data-testid="err"
              label="Error"
              onChange={SetERROR}
              value={UserInput.Error}
              precision={6}
              step={0.000001}
              min={0}
              required
            /> */}
            <Button 
              data-testid="btn"
              mt="md" 
              size='sm' 
              type='submit' 
              variant="gradient" 
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                Calculate
            </Button>

            <div data-testid="ans">
              <h2 >Answer = {UserInput.X}</h2>
            </div>
            
          </form>
          
              
            {/* <InputForm 
              starter={SetStarter}
              calculateRoot={calculateRoot} 
              setEquationFx={SetEquation} 
              valEquationFx={UserInput.Equation}
              valX={UserInput.X}
              valXl={UserInput.XL}
              valXr={UserInput.XR}
              valError={UserInput.Error}
              form={labelForm}
              setXL={SetXL}
              setXR={SetXR}
              setERROR={SetERROR}
              setExampleData={SetExampleData}
            /> */}
          </Grid.Col>
          {/* <Grid.Col span="content">
            <Chart data={newData}/>
          </Grid.Col> */}
        </Grid>
      </Group>
      {/* {Status && <EquationChart Equation={PropsEquation} RegX={UserInput.starter} Ans={UserInput.X}/>}
      {Status && <TableOutput 
        data={newData} 
        label={label}
      />} */}
      <Transition mounted={InValid} transition="slide-up" duration={1000} timingFunction='ease'>
        {(styles)=><Dialog opened={InValid} withBorder={false} style={{...styles,padding:0}}>
          <Alert color='red' ref={clickOutside} icon={<IconAlertTriangle strokeWidth={2.5}/>} variant='filled' title="Invalid Input!!">
            Please check your input XL or XR <br/>
            F(xl): {Fxlr[0]} , F(xr): {Fxlr[1]} <br/>
            F(xl) * F(xr) should be negative!
          </Alert>
        </Dialog>}
      </Transition>
    </>
  )
}

export default Bisection