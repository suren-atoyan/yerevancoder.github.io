import React from 'react';

const maybe_link = link =>
  link !== null && link !== undefined && link !== '' ? (
    <a className={'FreelancerTable__FreelancerProfileLink'} href={link}>
      {link}
    </a>
  ) : (
    <span>not provided</span>
  );

const FreelancerCard = ({
  name,
  github_link,
  linkedin_link,
  resume_link,
  self_description,
  known_technologies,
}) => {
  return (
    <div className={'FreelancerTable__Freelancer'}>
      <div className={'FreelancerTable__FreelancerColumnDescription'}>
        <span className={'FreelancerTable__FreelancerName'}>{name}</span>
        <div className={'FreelancerTable__FlexRow'}>
          <div className={'FreelancerTable__FlexColumn'}>
            <div className={'PlainFlexRow'}>
              <label>Github:</label>
              {maybe_link(github_link)}
            </div>
            <div className={'PlainFlexRow'}>
              <label>Linkedin:</label>
              {maybe_link(linkedin_link)}
            </div>
          </div>
          <div className={'FreelancerTable__FlexColumn'}>
            <div className={'PlainFlexRow'}>
              <label>Resume/Personal Site:</label>
              {maybe_link(resume_link)}
            </div>
            <div className={'PlainFlexRow'}>
              <label>Known Technologies:</label>
              <span>{known_technologies}</span>
            </div>
          </div>
        </div>
        <textarea readOnly={true} value={self_description} />
      </div>
    </div>
  );
};

export default props => {
  const { freelancers } = props;
  return (
    <div className={'FreelancerTable'}>
      {freelancers.map(freelancer => (
        <FreelancerCard {...freelancer} key={`${freelancer.name}/${freelancer.github_link}`} />
      ))}
    </div>
  );
};
