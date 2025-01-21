import { Button, Dialog } from '@/shared/components/ui'
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { signIn } from 'next-auth/react';
import React, { FC } from 'react'

interface Props {
    className?: string,
    open: boolean,
    onCLose: () => void,

}

export const AuthModal:FC<Props> = ({className, open, onCLose}) => {

    const handleClose = () => {
        onCLose();
    }

    return (
    <Dialog open = {open} onOpenChange={handleClose}>
        <DialogContent className={cn(className, 'w-[450px] bg-white p-10')}>
            FORM 
            <hr />

            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    onClick={() => {
                        signIn('github', {
                            callbackUrl: "/",
                            redirect: true
                        })
                    }}
                    type='button'
                    className='gap-2 h-12 p-2 flex-1'>
                    <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
                    GitHub
                </Button>
                
                <Button
                    variant="secondary"
                    onClick={() =>
                    signIn('google', {
                        callbackUrl: '/',
                        redirect: true,
                    })
                    }
                    type="button"
                    className="gap-2 h-12 p-2 flex-1">
                    <img
                    className="w-6 h-6"
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                    />
                    Google
                </Button>

            </div>

        </DialogContent>
    </Dialog>
    )
}