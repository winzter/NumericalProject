import React , {useEffect,useState} from 'react'
import axios from 'axios'
import { TextInput , Button , NumberInput ,Group , Container} from '@mantine/core'

interface Data{
    value:String,
    xl:String,
    xr:String,
    label:String,
    group:String
}   

function AddEquation() {

    const [apiData,setApiData] = useState<Data[]>([])
    const [sendData,setSendData] = useState({
        value:"",
        xl:"",
        xr:"",
        label:"",

    })

    useEffect(()=>{
        axios.get("http://localhost:5000/api/rootofequation").then((res)=>{
            setApiData(res.data)
        })
        console.log(document.cookie);
        
    },[])

    const Submit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(sendData);
        axios.post("http://localhost:5000/api/postdata",sendData,
        {
            headers:{
                "authorization":document.cookie.split("=")[1]
            }
        })
            .then((res)=>{
                console.log(res.data);
            }).catch((err)=>{
                console.error(err);
            })
    }

    const SetEqu = (e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value);
        console.log(apiData.length);
        setSendData((prevState)=>{
            return{
                ...prevState,
                value:`Equation${apiData.length+1}`,
                label:e.target.value,
                group:"Example From API"
            }
        })
    }

    const SetXl = (e:number)=>{
        console.log(e);
        setSendData((prevState)=>{
            return{
                ...prevState,
                xl:String(e)
            }
        })
    }

    const SetXr = (e:number)=>{
        console.log(e);
        setSendData((prevState)=>{
            return{
                ...prevState,
                xr:String(e)
            }
        })
    }
  return (
    <Group position='center' mt="xl">
        <form onSubmit={Submit}>
            <TextInput label="Equation" required placeholder='(X+4)-4' onChange={SetEqu}/>
            <NumberInput label="XL" precision={2} placeholder='0' required onChange={SetXl}/>
            <NumberInput label="XR" precision={2} required placeholder='0' onChange={SetXr}/>
            <Group position='center' mb="xs">
                <Button 
                    mt="md" 
                    size='sm' 
                    type='submit' 
                    variant="gradient" 
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                        Add
                </Button>
            </Group>
        </form>
    </Group>
  )
}

export default AddEquation