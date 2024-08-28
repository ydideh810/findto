'use client'

import Style from './Header.module.css'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useSearch } from '@/contexts/SearchContext'
import Modal from '@/components/Modal'
import SvgLogo from '@/components/SvgLogo'
import {
  IconSettings,
  IconSparkle,
  IconCode,
  IconBook,
  IconFeedback,
  IconHeart,
  IconMoon,
  IconSun,
  IconApps,
  IconDownload,
  Icon,
  IconMore,
  IconThemeSystem,
} from '@/components/SvgIcons'
import { normalizeId } from '@/utils/formats'
import { ISearchCategory } from '@/interfaces/search'
import SelectLanguage from '@/components/SelectLanguage'
import { useTheme } from 'next-themes'

export default function AppHeader() {
  const t = useTranslations('t')
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const view = searchParams?.get('view')
  const {
    data,
    category,
    setCategory,
    refSearchTabs,
    refSearchInput,
    isMobileViewport,
  } = useSearch()

  const [showModal, setShowModal] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [menuItens, setMenuItens] = useState<ISearchCategory[] | null>(null)
  const [submenuItems, setSubmenuItems] = useState<any>(null)
  const submenuRef = useRef<HTMLDivElement>(null)
  const [maxItemsInHeader, setMaxItemsInHeader] = useState(data?.length)
  const [pageHeight, setPageHeight] = useState(0)

  const handleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen)
  }
  const handleModal = () => {
    setShowModal(!showModal)
    !isMobileViewport && refSearchInput.current.focus()
  }
  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      return
    }

    if (theme === 'dark') {
      setTheme('system')
      return
    }

    // Assumindo que se não for 'light' ou 'dark', é 'system'
    setTheme('light')
  }
  const handleCategory = (category: string) => {
    try {
      refSearchTabs?.current?.['tab_' + category]?.click()
      setCategory(category)
      window.localStorage.setItem('category', category)
      router.push(`?view=${category}`)
    } catch (error) {
      console.error('Error loading category ' + category, error)
      refSearchTabs?.current?.['tab_Web']?.click()
    }
  }
  const handleCategoryIcon = (category: string) => {
    switch (category) {
  
      case 'AI':
        return <IconSparkle />


      case 'Academic':
        return <IconBook />
 
      case 'Code':
        return <IconCode />
     // case 'Legal':
       // return <IconBank />
      case 'Apps':
        return <IconApps />
   
      case 'Torrent':
        return <IconDownload />
      default:
        return <Icon />
    }
  }
  const renderMenuItem = (name: string, nameTranslated: any) => {
    return (
      <button
        className={category === name ? 'activeLink' : undefined}
        onClick={() => handleCategory(name)}
        name={normalizeId(name)}>
        {handleCategoryIcon(name)}
        {nameTranslated ?? name}
      </button>
    )
  }

  // largura da página
  useEffect(() => {
    // largura inicial da página
    setPageHeight(window.innerWidth)

    const handleResize = () => {
      // atualiza a largura da página quando a janela é redimensionada
      setPageHeight(window.innerWidth)
    }

    // evento de redimensionamento da janela
    window.addEventListener('resize', handleResize)

    // remove o ouvinte de evento quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // header: limit of items
  useEffect(() => {
    if (!isMobileViewport && pageHeight > 0) {
      if (pageHeight < 1100) {
        setMaxItemsInHeader(11)
      } else if (pageHeight < 1200) {
        setMaxItemsInHeader(12)
      } else {
        setMaxItemsInHeader(13)
      }
    }

    // se houver mais itens no menu do que o limite move para o submenu
    if (!isMobileViewport && data?.length > maxItemsInHeader) {
      const remainingItems = data?.slice(maxItemsInHeader)
      setMenuItens(data?.slice(0, maxItemsInHeader))
      setSubmenuItems(remainingItems)
    } else {
      setMenuItens(data)
      setSubmenuItems([])
    }
  }, [data, isMobileViewport, pageHeight, maxItemsInHeader])

  // state: change category by URL param
  useEffect(() => {
    if (view) {
      if (!!data?.find((item: any) => item.name === view)) {
        handleCategory(view)
      }
    }
  }, [data, view])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (submenuRef.current) {
        if (!submenuRef.current.contains(event.target as Node)) {
          setIsSubmenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className={Style.header}>
      <Link
        href="/"
        className={Style.logo}
        onClick={() => refSearchInput.current.focus()}>
        <SvgLogo />
        Findto
      </Link>

      <div className={Style.iconSettings}>
        <button onClick={handleModal}>
          <IconSettings />
          {t('settings')}
        </button>
      </div>

      <nav className={Style.nav}>
        <ul>
          {menuItens?.map(
            (item: any, index: number) =>
              item.active == true && (
                <li key={index}>
                  {renderMenuItem(item.name, item.name_translated)}
                </li>
              ),
          )}
        </ul>

        <div className={Style.submenu} ref={submenuRef}>
          {submenuItems?.length > 0 && (
            <button onClick={handleSubmenu}>
              <IconMore /> {t('more')}
            </button>
          )}

          {isSubmenuOpen && (
            <ul>
              {submenuItems?.map(
                (
                  item: { active: boolean; name: string; name_translated: any },
                  index: number,
                ) =>
                  item.active == true && (
                    <li key={index}>
                      {renderMenuItem(item.name, item.name_translated)}
                    </li>
                  ),
              )}
            </ul>
          )}
        </div>
      </nav>

      {showModal && (
        <Modal title={t('settings')} isOpen={showModal} onClose={handleModal}>
          <div className={Style.containerSettings}>
            <h3>{t('theme')}</h3>

            <button onClick={handleTheme}>
              {theme === 'dark' ? (
                <IconMoon />
              ) : theme === 'light' ? (
                <IconSun />
              ) : (
                <IconThemeSystem />
              )}
              {theme === 'dark'
                ? 'Dark'
                : theme === 'light'
                ? 'Light'
                : 'System'}
            </button>
          </div>

          <div className={Style.containerSettings}>
            <h3>{t('language')}</h3>

            <SelectLanguage />
          </div>

          <div className={Style.containerSettings}>
            <h3>{t('contribute')}</h3>
            <a
              href={t('feedback.url')}
              target="_blank"
              rel="noopener noreferrer">
              <IconFeedback />
              {t('feedback.title')}
            </a>
            <a
              href="https://ko-fi.com/findto"
              target="_blank"
              rel="noopener noreferrer">
              <IconHeart />
              {t('donate')}
            </a>
          </div>
        </Modal>
      )}
    </header>
  )
}
