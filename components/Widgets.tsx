import Link from "next/link"

function Widgets() {
  return (
    <div className='hidden col-span-2 px-2 mt-2 lg:inline'>
      <div className='flex items-center p-3 space-x-2 bg-gray-100 rounded-md'>
        <a href={'https://github.com/zayadur/yamb'} />
      </div>
    </div>
  )
}

export default Widgets