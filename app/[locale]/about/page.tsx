import Style from '@/layouts/WebsiteLayout/WebsiteLayout.module.css'
import WebsiteLayout from '@/layouts/WebsiteLayout'
import { useTranslations } from 'next-intl'
import CardsFeat from '@/components/CardsFeat'
import Button from '@/components/Button'

export const metadata = {
  title: 'About',
  description:
    'Nid-Search is a decentralized search assistant. Get control over AI and Web search. Explore a healthy internet.',
}

export default function PageAbout() {
  const t = useTranslations('t')

  return (
    <WebsiteLayout>
      <section className="colors">
        <div className={Style.container + ' ' + Style.miniContainer}>
          <figure className={Style.icon}></figure>
          <h1>{t('slogan')}</h1>
          <p>
            Nid-Search is a decentralized search assistant. Get control over AI and
            Web search. Explore a healthy internet.
          </p>
        </div>
      </section>

      <section>
        <div className={Style.container}>
          <div className={Style.cardDuos}>
            <div>
              

              <article>
                <h2>Take control of algorithms</h2>
                <p>
                  Nid-Search puts people in control of the algorithms. Find anything
                  switching between diverse sources. More productive and
                  accessible searches than ever.
                </p>
              </article>
            </div>

            <div>
            

              <article>
                <h2>More privacy, less carbon</h2>
                <p>
                  Estimated level of privacy and carbon footprint of every
                  search source. Make better choices - for you and the planet.
                </p>
              </article>
            </div>

            <div>
          

              <article>
                <h2>Decentralizing AI and Web search</h2>
                <p>
                  The monopoly is dangerous. Nid-Search encourages a truly open
                  search experience, where people choices matter. We are here
                  building a better internet.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="colors">
        <div className={Style.container}>
          <h3>Features</h3>

          <CardsFeat />
        </div>
      </section>

      <section>
        <div className={Style.container}>
          <div className={Style.actionContainer}>
            <h2>Elevating your search experience</h2>
            <p>Search decentralized. Built by people, for people.</p>
            <Button url="/" color="colors">
              {t('openApp')}
            </Button>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  )
}
