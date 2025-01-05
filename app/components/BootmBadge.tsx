import stars from '../../public/stelle.svg'
import artie from '../../public/Logo artie.svg'
import Image from 'next/image'

export default function BottomBadge(){
    return(
        <div className='w-full flex flex-row items-center justify-center p-6 gap-6 mt-12 absolute bottom-0'>
            <Image src={stars} width={50} alt="Stelle starsnation"/>
            <Image src={artie} width={40} alt="Logo Artie 5ive"/>
            <Image src={stars} width={50} alt="Stelle starsnation"/>
        </div>
    )
}