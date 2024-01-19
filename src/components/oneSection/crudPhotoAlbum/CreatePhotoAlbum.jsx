import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreatePhotoAlbum = ({ crud, setCrud, section }) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );
    setSelectedFiles(imageFiles);
  };

  const submit = async () => {
    const url = `${import.meta.env.VITE_URL_API}/photo-album/${
      section?.id
    }`;
    const formData = new FormData();

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file, index) => {
        formData.append(`linkImg`, file);
      });

      try {
        // Realizar la solicitud POST usando axios
        const response = await axios.post(url, formData, config);

        // Manejar la respuesta según sea necesario
        toast.success('The photo album was created successfully');
        console.log(response.data);

        // Reiniciar el formulario después de una carga exitosa
        reset();
      } catch (error) {
        // Manejar errores en la solicitud POST
        toast.error('There was an error creating the photo album');
        console.error(error);
      }
    } else {
      toast.error('Please select at least one image to upload.');
    }
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createPhotoAlbum' ? '' : 'closeCrud__container'
      }`}
    >
      <i
        onClick={() => {
          setCrud('');
        }}
        className="bx bxs-x-circle"
      ></i>
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Create Photo Album</h3>
        <div className="crud__div">
          <label htmlFor="linkImg">Select images :</label>
          <div className="custom-file-input">
            <input
              id="linkImg"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <p>{`${selectedFiles.length} image(s) selected`}</p>
        </div>
        <button type="submit" className="crud__button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePhotoAlbum;
