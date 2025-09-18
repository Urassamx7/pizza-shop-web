import { DialogTitle } from '@radix-ui/react-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useQuery } from '@tanstack/react-query'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
})

type StoreProfileDTO = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const {
    data: managedRestaurant,
  } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })
  console.log(managedRestaurant)

  const { register, handleSubmit } = useForm<StoreProfileDTO>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visívies ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form>
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
          <Button variant="ghost" type="button">Cancelar</Button>
          <Button type="submit" variant="success">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
