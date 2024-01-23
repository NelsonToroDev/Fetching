import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${hello}?json=true`

export function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [tags, setTags] = useState()
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        setFact(data.fact)
        const threeFirstWords = data.fact.split(' ', 3).join(' ')
        setImageUrl(`https://cataas.com/cat/says/${threeFirstWords}`)
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
          .then((res) => res.json())
          .then((data) => {
            const { tags } = data
            const newTags = tags && tags.length >= 0 ? tags.join(' ') : undefined
            setTags(newTags)
          })
      })
  }, [])

  return (
    <main>
      <h1>Kitty App</h1>
      {fact && <p>{fact}</p>}
      {tags && <p>tags: {tags}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image retrived from the first three words of the fact: ${fact}`}
        />
      )}
    </main>
  )
}
