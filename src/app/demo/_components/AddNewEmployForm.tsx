"use client";
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, Plus } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DialogClose } from '@radix-ui/react-dialog';
import { useAddNewEmploys } from '../hook/useApi';
import { useCounterState } from '@/zustand/state';

const employDetails = z.object({
    firstName: z.string().min(1, { message: "First name is requires" }),
    lastName: z.string().min(1, { message: "Last name is requires" }),
    position: z.string().min(1, { message: "Position name is requires" }),
    status: z.string().min(1, { message: "Status name is requires" }),
    workingProject : z.string().min(1 , {message : "Working project is requires"})
});

export const AddNewEmployForm = () => {
    const {onIncrease} = useCounterState();
    const [isOpen , setIsOpen] = useState(false)
    const {onAddNewEmploy , loading } = useAddNewEmploys()
    const form = useForm<z.infer<typeof employDetails>>({
        resolver: zodResolver(employDetails),
        defaultValues: {
            firstName: "",
            lastName: "",
            position: "",
            status: "", 
            workingProject : ""
        }
    })

    const onSubmit = async (values : z.infer<typeof employDetails>) =>{
        const isAdded = await onAddNewEmploy(values)

        if (isAdded) {
            setIsOpen(false)
            onIncrease();

            form.reset();
        }

    }
    return (
        <Dialog 
            open = {isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger>
                <Button className=' cursor-pointer'>
                    <Plus />
                    Add new Employ
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter new employs details</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>

                <div className=' flex flex-col gap-4'>
                    <Form {...form}>
                        <form 
                            className=' flex flex-col gap-5'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            {/* start first name */}
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='e.g. John'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*end first name */}

                            {/* start Last name */}
                            <FormField
                                name="lastName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem  className='flex flex-col gap-3'>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='e.g. due'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*end Last name */}

                            {/* start position */}
                            <FormField
                                name="position"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel>Position</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='e.g. Front end dev'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*end position */}

                            {/* start working project */}
                            <FormField
                                name="workingProject"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel>Working project</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='e.g. meet.ai'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*end working project */}

                            {/* start status */}
                            <FormField
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-3'>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className=' w-full'>
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                    <SelectItem value="fired">Fired</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*end status */}

                            <div className=' flex items-center justify-end gap-4'>
                                <DialogClose>
                                    <Button type='button' variant={"outline"}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type='submit'>
                                    {loading ? <Loader2Icon className=' animate-spin' /> : "Submit"}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
