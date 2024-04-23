// import { XMarkIcon } from '@heroicons/react/20/solid'
import styles from './styles.module.css';

export default function Banner({bannerText, bannerQuote, bannerBG=`bg-["#faebd7"]`}) {
  return (
    <div className={`absolute px-6 md:py-2.5 py-1.5 ${styles.errorBanner} ${bannerBG}`}>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p className="text-xs sm:text-sm leading-6 text-gray-900">
          {bannerQuote && <strong className="font-semibold"> {bannerQuote} </strong>}
          {bannerText}
        </p>
      </div>
    </div>
  )
}