import { useEffect, useState } from 'react'
import './app.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [tags, setTags] = useState()

  // Get random fact
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching fact')
        return res.json()
      })
      .then((data) => {
        setFact(data.fact)
      })
      .catch((err) => console.error(err))
  }, [])

  // Set Image and get tags
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    setImageUrl(`/cat/says/${threeFirstWords}`)
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
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

  return (
    <main>
      <h1>Kitty App</h1>
      <section>
        <article>
          {fact && <p>{fact}</p>}
          {tags && <p>tags: {tags}</p>}
        </article>
        {imageUrl && (
          <img
            src={CAT_PREFIX_IMAGE_URL + imageUrl}
            alt={`Image retrived from the first three words of the fact: ${fact}`}
          />
        )}
      </section>
    </main>
  )
}
