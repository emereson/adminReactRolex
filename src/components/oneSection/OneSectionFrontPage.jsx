import React from 'react';
import CreateSectionDescription from './crudDecriptionSection/CreateSectionDescription';
import './oneSectionStyle/oneSectionFronPage.css';
import DeleteSectionDescription from './crudDecriptionSection/DeleteSectionDescription';

const OneSectionFrontPage = ({ section, crud, setCrud }) => {
  return (
    <section className="oneSectionFrontPage__titleVideoContainer">
      <article className="oneSectionFrontPage__videosContainer">
        <video
          autoPlay
          muted
          loop
          className="oneSectionFrontPage__videoBlur"
        >
          <source src={section?.linkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          muted
          loop
          className="oneSectionFrontPage__video"
        >
          <source src={section?.linkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </article>
      <article className="oneSectionFrontPage__titleContainer">
        <h1>{section?.title}</h1>
        {section?.sectionDescriptions.map((description) => (
          <div key={description.id}>
            <p>{description.description}</p>
            <span
              onClick={() =>
                setCrud(`deleteSectionDescription${description.id}`)
              }
            >
              Delete
            </span>
            <DeleteSectionDescription
              description={description}
              setCrud={setCrud}
              crud={crud}
            />
          </div>
        ))}
        <button onClick={() => setCrud('createSectionDescription')}>
          Create Text
        </button>
      </article>
      <CreateSectionDescription
        section={section}
        setCrud={setCrud}
        crud={crud}
      />
    </section>
  );
};

export default OneSectionFrontPage;
