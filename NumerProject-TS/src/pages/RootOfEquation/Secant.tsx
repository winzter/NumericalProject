import React , { useState } from 'react'
import { IconAlertTriangle ,IconChevronLeft } from '@tabler/icons-react';
import {Link} from 'react-router-dom';
import { useClickOutside } from '@mantine/hooks';
import { Grid, Group , Container , createStyles,Transition, Alert, Dialog } from '@mantine/core';
import Chart from '../../components/Chart';
import InputForm from '../../components/InputForm';
import Header from '../../components/Header';
import TableOutput from '../../components/TableOutput';
import { evaluate } from 'mathjs'
import EquationChart from '../../components/EquationChart';


interface SecantObject{
    iteration:number,
    Xl:number,
    Xm:number,
    Xr:number,
    Err:number,
    ErrNotDecimal:number
}

interface LabelForm {
    labelFX:string,
    labelXL:string,
    labelXR:string,
}

interface LabelFormSecant{
    Xl:string,
    Xm:string,
    Xr:string,
    Err:string
}

const useStyles = createStyles((theme)=>({
    linkBack:{
        textDecoration:"none",
        color:theme.fn.primaryColor(),
        fontWeight:1000
      },
    
      icon:{
        verticalAlign:"middle",
        height:'20px'
      },
  }))

function Secant() {
    const { classes } = useStyles()
    const [InValid,setInValid] = useState<boolean>(false)
    const clickOutside = useClickOutside(()=>{setInValid(false)})
    const data:SecantObject[] = []
    const [UserInput,setUserInput] = useState({
        Equation:"(x^2)-7",
        X0:0,
        X1:0,
        Error:0.000001,
        starter:"x"
    })
    //const [starter,setStarter] = useState<string>("x");
    const [PropsEquation,setPropsEquation] = useState("(x^2)-7")
    const [newData,setNewData] = useState<SecantObject[]>([]);
    const [Status,setStatus] = useState<boolean>(false);
    const [Ans,setAns] = useState(0);

    const labelForm: LabelForm = {
        labelFX:`Input f(${UserInput.starter})`,
        labelXL:`Input ${UserInput.starter.toUpperCase()}0`,
        labelXR:`Input ${UserInput.starter.toUpperCase()}1`
    }

    const label: LabelFormSecant = {
        Xl:`${UserInput.starter.toUpperCase()}0`,
        Xm:`${UserInput.starter.toUpperCase()}1`,
        Xr:`${UserInput.starter.toUpperCase()}2`,
        Err:"Error"
    }
    

    const error = (xold:number,xnew:number)=>{
        return Math.abs((xnew-xold)/xnew)*100
    }

    const calSecant = (x0:number,x1:number,Scope:string)=>{
       console.log(Scope);
        let fx,fxold,x2=0,ea;
        let iter=1;
        const MAX = 50;
        setStatus(true)

        do{
            fx = evaluate(UserInput.Equation,{[Scope]:x1});
            fxold = evaluate(UserInput.Equation,{[Scope]:x0});
            if(fx-fxold === 0){
                console.log("Can't divide by zero!");
                setInValid(true)
                setStatus(false)
                break
            }
            x2 = x1 - ((fx*(x1-x0)))/(fx-fxold);
            ea = error(x1,x2);
            data.push({
                iteration:iter,
                Xl:x0,
                Xm:x1,
                Xr:x2,
                Err:ea,
                ErrNotDecimal:Math.round(ea)
            })
            x0 = x1;
            x1 = x2;
            iter++;
            
            setAns(x2);
        }while(ea>UserInput.Error && iter<MAX)
    }

    const Regex = ((Eq:String)=>{
        let test:RegExp = /[a-zA-Z]/i;
        let Alphabet:RegExpMatchArray | null= Eq.match(test)
        if(Alphabet){
          return Alphabet[0];
        }
    })

    const calculateRoot = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const Scope:any= Regex(UserInput.Equation);
        setUserInput((prevState)=>{
            return{
              ...prevState,
              starter:Scope
            }
          })
        calSecant(UserInput.X0,UserInput.X1,Scope);
        setNewData(data)
        setPropsEquation(UserInput.Equation)
        console.log(data);
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
  
      const SetX0 = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X0:event
            }
        })
      }
  
      const SetX1 = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X1:event
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
  
      const SetStarter = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                starter:event.target.value
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
            X0:Number(data[0].xl),
            X1:Number(data[0].xr)
          }
        })}
      }
  return (
    <Container size="lg" py="xl">
        <Link to="/rootofequation" className={classes.linkBack}>
            <span><IconChevronLeft className={classes.icon}/>Back to Root page</span>
        </Link>
        <Header text="Secant Method"/>
        <Group position='center'>
            <Grid justify='center'>
                <Grid.Col span="content">
                    <InputForm
                        starter={SetStarter}
                        calculateRoot={calculateRoot} 
                        setEquationFx={SetEquation} 
                        valEquationFx={UserInput.Equation}
                        valX={Ans}
                        valXl={UserInput.X0}
                        valXr={UserInput.X1}
                        valError={UserInput.Error}
                        form={labelForm}
                        setXL={SetX0}
                        setXR={SetX1}
                        setERROR={SetERROR}
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
        <Transition mounted={InValid} transition="slide-up" duration={1000} timingFunction='ease'>
        {(styles)=><Dialog opened={InValid} withBorder={false} style={{...styles,padding:0}}>
          <Alert color='red' ref={clickOutside} icon={<IconAlertTriangle strokeWidth={2.5}/>} variant='filled' title="Invalid Input!!">
            Can't be divided by zero!
          </Alert>
        </Dialog>}
      </Transition>
    </Container>
    )
}

export default Secant