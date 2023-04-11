import React , { Fragment, useState }from 'react';
import InputForm from '../../components/InputForm';
import TableOutput from '../../components/TableOutput';
import { evaluate } from 'mathjs'
import Header from '../../components/Header';
import Chart from '../../components/Chart';
import { useClickOutside } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons-react';
import EquationChart from '../../components/EquationChart';
import {
  Group,
  Grid,
  Transition,
  Alert,
  Dialog
} from '@mantine/core';

interface FalsePostionObject {
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

function Falsepos() {

    const data:FalsePostionObject[] =[];
    const clickOutside = useClickOutside(()=>{setInValid(false)})
    const [PropsEquation,setPropsEquation] = useState("(x^4)-13")
    const [InValid,setInValid] = useState<boolean>(false)
    const [UserInput,setUserInput] = useState({
      Equation:"(x^4)-13",
      X:0,
      XL:0,
      XR:0,
      Error:0.000001,
      starter:"x"
    })
    const [newData,setNewData] = useState<FalsePostionObject[]>([]);
    const [Status,setStatus] = useState<boolean>(false);
    const [Fxlr,setFxlr] = useState(Array(2).fill(0))
   

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
    
      const error =(xold:number, xnew:number)=> Math.abs((xnew-xold)/xnew)*100;
    
      const Calfalsepos = (xl:number, xr:number,Scope:string) => {
            setStatus(true)
            var fXnew,fXr,ea=100,xnew:number,xold=0,fXl;
            var iter = 0;
            var MAX = 50;
            var obj: FalsePostionObject = {} as FalsePostionObject;
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
            setStatus(true) 
            do
            {
              fXl = evaluate(UserInput.Equation,{[Scope]:xl})
              fXr = evaluate(UserInput.Equation, {[Scope]:xr})
              xnew = (xl*fXr - xr*fXl)/(fXr-fXl);
              fXnew = evaluate(UserInput.Equation, {[Scope]:xnew})
              iter++;
              if (fXnew*fXr > 0)
              {
                  ea = error(xold, xnew);
                  obj = {
                      iteration:iter,
                      Xl:xl,
                      Xm:xnew,
                      Xr:xr,
                      Err:ea,
                      ErrNotDecimal:Math.round(ea)
                  }
                  data.push(obj)
                  xr = xnew;
              }
              else if (fXnew*fXr < 0)
              {
                  ea = error(xold, xnew);
                  obj = {
                      iteration:iter,
                      Xl:xl,
                      Xm:xnew,
                      Xr:xr,
                      Err:ea,
                      ErrNotDecimal:Math.round(ea)
                  }
                  data.push(obj)
                  xl = xnew;
              }else{
                ea = 0;
                obj = {
                  iteration: iter,
                  Xl: xl,
                  Xm: xnew,
                  Xr: xr,
                  Err: ea,
                  ErrNotDecimal: Math.round(ea),
                }
                data.push(obj);
                break
              }
              xold = xnew;
            }while(ea>UserInput.Error && iter<MAX)
            setUserInput((prevState)=>{
              return{
                ...prevState,
                X:xnew
              }
            })
      }
    
     
        const Regex = ((Eq:String)=>{
            let test:RegExp = /[a-zA-Z]/i;
            let Alphabet:RegExpMatchArray | null= Eq.match(test)
            if(Alphabet){
            return Alphabet[0];
            }
        })

        const calculateRoot = (e:React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            const xlnum:number = UserInput.XL
            const xrnum:number = UserInput.XR
            const Scope:any= Regex(UserInput.Equation);
            Calfalsepos(xlnum,xrnum,Scope);
            setPropsEquation(UserInput.Equation)
            setUserInput((prevState)=>{
              return{
                ...prevState,
                starter:Scope
              }
            })
            setNewData(data);
        }

        const SetEquation = (event:React.ChangeEvent<HTMLInputElement>)=>{
            console.log(event.target.value);
            setUserInput((prevState)=>{
              return{
                ...prevState,
                Equation:event.target.value
              }
            })
          }
      
          const SetXL = (event:number)=>{
            console.log(event);
            setUserInput((prevState)=>{
              return{
                ...prevState,
                XL:event
              }
            })
          }
      
          const SetXR = (event:number)=>{
            console.log(event);
            setUserInput((prevState)=>{
              return{
                ...prevState,
                XR:event
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
            <Header text="False Position Method"/>
            <Group position="center">
              <Grid justify='center'>
                <Grid.Col span="content">
                  <InputForm 
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
                  />
                </Grid.Col>
                <Grid.Col span="content">
                  <Chart data={newData}/>
                </Grid.Col>
              </Grid>
            </Group>
            {Status && <EquationChart Equation={PropsEquation} RegX={UserInput.starter} Ans={UserInput.X}/>}
            {Status &&<TableOutput
                data={newData} 
                label={label}
            />}
            
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

export default Falsepos