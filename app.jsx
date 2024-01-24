import './app.css'
import { useCatImageAndTags } from './services/useCatImageAndTags'
import { useCatFact } from './services/useCatFact'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl, tags } = useCatImageAndTags({ fact })

  const handleCick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Kitty App</h1>
      <button onClick={handleCick}>Get New Fact</button>
      <section>
        <article>
          {fact && <p>{fact}</p>}
          {tags && <p>tags: {tags}</p>}
        </article>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Image retrived from the first three words of the fact: ${fact}`}
          />
        )}
      </section>
    </main>
  )
}
