import { Button } from 'antd'
import React from 'react'
import { Card, Container } from 'reactstrap'
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function PageHeading({headingText, headingDescription, buttonText, path}) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(path)
      }

  return (
    <>
         <Container fluid className="p-3 mb-[1rem] md:mb-5 bg_white rounded-lg">
          
         <Card className="border border-white">
        <div className="flex justify-between">
          <div>
            <h4 className='inter_medium text-lg md:text-2xl'>{headingText}</h4>
            <p className="text-gray-500 text-xs md:text-sm mb-0">
            {headingDescription}
            </p>
          </div>
          <div>
            {buttonText && <Button
            className='text-xs md:text-sm'
            onClick={handleClick}
              type="dashed"
            >
              {buttonText}
            </Button>}
          </div>
        </div>
      </Card>
         </Container>
    </> 
  )
}
