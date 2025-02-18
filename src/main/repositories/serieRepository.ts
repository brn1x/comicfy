import { prisma } from '../database/'
import { Serie } from '../entities/Serie'

interface UpdateProps {
  id: string
  serie: Serie
}

interface FindSerieProps {
  id?: string
  title?: string
}

export async function createSerie(serie: Serie): Promise<Serie> {
  return await prisma.serie.create({
    data: {
      id: serie.id,
      filePath: serie.filePath,
      title: serie.title
    }
  })
}

export async function findManySeries(): Promise<Serie[]> {
  return await prisma.serie.findMany()
}

export async function findSerie({ id, title }: FindSerieProps): Promise<Serie | null> {
  return await prisma.serie.findFirst({
    where: {
      id,
      title
    }
  })
}

export async function updateSerie({ id, serie }: UpdateProps): Promise<Serie> {
  return await prisma.serie.update({
    data: {
      filePath: serie.filePath,
      title: serie.title
    },
    where: {
      id
    }
  })
}

export async function deleteSerie(id: string): Promise<Serie> {
  return await prisma.serie.delete({ where: { id } })
}
