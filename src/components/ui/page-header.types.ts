/** Описание заголовка страницы, который рендерит общий layout. */
export interface PageHeaderMeta {
  /** Заголовок страницы. */
  title: string
  /** Пояснение под заголовком. */
  subtitle?: string
  /** Эмодзи рядом с заголовком. */
  emoji?: string
}
