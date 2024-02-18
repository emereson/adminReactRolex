import React, { useState } from 'react';
import './oneSectionStyle/OnseSectionPhotoAlbum.css';
import DeletePhoto from './crudPhotoAlbum/DeletePhoto';

const OnseSectionPhotoAlbum = ({ section, setCrud, crud }) => {
  const [selectImg, setSelectImg] = useState(0);
  const [selectImgIndex, setSelectImgIndex] = useState(0);
  const [viewImg, setViewImg] = useState(false);
  console.log(selectImg);
  return (
    <div className="oneSection__photosContainer">
      <p onClick={() => setCrud('deletePhotoAlbum')}>Delete Album</p>
      <div className="oneSection__photosGrid">
        {section?.photoAlbums?.map((photo, index) => (
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
              src={`${import.meta.env.VITE_URL_IMG}${photo.linkImg}`}
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
              {section?.photoAlbums?.map((photo, index) => (
                <>
                  <p
                    key={photo.index}
                    onClick={() => {
                      setSelectImg(photo);
                      setCrud(`deletePhoto${photo.id}`);
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
                    src={`${import.meta.env.VITE_URL_IMG}${
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
                selectImgIndex < section?.photoAlbums?.length - 1
                  ? setSelectImgIndex(selectImgIndex + 1)
                  : setSelectImgIndex(
                      section?.photoAlbums?.length - 1
                    )
              }
            ></i>
          </div>
        ) : (
          ''
        )}
      </div>
      <DeletePhoto
        crud={crud}
        setCrud={setCrud}
        selectImg={selectImg}
      />
    </div>
  );
};

export default OnseSectionPhotoAlbum;
