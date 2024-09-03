import Style from '@/layouts/WebsiteLayout/WebsiteLayout.module.css'
import WebsiteLayout from '@/layouts/WebsiteLayout'
import CardsLink from '@/components/CardsLink'
import { useTranslations } from 'next-intl'

const title = 'Community'
const description = 'Help us make decentralized search accessible for everyone.'

export const metadata = {
  title: title,
  description: description,
}

export default function CommunityPage() {
  const t = useTranslations('t')

  return (
    <WebsiteLayout>
      <section className="colors">
        <div className={Style.container}>
          <h1>{t('community') ?? title}</h1>
          <p>{description}</p>
        </div>
      </section>

      <section>
        <div className={Style.container}>
          <CardsLink />

          <article>
            <h2>Welcome to Nid-Search</h2>
            <p>
              Nid-Search is an assistant for decentralized search on Web and AI.
            </p>

            <p>
               A completely new search experience — free and
              open source.
            </p>

            <p>
              A better way to
              interact with the Web and AI. We're putting the control of search
              algorithms into people's hands.
            </p>


            <p>
              Just as we choose what we eat, wear, date or elect, who said we
              can't choose our search sources?
            </p>

            <p>
              Nid-Search is inspired by Findto
            </p>

            <br></br>
            <br></br>

        
            <br></br>
            <br></br>
           
            {/* <h3>* Supporting</h3>
            <p>
              You can choose your favorite platform to support Findto and enjoy exclusive benefits:
            </p>

            <p>
              <a href="https://patreon.com/findto" target="_blank" rel="noreferrer">
                Support us via Patreon
              </a>
            </p>

            <p>
              <a href="https://ko-fi.com/findto" target="_blank" rel="noreferrer">
                Support us via Ko-Fi
              </a>
            </p>

            <p>
              <a href="https://github.com/sponsors/lucasm" target="_blank" rel="noreferrer">
                Support us via GitHub Sponsors
              </a>
            </p> */}
          </article>
        </div>
      </section>
    </WebsiteLayout>
  )
}
