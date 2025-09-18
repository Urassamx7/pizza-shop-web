/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpFormData = z.object({
  email: z.email().min(6),
  restaurantName: z.string().min(3),
  managerName: z.string().min(3),
  phone: z.string().min(10),
})
type SignUpFormData = z.infer<typeof signUpFormData>

export const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormData),
    defaultValues: {
      email: '',
      restaurantName: '',
      managerName: '',
      phone: '',
    },
  })

  async function handleSignUp(data: SignUpFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(data)

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">

        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in" className="">
            Fazer login
          </Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece as suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantaNme">Nome do estabelecimento</Label>
              <Input id="restaurantaNme" type="text" {...register('restaurantName')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" type="name" {...register('managerName')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadstro
            </Button>

            <p className="px-6 text-center text-xs leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos <a href="#" className="underline underline-offset-4">termos de serviço</a> e <a href="#" className="underline underline-offset-4">políticas de privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
