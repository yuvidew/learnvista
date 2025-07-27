"use client";
import React, { useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetEmploys } from '../hook/useApi';
import { useCounterState } from '@/zustand/state';
import { Loader2Icon } from 'lucide-react';

export const EmploysTable = () => {
    const {count} = useCounterState()
    const {loading , onGetEmploys , employs} = useGetEmploys();

    useEffect(() => {
        onGetEmploys()
    } , [count]);

    return (
        <div className=' flex flex-col gap-4'>
            {/* start employ */}
            <Table className=' overflow-hidden '>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader className=' rounded-t-md'>
                    <TableRow className=' bg-accent rounded-t-md'>
                        <TableHead >First name</TableHead>
                        <TableHead>Last name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead >Working project</TableHead>
                        <TableHead >Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading? (
                        <Loader2Icon className=' animate-spin' />
                    ) : 
                    employs.length > 0 ? employs.map(({id, first_name , last_name , position , status , working_project}) => (
                        <TableRow key={id} >
                            <TableCell >{first_name}</TableCell>
                            <TableCell>{last_name}</TableCell>
                            <TableCell>{working_project}</TableCell>
                            <TableCell >{position}</TableCell>
                            <TableCell >{status}</TableCell>
                        </TableRow>
                    ))
                    : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-19 text-center text-muted-foreground">
                                No results.
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>
            {/* end employ */}

            {/* start pagination */}
            {/* TODO : create a pagination comp */}
            {/* end pagination */}
        </div>
    )
}
