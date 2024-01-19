import React, { useEffect, useState } from 'react';
import './pagesStyle/section.css';
import axios from 'axios';
import CreateSection from '../components/sections/crudSection/CreateSection';
import CardSection from '../components/sections/CardSection';

const Sections = () => {
  const [crud, setCrud] = useState('');
  const [allSections, setallSections] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section`;

    axios
      .get(url)
      .then((res) => setallSections(res.data))
      .catch((err) => console.log(err));
  }, [crud]);

  return (
    <div className="sections__container">
      <article className="sections__articleOne">
        <h1>Your sections</h1>
        <p onClick={() => setCrud('createSection')}>Create Section</p>
        <CreateSection setCrud={setCrud} crud={crud} />
      </article>
      <article className="sections__articleTwo">
        {allSections?.sections.map((section) => (
          <CardSection
            key={section.id}
            section={section}
            setCrud={setCrud}
            crud={crud}
          />
        ))}
      </article>
    </div>
  );
};

export default Sections;
