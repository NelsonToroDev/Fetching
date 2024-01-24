import { useState, useEffect } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImageAndTags ({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  const [tags, setTags] = useState()

  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    setImageUrl(`${CAT_PREFIX_IMAGE_URL}/cat/says/${threeFirstWords}`)

    fetch(`${CAT_PREFIX_IMAGE_URL}/cat/says/${threeFirstWords}?json=true`)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching tags')
        return res.json()
      })
      .then((data) => {
        const { tags } = data
        const newTags = tags && tags.length >= 0 ? tags.join(', ') : undefined
        setTags(newTags)
      })
      .catch((err) => console.error(err))
  }, [fact])

  return { imageUrl, tags }
}
