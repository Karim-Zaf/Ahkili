import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'
import { RiRobot3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import ReactMarkdown from 'react-markdown';

export default function Message({type , message}:any) {
    
  return (
    <div className={cn('flex flex-col w-full mt-3',type ===1 ? 'items-start': 'items-end')}>
      <Card className={cn('w-[80%] p-0 border-0 shadow-none','flex gap-4 p-2', type===1 ? 'bg-white-400' :'bg-white-400')}>
        {type==1 && <div className=' bg-red-600 rounded-full w-16 h-16 text-white  flex-col items-center justify-center text-2xl hidden md:block md:flex'><RiRobot3Fill/></div>}
        <CardContent  className='w-full p-0'>
            <Card  className={cn('text-xl w-full bg-slate-300 rounded-none rounded-b-xl',type==1? 'rounded-tr-xl': 'rounded-tl-xl', type===1?"bg-slate-200 shadow-[0_0_10px_theme('colors.slate.700')]" : "bg-fuchsia-200 shadow-[0_0_10px_theme('colors.fuchsia.700')]")}>
                <CardContent className='p-6'>{
                    message
                }</CardContent>
            </Card>
        </CardContent>
        {type==0 && <div className='bg-green-600 rounded-full w-16 h-16 text-2xl text-white flex-col items-center justify-center hidden md:block md:flex'><FaUser/></div>}
      </Card>
    </div>
  )
}
