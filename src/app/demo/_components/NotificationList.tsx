"use client";
import React, { useEffect, useState } from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Bell, BellDot } from 'lucide-react';
import { getSocket } from '@/lib/socket';

export const NotificationList = () => {
    const [notifications , setNotifications] = useState<string[]>([]);
    const [hasNewNotification ,setHasNewNotification] = useState<boolean>(false);

    useEffect(() => {
        const socket = getSocket();

        const handleNotification = (message: string) => {
            setNotifications((prev) => [message, ...prev]);
            setHasNewNotification(true);
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={"icon"} onClick={() => setHasNewNotification(false)}>
                {!hasNewNotification ?<Bell /> : <BellDot />}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>

                <div className=' flex items-center gap-4'>
                    {notifications.map((note , i) => (
                        <li key={i} className=" p-2 rounded">{note}</li>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
