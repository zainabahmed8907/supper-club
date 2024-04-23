import { Avatar } from '@mui/material';
import Image from 'next/image';
import Star from "public/images/offerDetails/star.png";

function Review({ userName, review, date, rating, avatar }) {
    return (
        <div className='flex  w-full mb-10 lg:mt-0 mt-4'>
            <Avatar alt="Remy Sharp"  sx={{ width: 56, height: 56 }} src={avatar}/>
            <div className="ml-5  w-full">
                <div className="flex space-x-2 mb-1">
                  {Array.from({length:rating})?.map((ratingCount, index)=>(
                         <Image src={Star} alt="star" key={index} />
                    
                  ))}

                </div>
                <div className='font-bold text-base w-11/12'>
                    <p>
                        {userName}
                    </p>
                    <p className='lg:text-base font-normal text-sm '>
                        {review}
                    </p>
                </div>

            </div>
            <div className="text-sm flex justify-end">
                <p>{date}</p>
            </div>
        </div>
    )
}

export default Review