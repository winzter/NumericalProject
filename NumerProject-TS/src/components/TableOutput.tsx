import React from 'react'
import {
    Group,
    Table,
    Card
  } from '@mantine/core';


interface Data{
    iteration: number;
    Xl?: number;
    Xm: number;
    Xr?: number;
    Err: number;
    ErrNotDecimal?: number;
}

interface LabelData{
    Xl?: string;
    Xm: string;
    Xr?: string;
    Err: string;
}

interface TableData {
    data:Data[],
    label:LabelData,
}

function TableOutput({data,label}:TableData) {
    console.log(data);
  return (
    <Group position="center" mb="md" mt="md">
        <Card shadow="md" p="sm" radius="md" withBorder>
          <Table
            fontSize="md"
            horizontalSpacing="md"
            withBorder
            withColumnBorders
            highlightOnHover
          >
            <thead>
              <tr>
                <th>Iteration</th>
                {label.Xl && <th>{label.Xl}</th>}
                <th>{label.Xm}</th>
                {label.Xr && <th>{label.Xr}</th>}
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element:Data, index: number) => {
                return (
                  <tr key={index}>
                    <td>{element.iteration}</td>
                    {typeof element.Xl !== 'undefined' && <td>{element.Xl}</td>}
                    {typeof element.Xm !== 'undefined' && <td>{element.Xm}</td>}
                    {typeof element.Xr !== 'undefined' && <td>{element.Xr}</td>}
                    <td>{element.Err}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
    </Group>
  )
}

export default TableOutput