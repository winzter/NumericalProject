import React from 'react'
import { NativeSelect } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react';

interface propsMatrix{
    setMarixState:(value:number)=>void
}

function InputMatrix({setMarixState}:propsMatrix) {
  return (
    <>
      <NativeSelect
          mb={20}
          data={['2','3','4','5','6','7','8']}
          rightSection={<IconChevronDown size="1rem" />}
          rightSectionWidth={40}
          label="Dimension Of Matrix 2-8"
          onChange={(event) => {
                  setMarixState(Number(event.currentTarget.value))
              }
          }
      />
    </>
  )
}

export default InputMatrix