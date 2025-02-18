import { randomUUID } from 'crypto'
import { OptionalProps } from '../../@types/global'

export class Comic {
  public id!: string
  public title!: string
  public filePath!: string
  public coverPath!: string
  public serieId!: string
  public createdAt!: Date
  public updatedAt!: Date

  constructor(data: OptionalProps<Comic, 'id'>) {
    this.id = randomUUID()

    Object.assign(this, data)

    Object.freeze(this)
  }

  static create({
    createdAt = new Date(),
    updatedAt = new Date(),
    ...data
  }: OptionalProps<Comic, 'id' | 'updatedAt' | 'createdAt'>): Comic {
    return new Comic({ createdAt, updatedAt, ...data })
  }
}
