import React , { useState } from 'react'
import { evaluate } from 'mathjs'
import Header from '../../components/Header';
import InputForm from '../../components/InputForm';
import TableOutput from '../../components/TableOutput';
import Chart from '../../components/Chart';
import { Grid, Group } from '@mantine/core';
import EquationChart from '../../components/EquationChart';

interface OnepointObject{
    iteration:number,
    Xm:number,
    Err:number,
    ErrNotDecimal:number
}

interface LabelOnePoint{
    Xm: string;
    Err: string;
}

interface LabelFormOnePoint {
    labelFX:string,
    labelGX:string,
    labelXL:string,
}

function Onepoint() {
    const data:OnepointObject[] = [];
    const [UserInput,setUserInput] = useState({
        EquationFX:"2x-1",
        EquationGX:"1/4+x/2",
        X:0,
        X0:0,
        Error:0.000001,
        starter:"x"
      })
    const [starter,setStrter] = useState<string>("x");
    const [Ans,setAns] = useState<number>(0);
    const [newData,setNewData] = useState<OnepointObject[]>([]);
    const [PropsEquation,setPropsEquation] = useState("2x-1")
    const [Status,setStatus] = useState<boolean>(false);

    const labelForm: LabelFormOnePoint = {
        labelFX:`Input f(${starter})`,
        labelGX:`Input g(${starter})`,
        labelXL:`Input ${starter.toUpperCase()}L`,
      }
      const label: LabelOnePoint = {
          Xm:`${starter.toUpperCase()}`,
          Err:`Error`
      }

    const calOnePoint = (x:number,Scope:string)=>{
        let xnew=0,ea=100,iter=0;
        const MAX = 50;

        do{
            xnew = evaluate(UserInput.EquationGX,{[Scope]:x});
            ea = error(x,xnew);
            x = xnew;
            iter++;
            data.push({
                iteration:iter,
                Xm:xnew,
                Err:ea,
                ErrNotDecimal:Math.round(ea)
            })
        }while(ea > UserInput.Error && iter < MAX)
        setAns(xnew)
    }

    const error = (xold:number,xnew:number)=>{
        return Math.abs((xnew-xold)/xnew)*100
    } 

    const Regex = ((Eq:String)=>{
        let test:RegExp = /[a-zA-Z]/i;
        let Alphabet:RegExpMatchArray | null= Eq.match(test)
        if(Alphabet){
        return Alphabet[0];
        }
    })

    const calculateRoot = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const Scope:any = Regex(UserInput.EquationGX)
        calOnePoint(UserInput.X,Scope);
        setPropsEquation(UserInput.EquationFX)
        setNewData(data)
        setStrter(Scope)
        setStatus(true)   
    }

    const SetEquationFx = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                EquationFX:event.target.value
            }
        })
      }
    
    const SetX = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X:event
            }
        })
    }
    const SetEquationGx = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                EquationGX:event.target.value
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

    const SetERROR = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                Error:event
            }
        })
    }

    const SetExampleData = (data:any[])=>{
        console.log(data);
        
        if(data[0]){
        setUserInput((prevState)=>{
          console.log(data[0]);
          return{
            ...prevState,
            EquationGX:data[0].label,
            X:0,
            X0:Number(data[0].x0),
          }
        })}
      }

  return (
    <>
        <Header text="Onepoint Iteration Method"/>
        <Group position='center'>
            <Grid justify='center'>
                <Grid.Col span="content">
                    <InputForm
                        starter={SetStarter}
                        valX={Ans}
                        valError={UserInput.Error}
                        valEquationFx={UserInput.EquationFX}
                        valEquationGx={UserInput.EquationGX}
                        calculateRoot={calculateRoot}
                        setXL={SetX}
                        valXl={UserInput.X0}
                        setERROR={SetERROR}
                        setEquationFx={SetEquationFx}
                        setEquationGx={SetEquationGx}
                        form={labelForm}
                        setExampleData={SetExampleData}
                    />
                </Grid.Col>
                <Grid.Col span="content">
                    <Chart data={newData}/>
                </Grid.Col>
            </Grid>
        </Group>
        {Status && <EquationChart Equation={PropsEquation} RegX={UserInput.starter} Ans={Ans}/>}
       {Status && <TableOutput
            data={newData}
            label={label}
        />}
    </>
  )
}

export default Onepoint