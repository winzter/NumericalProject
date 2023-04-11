import React , { useState } from 'react'
import { Group , Button , Container , Transition , Alert, Dialog , Grid , Paper , Title, NumberInput} from '@mantine/core'
import { useClickOutside } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons-react';
import { det , multiply } from 'mathjs'
import InputMatrix from '../../components/InputMatrix';
import CreateMatrix from '../../components/CreateMatrix';
import Header from '../../components/Header'

function Cramer() {
    const [NumberMatrix,setNumberMatrix] = useState<number>(2)
    const [checkAns,setCheckAns] = useState( // Ans for checking
        Array(Number(NumberMatrix)).fill(0) 
    )
    const [InValid,setInValid] = useState<boolean>(false)
    const [status,setStatus] = useState<boolean>(false)
    const clickOutside = useClickOutside(()=>{setInValid(false)})
    const [Matrix,setMatrix] = useState<number[][]>(
        Array(Number(NumberMatrix))
        .fill(0)
        .map(() => Array(Number(NumberMatrix)).fill(0))
    )
    const [ValueMatrix,setValueMatrix] = useState<number[]>(
        Array(Number(NumberMatrix)).fill(0)
    )   

    const [AnsMatrix,setAnsMatrix] = useState<number[]>(
        Array(Number(NumberMatrix)).fill(0)
    )  

    const setValueOfMatrix = (value:number,i:number,j:number)=>{
        if(value !== undefined){
            const matrix:number[][] = [...Matrix]
            matrix[i][j] = value
            console.log(matrix);
            setMatrix(matrix)          
        }
        //console.log(Matrix);
    }
    
    const setAnsOfMatrix = (ans:number,i:number)=>{
        if(ans !== undefined){
            const matrix:number[] = [...ValueMatrix]
            matrix[i] = ans
            // console.log(matrix);
            setValueMatrix(matrix)
        }
    }

    const showMethod = ()=>{
        let dim:number = Number(NumberMatrix)
        console.log(dim);
        
        let ansColumn = dim+2
        let MatrixA:number[][] = [...Matrix]
        let MatrixAns:number[] = [...AnsMatrix]
        let MatrixB:number[] = [...ValueMatrix]
        console.log(MatrixAns);
        let inputAns:React.ReactNode[] = []
        for(let i=0;i<dim;i++){
            for(let j=0;j<dim;j++){
                inputAns.push(
                    <Grid.Col key={`${i}-${j}`} span={(ansColumn*2)/ansColumn}>
                        <NumberInput value={MatrixA[i][j]} disabled/>
                    </Grid.Col>
                )
            }
            inputAns.push(
                <Grid.Col key={`Ans${i}`} span={(ansColumn*2)/ansColumn}>
                    <NumberInput value={MatrixAns[i]} disabled precision={10}/>
                </Grid.Col>
            )
            inputAns.push(
                <Grid.Col key={`B${i}`} span={(ansColumn*2)/ansColumn}>
                    <NumberInput value={MatrixB[i]} disabled/>
                </Grid.Col>
            )
        }
        return(
            <Group position='center'>
                <Grid columns={ansColumn*2}>
                    {inputAns}
                </Grid>
            </Group>
        )
    }

    const showAnswer = ()=>{
        let ans:React.ReactNode[] = []
        for(let i=0;i<NumberMatrix;i++){
            ans.push(
                <Grid.Col span='content' key={i}>
                    <h3 key={i}>Y{i} = {AnsMatrix[i]}</h3>
                </Grid.Col>
            )
        }
        return(
            <Group position='center'>
                <Title order={3}>Answer</Title>
                <Grid columns={NumberMatrix*2}>
                    {ans}
                </Grid>
            </Group>
        )
    }

    const setMatrixState = (value:number)=>{
        console.log(value);
        setMatrix(
            Array(value)
            .fill(0)
            .map(() => 
                Array(value).fill(0)
            )
        )
        setValueMatrix(Array(value).fill(0))
        setNumberMatrix(value)
    }

    const CalCramer = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(Matrix);
        console.log(ValueMatrix);
        
        let k=0 , 
        mC:number[][],
        ans:number[]=[],
        x:number[] = Array(NumberMatrix).fill(0),
        mB:number[] = [...ValueMatrix],
        mA:number[][] = [...Matrix],
        DetA:number = det(mA)
        if(DetA === 0){
            console.log("Can't divide by zero!");
            setInValid(true)
            setStatus(false)
        }
        else{
            setStatus(true)
            for(let j=0;j<NumberMatrix;j++){
                mC = mA.map(row => [...row])
                for(let i=0;i<NumberMatrix;i++){
                    mC[i][k] = mB[i];
                }
                x[k] = det(mC)/DetA;
                ans.push(x[k])
                console.log(`Y${k} = ${x[k]}`);
                k++;
            }
            // console.log(ans);
            setAnsMatrix(ans)
            console.log(mA);
            console.log(x);  
            console.log(multiply(mA,x));
            setCheckAns(multiply(mA,x))
        } 
    }

  return (
    <>
        <Header text="Cramer"/>
        <Group position="center">
            <Grid justify='center'>
                <Grid.Col span="content">
                    <Paper withBorder radius='md' p='xs' shadow='md'> 
                        <Container size={550} px="md">
                            <form onSubmit={CalCramer}>
                                <InputMatrix
                                    setMarixState={setMatrixState}
                                />
                                <CreateMatrix 
                                    Dimension={NumberMatrix} 
                                    setValueOfMatrix={setValueOfMatrix}
                                    setAnsOfMatrix={setAnsOfMatrix}
                                    MatrixData={Matrix}
                                    AnsData={ValueMatrix}
                                />
                                <Group position='center' mb="md">
                                    <Button 
                                        mt="md" 
                                        size='sm' 
                                        type='submit' 
                                        variant="gradient"
                                        gradient={{ from: 'pink', to: 'orange', deg:60 }}>
                                            Calculate
                                    </Button>
                                </Group>
                            </form>
                        </Container>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Group>
        { status && <>{showAnswer()}</> }
        { status && <>{showMethod()}</> }
        <Transition mounted={InValid} transition="slide-up" duration={1000} timingFunction='ease'>
            {(styles)=><Dialog opened={InValid} withBorder={false} style={{...styles,padding:0}}>
            <Alert color='red' ref={clickOutside} icon={<IconAlertTriangle strokeWidth={2.5}/>} variant='filled' title="Divided by zero!!">
                Can't divide by zero!
            </Alert>
            </Dialog>}
        </Transition>
    </>
  )
}

export default Cramer