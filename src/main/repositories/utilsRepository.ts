import { prisma } from '../database'

export async function eraseDb(): Promise<void> {
  await prisma.comic.deleteMany()
  await prisma.serie.deleteMany()
}
