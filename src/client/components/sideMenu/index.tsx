import { useState } from 'react'
import ArrowIcon from '../icons/arrow'
import SideMenuItems from './items'

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className={`mask fixed w-full h-full ${!isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div
        className={`side-menu bg-gray-600 absolute left-0 top-0 w-80 h-full shadow-[3px_0px_5px_-5px] shadow-gray-400
    transition-all duration-500 ease-in-out transform translate-x-0 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div
          className='toggle top-3 -right-6 absolute bg-gray-600 h-20 flex
       items-center rounded-r-md shadow-[3px_0px_5px_-5px] transition-all
        hover:scale-110
        shadow-gray-100'
          onClick={() => setIsOpen(!isOpen)}
        >
          <ArrowIcon
            className={`w-6 h-6 fill-gray-300 transition-all duration-500 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        <SideMenuItems />
      </div>
    </>
  )
}

export default SideMenu
