"use client"
import React, { FormEvent, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserStore } from '@/store/user-store'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useChangeEmail, useSendActivationEmail } from '@/hooks/useAuth'
import { CirculaLoader } from '@/assets/icon'

const ChangeEmailDialog = () => {

    const { user, setUser } = UserStore()
    const [newEmail, setNewEmail] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const changeEmailMutation = useChangeEmail()
    const sendOtpMutation = useSendActivationEmail()

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const response = await changeEmailMutation.mutateAsync({ id: user.id as string, newEmail })
            if (response.success) {
                await sendOtpMutation.mutateAsync({ email: newEmail })
                setNewEmail("")
                setUser({...user, email: newEmail})
                toast.success(response.message)
                setIsOpen(false)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log('Error', error)
            toast.error("Failed to change email")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" type="button" className='py-6 max-md:py-5'>Change Email</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change your email address</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <fieldset className='space-y-3' disabled={changeEmailMutation.isPending || sendOtpMutation.isPending}>
                        <div>
                            <Label htmlFor="current_email">Current email address</Label>
                            <Input
                                id="current_email"
                                type="current_email"
                                placeholder=""
                                name="phoneNumber"
                                value={user.email}
                                disabled
                            />
                        </div>
                        <div>
                            <Label htmlFor="new_email">New email address</Label>
                            <Input
                                id='new_email'
                                type="email"
                                placeholder="New email address"
                                name="phoneNumber"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <Button type='button' onClick={handleSubmit} variant={'default'} className='w-full mt-7'>
                                {
                                    changeEmailMutation.isPending || sendOtpMutation.isPending ? <CirculaLoader /> : "Save"
                                }
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeEmailDialog