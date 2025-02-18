import { randomUUID } from 'crypto'
import { OptionalProps } from '../../@types/global'
import { Comic } from './Comic'

export class Serie {
  public id!: string
  public title!: string
  public filePath!: string
  public createdAt!: Date
  public updatedAt!: Date
  public comics?: Comic[]

  constructor(data: OptionalProps<Serie, 'id'>) {
    this.id = randomUUID()

    Object.assign(this, data)

    Object.freeze(this)
  }

  static create({
    createdAt = new Date(),
    updatedAt = new Date(),
    ...data
  }: OptionalProps<Serie, 'id' | 'updatedAt' | 'createdAt'>): Serie {
    return new Serie({ createdAt, updatedAt, ...data })
  }
}
