import React, {FC} from 'react'
import { PulseLoader } from 'react-spinners'

interface Props{
    size: number | string
    color: string
}
const PulseAnimate:FC<Props> = ({size, color}) => {
  return (
    <PulseLoader color={color} size={size} />
  )
}

export default PulseAnimate