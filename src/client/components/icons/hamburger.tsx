import { IconProperties } from 'src/typing/components'

const HamburgerIcon = ({ ...props }: IconProperties) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
      style={props.style}
    >
      <g id='Menu / Hamburger_MD'>
        <path
          id='Vector'
          d='M5 17H19M5 12H19M5 7H19'
          stroke='#000000'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default HamburgerIcon
