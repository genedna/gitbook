import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const objects = [
  {
    href: '/blob',
    name: 'Blob 对象',
    description: '一句话介绍 Blob 对象',
  },
  {
    href: '/tree',
    name: 'Tree 对象',
    description: '一句话介绍 Tree 对象',
  },
  {
    href: '/commit',
    name: 'Commit 对象',
    description:
      '一句话介绍 Commit 对象',
  },
  {
    href: '/tag',
    name: 'Tag 对象',
    description:
      '一句话介绍 Tag 对象',
  },
]

export function Objects() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="objects">
        Git 对象
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {objects.map((object) => (
          <div key={object.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {object.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {object.description}
            </p>
            <p className="mt-4">
              <Button href={object.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
