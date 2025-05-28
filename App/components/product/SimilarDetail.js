import React from 'react'
import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import { ServerFileIdentifier } from "constants/configs";
import Link from "next/link";
import { isMobileOnly, isMobile, isDesktop } from 'react-device-detect';

const SimilarDetail = ({ data , id }) => {
  useEffect(() => {
  }, [id]);
  return (
    <div>
      <Card style={{height: `${!isMobile && '502.5px' }` }} className='bg-light product-related-content-card pb-4'>
        {
          data?.similarModel?.similarVideo ?
            <>
              <h3 className='mt-2 mb-2'> ویدیوهای مرتبط</h3>
              <Link href={`/video/${data.similarModel.similarVideo.id}`} >
                <a><Card.Img style={{height:"176px",objectFit:'contain',width:"311px"}} alt={data.similarModel.similarVideo.title} src={`${ServerFileIdentifier()}${data.similarModel.similarVideo.coverFile}`}></Card.Img>
                  <span class="romeo-embed-play"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <path d="M7 6.134v11.732c0 .895 1.03 1.438 1.822.951l9.628-5.866c.733-.441.733-1.46 0-1.914L8.822 5.183C8.029 4.696 7 5.239 7 6.134z" fill="#444"></path></svg></span>
                </a>
              </Link>
              <Link href={`/video/${data.similarModel.similarVideo.id}`} >
                <a>
                  <h4 className='text-center title-similar'>
                    {data.similarModel.similarVideo.title}
                  </h4>
                </a>
              </Link>

            </> : null

        }

        {

          data?.similarModel?.similarArtcle ?
            <>

              <h3 className='mt-2 mb-2'> مقاله‌های مرتبط</h3>
              <Link href={`/article/${data.similarModel.similarArtcle.id}`} >
                <a><Card.Img style={{height:"176px",objectFit:'contain',width:"311px"}} alt={data.similarModel.similarArtcle.title} src={`${ServerFileIdentifier()}${data.similarModel.similarArtcle.coverFile}`}></Card.Img></a>
              </Link>
              <Link href={`/article/${data.similarModel.similarArtcle.id}`} >
                <a>
                  <h4 className='text-center title-similar'>
                    {data.similarModel.similarArtcle.title}
                  </h4>
                </a>
              </Link>

            </>
            : null
        }



      </Card>
    </div>
  )
}

export default SimilarDetail
