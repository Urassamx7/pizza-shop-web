/* eslint-disable @stylistic/max-len */
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getManagedRestaurant, type GetManagetRestaurantResponse } from '@/api/get-managed-restaurant'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
})

type StoreProfileDTO = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()
  const {
    data: managedRestaurant,
  } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileDTO>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { description, name }) {
      const cached = queryClient.getQueryData<GetManagetRestaurantResponse>(['managed-restaurant'])

      if (cached) {
        queryClient.setQueryData<GetManagetRestaurantResponse>(['managed-restaurant'], {
          ...cached,
          name,
          description,
        })
      }
    },
  })

  async function handleUpdateProfile({ description, name }: StoreProfileDTO) {
    try {
      await updateProfileFn({ name, description })

      // queryClient.invalidateQueries({ queryKey: ['managed-restaurant'] })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Falha ao atualizar perfil. Tente novamente.')
      console.log(error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visívies ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">Nome</Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="text-right" htmlFor="description"
            >Descrição
            </Label>
            <Textarea
              id="description" className="col-span-3"
              {...register('description')}
            />
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              type="button"
              disabled={isSubmitting}
            >Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
          >Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
