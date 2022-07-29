import { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  onClick?: () => {}
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div onClick={() => onClick?.()} className='flex items-center px-4 py-3 mt-2 space-x-2 transition-all duration-200 rounded-md cursor-pointer hover:bg-gray-200'>
      <Icon className='w-6 h-6' />
      <p className='hidden text-base md:inline-flex lg:text-xl'>{title}</p>
    </div>
  )
}

export default SidebarRow