import React from 'react'
import { Grid , NumberInput } from '@mantine/core'

interface Dimension{
    Dimension:number,
    MatrixData:number[][],
    AnsData:number[],
    setValueOfMatrix(value:number,i:number,j:number): void,
    setAnsOfMatrix(ans:number,i:number):void
}

function CreateMatrix({Dimension , setValueOfMatrix, setAnsOfMatrix ,MatrixData , AnsData}:Dimension) {
    let ansColumn = Dimension+1
    const input:React.ReactNode[] = []

    for(let i=0;i<Dimension;i++){
        for(let j=0;j<Dimension;j++){
            input.push(
                <Grid.Col key={`${i}-${j}`} span={(ansColumn*2)/ansColumn}>
                    <NumberInput 
                        value={MatrixData[i][j]}
                        label={`X${i}${j}`}  
                        onChange={(value:number)=>setValueOfMatrix(value,i,j)} 
                        required 
                        hideControls
                    />
                </Grid.Col>)
        }
        input.push(
            <Grid.Col key={i} span={(ansColumn*2)/ansColumn}>
                <NumberInput label={`Y${i}`} value={AnsData[i]} onChange={(ans:number)=>setAnsOfMatrix(ans,i)} required hideControls/>
            </Grid.Col>)
    }

    return(
        <Grid columns={ansColumn*2}>
            {input}
        </Grid>
    )
}

export default CreateMatrix