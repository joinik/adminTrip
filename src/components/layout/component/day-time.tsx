import { Typography } from 'antd'
import './day-time.css'
import am1 from '@/assets/icon-times/am1.svg'
import am2 from '@/assets/icon-times/am2.svg'
import pm1 from '@/assets/icon-times/pm1.svg'
import pm2 from '@/assets/icon-times/pm2.svg'
import { fillZero } from '@/utils'
import { useCallback, useEffect, useState } from 'react'

const days = [am1, am2, pm1, pm2]
export const DayTime = () => {
  const [step, setStep] = useState(0)
  const [time, setTime] = useState('')

  const dayStepRun = useCallback(() => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    // icon 图标
    if (hours >= 16) {
      setStep(2)
    } else if (hours >= 12) {
      setStep(1)
    } else if (hours >= 6) {
      setStep(0)
    } else {
      setStep(3)
    }

    // 时钟
    if (hours >= 12) {
      setTime(`${fillZero(hours % 12)}:${fillZero(minutes)} PM`)
    } else {
      setTime(`${fillZero(hours % 12)}:${fillZero(minutes)} AM`)
    }

    clearTimeout(Reflect.get(window, '___dayStep'))
    const timer = setTimeout(dayStepRun, 60000)
    Reflect.set(window, '___dayStep', timer)
  }, [setStep, setTime])

  useEffect(() => {
    dayStepRun()
  }, [dayStepRun])

  return (
    <div className="day-sider">
      <Typography.Text className="right">{time}</Typography.Text>
      <img src={days[step] ?? am2} className={'icon ' + 'step' + step} />
    </div>
  )
}
