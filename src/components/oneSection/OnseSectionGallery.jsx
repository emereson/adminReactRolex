import React, { useState } from 'react';
import './oneSectionStyle/OnseSectionPhotoAlbum.css';
import DeletePhotoGallery from './crudGallery/DeletePhotoGallery';

const OnseSectionGallery = ({ section, setCrud, crud }) => {
  const [selectImg, setSelectImg] = useState(0);
  const [selectImgIndex, setSelectImgIndex] = useState(0);
  const [viewImg, setViewImg] = useState(false);
  console.log(section);

  return (
    <div className="oneSection__photosContainer">
      <p onClick={() => setCrud('DeleteGallery')}>Delete Gallery</p>
      <div className="oneSection__photosGrid">
        {section?.galleries?.map((photo, index) => (
          <div
            key={photo.id}
            style={{
              ...(index % 5 === 0
                ? { gridColumn: 'span 2', gridRow: 'auto ' }
                : {}),
              // ...(index === 0
              maxHeight: '600px',
            }}
          >
            <img
              src={`${import.meta.env.VITE_URL_Img}${photo.linkImg}`}
              alt=""
              onClick={() => {
                setViewImg(true);
                setSelectImgIndex(index);
              }}
            />
          </div>
        ))}

        {viewImg ? (
          <div className="oneSection__viewImgContainer">
            <i
              className="bx bx-x oneSection__closeViesImg"
              onClick={() => setViewImg(false)}
            ></i>
            <i
              className="bx bx-chevron-left"
              onClick={() =>
                selectImgIndex > 0
                  ? setSelectImgIndex(selectImgIndex - 1)
                  : setSelectImgIndex(0)
              }
            ></i>

            <div className="oneSection__viewImgDiv">
              {section?.galleries?.map((photo, index) => (
                <>
                  <p
                    key={photo.index}
                    onClick={() => {
                      setSelectImg(photo);
                      setCrud(`DeletePhotoGallery${photo.id}`);
                    }}
                    style={
                      index === selectImgIndex
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    Delete Image
                  </p>
                  <img
                    key={photo.id}
                    src={`${import.meta.env.VITE_URL_Img}${
                      photo.linkImg
                    }`}
                    alt=""
                    onClick={() => setViewImg(true)}
                    style={
                      index === selectImgIndex
                        ? { opacity: '1' }
                        : null
                    }
                  />
                </>
              ))}
            </div>
            <i
              className="bx bx-chevron-right"
              onClick={() =>
                selectImgIndex < section?.galleries?.length - 1
                  ? setSelectImgIndex(selectImgIndex + 1)
                  : setSelectImgIndex(section?.galleries?.length - 1)
              }
            ></i>
          </div>
        ) : (
          ''
        )}
      </div>
      <DeletePhotoGallery
        crud={crud}
        setCrud={setCrud}
        selectImg={selectImg}
      />
    </div>
  );
};

export default OnseSectionGallery;
