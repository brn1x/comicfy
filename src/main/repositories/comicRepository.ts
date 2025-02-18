import { prisma } from '../database'
import { Comic } from '../entities/Comic'

interface UpdateProps {
  id: string
  comic: Comic
}

interface FindManyProps {
  serieId?: string
}

export async function createComic(comic: Comic): Promise<Comic> {
  return await prisma.comic.create({
    data: {
      id: comic.id,
      filePath: comic.filePath,
      title: comic.title,
      coverPath: comic.coverPath,
      serieId: comic.serieId
    }
  })
}

export async function createManyComics(comics: Comic[]): Promise<Comic[]> {
  return await prisma.comic.createManyAndReturn({
    data: comics.map((comic) => {
      return {
        id: comic.id,
        filePath: comic.filePath,
        title: comic.title,
        coverPath: comic.coverPath,
        serieId: comic.serieId
      }
    })
  })
}

export async function findManyComics({ _serieId }: FindManyProps): Promise<Comic[]> {
  return await prisma.comic.findMany({
    include: {
      serie: true
    }
  })
}

export async function updateComic({ id, comic }: UpdateProps): Promise<Comic> {
  return await prisma.comic.update({
    data: {
      filePath: comic.filePath,
      title: comic.title
    },
    where: {
      id
    }
  })
}

export async function deleteComic(id: string): Promise<Comic> {
  return await prisma.comic.delete({ where: { id } })
}
