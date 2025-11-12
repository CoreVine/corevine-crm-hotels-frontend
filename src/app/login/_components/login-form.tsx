"use client"

import { useLogin } from "@/hooks/auth/use-login"
import { useForm } from "react-hook-form"

import { LoadingButton } from "@/components/common/loading-button"
import { CheckboxField } from "@/components/common/form/checkbox-field"
import { InputField } from "@/components/common/form/input-field"
import { LoginSchema } from "@/schema"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  const loginMutation = useLogin()

  const handleSubmit = () => {
    loginMutation.mutate(form.getValues())
  }

  return (
    <Form {...form}>
      <form className='p-6 md:p-8' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>Welcome back</h1>
            <p className='text-balance text-muted-foreground'>Login to Dashboard</p>
          </div>
          <InputField
            control={form.control}
            name='email'
            label='Email'
            placeholder='Email'
            type='email'
          />
          <InputField
            control={form.control}
            name='password'
            label='Password'
            placeholder='Password'
            type='password'
          />
          <CheckboxField name='rememberMe' control={form.control} label='Remember me?' />
          <LoadingButton loading={loginMutation.isPending} type='submit' className='w-full'>
            Login
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
