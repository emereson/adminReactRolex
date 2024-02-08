import React from 'react';
import CreateSectionDescription from './crudDecriptionSection/CreateSectionDescription';
import './oneSectionStyle/oneSectionFronPage.css';
import DeleteSectionDescription from './crudDecriptionSection/DeleteSectionDescription';
import ReactPlayer from 'react-player';

const OneSectionFrontPage = ({ section, crud, setCrud }) => {
  return (
    <section className="oneSectionFrontPage__titleVideoContainer">
      <article className="oneSectionFrontPage__videosContainer">
        <div className="oneSectionFrontPage__videoBlur">
          <ReactPlayer
            playing={true}
            volume={0}
            url={section.linkVideo}
            controls={false}
            loop={true}
            width="100%"
            height="100%"
            responsive={true}
          />
        </div>
        <div className="oneSectionFrontPage__video">
          <ReactPlayer
            playing={true}
            volume={0}
            url={section.linkVideo}
            controls={false}
            loop={true}
            width="100%"
            height="100%"
            responsive={true}
          />
        </div>
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
