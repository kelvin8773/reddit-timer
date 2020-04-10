import React from 'react';
import Styled from 'styled-components';

const Section = Styled.div`
  margin-bottom: 100px;
`;

const Info = Styled.div`
  margin:0 auto 105px;
  width: 738px;
  max-width: 100%;
  &:last-child {
    margin:0 auto;
  }
`;

const HeadLine = Styled.h3`
  font-size: 24px;
  color: #000;
  font-weight: 400;
  margin-bottom: 13px;
`;

const AboutHeadLine = Styled(HeadLine)`
  margin-bottom: 14px;
`;

const InfoLine = Styled.div`
  font-weight: 400;
  line-height: 1.69;
  letter-spacing: 0.03px;
`;

const InfoSection = () => (
  <Section>
    <Info id="how-it-works">
      <HeadLine>
        How it works
      </HeadLine>

      <InfoLine>
        • We find the 500 top posts from the past year for a subreddit.
      </InfoLine>
      <InfoLine>
        • The data is visualized in a heatmap grouped by weekday and hour of the day.
      </InfoLine>
      <InfoLine>
        • See immediately when to submit your reddit post.
      </InfoLine>
    </Info>

    <Info id="about">
      <AboutHeadLine>
        About
      </AboutHeadLine>
      <InfoLine>
        This app was created during a course on
        <a href=" https://ooloo.io" target="_blank"> ooloo.io </a>
        with the goal to implement a pixel-perfect real-world application with
        professional workflows and tools like Kanban, Asana, Zeplin, GitHub,
        pull requests and code reviews.&nbsp;
        <a href="https://ooloo.io/employers" target="_blank">
          Click here for more information.
        </a>
      </InfoLine>
    </Info>

  </Section>
);

export default InfoSection;
