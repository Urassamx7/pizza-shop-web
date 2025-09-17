/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @stylistic/max-len */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormData = z.object({
  email: z.email().min(6),
})
type SignInFormData = z.infer<typeof signInFormData>

export const SignIn = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SignInFormData>()

  async function handleSignIn({ email }:SignInFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log({ email })
  }

  return (
    <>
      <Helmet title="login" />
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">

          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
            <p className="text-sm text-muted-foreground ">Acompanhe suas vendas pelo painel do parceiro!</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
