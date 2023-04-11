import React , {useEffect,useState} from 'react'
import axios from 'axios';
import {
  Group,
  Button,
  NumberInput,
  TextInput,
  Select,
  Paper
} from '@mantine/core';

interface InputData{
    labelFX?:string,
    labelGX?:string,
    labelXL?:string,
    labelXR?:string,
    labelError?:string,
}

interface InputField {
    starter:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    form?:InputData,
    valXl?:number,
    valXr?:number
    valEquationFx?:string,
    valEquationGx?:string,
    valError?:number,
    valX:number,
    setXL?:(event:number)=>void,
    setExampleData:(data:any[])=>void,
    setXR?:(event:number)=>void,
    setERROR?:(event:number)=>void,
    calculateRoot:(e:React.FormEvent<HTMLFormElement>)=>void,
    setEquationFx:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    setEquationGx?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
}

function InputForm(props:InputField) {
    const [apiData,setApiData] = useState<{value:string,label:string}[]>([])

    // useEffect(()=>{
    //     let reqParams:string = !props.setEquationGx?"Bisection":"OnePoint"
    //     axios.get(`http://localhost:5000/api/rootofequation/${reqParams}`).then((res)=>{
    //         console.log(res.data);
    //         setApiData(res.data)
    //     })
    // },[])

  return (
    <>
        <Paper shadow="md" p="xl" radius="md" withBorder>
            <form onSubmit={props.calculateRoot} data-testid="form">
                {props.form && 
                    <div>
                        <input type="text" data-testid="aa" id='aa'/>
                        <TextInput
                            data-testid="equ"
                            label={props.form.labelFX}
                            onChange={(e)=>{
                                props.setEquationFx(e)
                                const item = { value: e.currentTarget.value, label: e.currentTarget.value ,xl:"0",xr:"0",group:"History"};
                                setApiData((current) => [...current, item]);
                                return item;
                            }}
                            value={props.valEquationFx}
                            placeholder='Input F(x)'
                            required
                        />

                        {props.form.labelGX && <TextInput
                            label={props.form.labelGX}
                            onChange={props.setEquationGx}
                            value={props.valEquationGx}
                            required
                        />}
                        <NumberInput
                            data-testid="xl"
                            label={props.form.labelXL}
                            onChange={props.setXL}
                            precision={2}
                            value={props.valXl}
                            required
                        />
                        {props.form.labelXR && <NumberInput
                            data-testid="xr"
                            label={props.form.labelXR}
                            onChange={props.setXR}
                            precision={2}
                            value={props.valXr}
                            required
                        />}
                        <NumberInput
                            data-testid="err"
                            label="Error"
                            onChange={props.setERROR}
                            value={props.valError}
                            precision={6}
                            step={0.000001}
                            min={0}
                            required
                        />
                        <Select
                            className='Select'
                            label="Examples"
                            data={apiData}
                            placeholder="Pick one that you like"
                            clearable
                            searchable
                            creatable
                            getCreateLabel={(query) => `${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query ,group:"History"};
                                setApiData((current) => [...current, item]);
                                return item;
                            }}
                            dropdownPosition="bottom"
                            maxDropdownHeight={5000}
                            shadow='md'
                            onChange={(e)=>{
                                let data:any[] = []
                                console.log(e);
                                                
                                apiData.map((x:any)=>{
                                    if(x.value === e){
                                        data.push(x)
                                    }
                                    return data
                                                    
                                })
                                console.log(data);
                                props.setExampleData(data)
                                                
                            }}
                        />
                        <Group position='center' mb="xs">
                            <Button 
                                data-testid="btn"
                                mt="md" 
                                size='sm' 
                                type='submit' 
                                variant="gradient" 
                                gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                                    Calculate
                            </Button>
                        </Group>
                    </div>
                }
                {/* <h2>Answer = {props.valX.toPrecision(7)}</h2> */}
                <h2 data-testid="ans">Answer = {props.valX}</h2>
            </form>
        </Paper>
   </>
  )
}

export default InputForm