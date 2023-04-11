import React from 'react'
import { Group,Card } from '@mantine/core';
import { LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend } from 'recharts';

interface Data {
  iteration: number;
  Xl?: number;
  Xm: number;
  Xr?: number;
  Err: number;
  ErrNotDecimal?: number;
}

interface Props {
  data:Data[]
}
function Chart({data}:Props) {
    console.log(data);
  return (
    <Group position='center'>
      <Card shadow="md" p="sm" radius="md" withBorder>
        <div>
          <LineChart
            width={500}
            height={455}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="iteration"/>
            {data.length > 5 ? <YAxis scale="log" domain={['auto', 'auto']} />:<YAxis/>}
            <YAxis/>
            <Tooltip />
            <Legend />
            {/* <Line type="monotone" strokeWidth={2} dataKey="Err" stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}  /> */}
            <Line type="monotone" strokeWidth={2} dataKey="Err" stroke={`#8884d8`}  r={2.5}/>
            {/* <Line type="monotone" strokeWidth={2} dataKey="Xm" stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} /> */}
            <Line type="monotone" strokeWidth={2} dataKey="Xm" stroke={`#82ca9d`} r={2.5} />
          </LineChart>
        </div>
      </Card>
    </Group>
  )
}

export default Chart