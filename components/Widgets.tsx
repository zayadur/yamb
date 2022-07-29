import { SearchIcon } from "@heroicons/react/outline"

function Widgets() {
  return (
    <div className='hidden col-span-2 px-2 mt-2 lg:inline'>
      <div className='flex items-center p-3 space-x-2 bg-gray-100 rounded-md'>
        <SearchIcon className='w-5 h-5 text-gray-400' />
        <input type='text' placeholder='Search YAMb' className='flex-1 bg-transparent outline-none' />
      </div>
    </div>
  )
}

export default Widgets