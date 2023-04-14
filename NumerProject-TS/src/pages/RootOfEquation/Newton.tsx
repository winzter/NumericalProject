import React , { useState } from 'react'
import InputForm from '../../components/InputForm';
import { evaluate , derivative } from 'mathjs'
import Header from '../../components/Header';
import TableOutput from '../../components/TableOutput';
import Chart from '../../components/Chart';
import { Grid, Group , Container , createStyles, Transition, Alert, Dialog } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconAlertTriangle ,IconChevronLeft } from '@tabler/icons-react';
import {Link} from 'react-router-dom';
import EquationChart from '../../components/EquationChart';


interface NewtonObject{
    iteration:number,
    Xm:number,
    Err:number,
    ErrNotDecimal:number
}

interface LabelForm {
    labelFX:string,
    labelXL:string,
}

interface LabelFormNewton{
    Xm:string,
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

function Newton() {
    const [InValid,setInValid] = useState<boolean>(false)
    const clickOutside = useClickOutside(()=>{setInValid(false)})
    const { classes } = useStyles()
    const data:NewtonObject[] = []
    const [UserInput,setUserInput] = useState({
        X:0,
        Equation:"(x^2)-7",
        Error:0.000001,
        starter:"x"
    })
    const [newData,setNewData] = useState<NewtonObject[]>([]);
    const [PropsEquation,setPropsEquation] = useState("(x^2)-7")
    const [Status,setStatus] = useState(false);
    const [Ans,setAns] = useState<number>(0);

    const labelForm: LabelForm = {
        labelFX:`Input f(${UserInput.starter})`,
        labelXL:`Input ${UserInput.starter.toUpperCase()}`   
    }

    const label: LabelFormNewton = {
        Xm:`${UserInput.starter.toUpperCase()}`,
        Err:`Error`
    }


    const error = (xold:number,xnew:number)=>{
        return Math.abs((xnew-xold)/xnew)*100
    }

    const calNewton = (x:number,Scope:string)=>{
        let fx,fxp,xnew=0,ea;
        let iter=0;
        const MAX = 50;
        setStatus(true)
        do{ 
            fx = evaluate(UserInput.Equation,{[Scope]:x});
            fxp = derivative(UserInput.Equation,`${[Scope]}`).evaluate({[Scope]:x});
            if(fxp === 0){
                console.log("Error can't divide by zero");
                setInValid(true)
                setStatus(false)
                break
            }
            xnew = x - (fx/fxp);
            ea = error(x,xnew);
            x = xnew;
            iter++;
            data.push({
                iteration:iter,
                Xm:xnew,
                Err:ea,
                ErrNotDecimal:Math.round(ea)
            })
            console.log("Iter : "+iter," ","X : "+xnew+" Err : "+ea);
            setAns(xnew);
        }while(ea>UserInput.Error && iter<MAX)
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
        const Scope:any = Regex(UserInput.Equation)
        calNewton(UserInput.X,Scope);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                starter:Scope
            }
        })
        setPropsEquation(UserInput.Equation)
        setNewData(data) 
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
  
      const SetX = (event:number)=>{
        console.log(event);
        setUserInput((prevState)=>{
            return{
                ...prevState,
                X:event
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
            X:Number(data[0].xl),
          }
        })}
      }
  return (
    <Container size="lg" py="xl">
        <Link to="/rootofequation" className={classes.linkBack}>
            <span><IconChevronLeft className={classes.icon}/>Back to Root page</span>
        </Link> 
        <Header text="Newton Raphson Method"/>
        <Group position='center'>
            <Grid justify='center'>
                <Grid.Col span="content">
                    <InputForm
                        valEquationFx={UserInput.Equation}
                        valX={Ans}
                        valError={UserInput.Error}
                        form={labelForm}
                        starter={SetStarter}
                        setXL={SetX}
                        valXl={UserInput.X}
                        setEquationFx={SetEquation}
                        setERROR={SetERROR}
                        calculateRoot={calculateRoot}
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

export default Newton