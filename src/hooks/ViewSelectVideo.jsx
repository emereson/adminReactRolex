import { useState } from 'react';

const ViewSelectVideo = ({ idElementVideo }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedFileVideo, setSelectedFileVideo] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validar que el archivo no sea un SVG
      if (!file.type.includes('svg')) {
        setSelectedVideo(URL.createObjectURL(file));
        setSelectedFileVideo(file);
      } else {
        alert('No se permiten archivos SVG');
        event.target.value = '';
      }
    }
  };

  const handleOnClickVideo = () => {
    document.getElementById(idElementVideo).click();
  };

  const deleteSelectVideoClick = () => {
    setSelectedVideo(null);
    setSelectedFileVideo(null);
  };

  return {
    selectedVideo,
    selectedFileVideo,
    handleVideoChange,
    handleOnClickVideo,
    deleteSelectVideoClick,
  };
};

export default ViewSelectVideo;
