import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'
import { AddNewEmployForm } from './_components/AddNewEmployForm'
import { EmploysTable } from './_components/EmploysTable'
import { NotificationList } from './_components/NotificationList'

const page = () => {
    return (
        <div className='  '>
            <section className=' w-[80%] py-6 m-auto flex flex-col gap-7'>
                {/* start to  add employ details*/}
                <div className=' flex items-center justify-between'>
                    <h4 className=' text-md'>Better code.</h4>
                    <div className=' flex items-center gap-4' >
                        <AddNewEmployForm/>
                        <NotificationList/>
                        <ModeToggle/>
                    </div>
                </div>
                {/* end to  add employ details*/}

                {/* start to table */}
                <EmploysTable/>
                {/* end to table */}
            </section>
        </div>
    )
}

export default page