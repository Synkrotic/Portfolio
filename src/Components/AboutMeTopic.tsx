import React from "react"

interface AboutMeTopicProps {
  topic: string,
  children: React.ReactNode
}

const AboutMeTopic = ({ topic, children }: AboutMeTopicProps) => {
  return (
    <div className="about-me-text-container">
      <h3 className="about-me-text-header small-header" id={`${topic}-info`}>{topic}</h3>
      <p className="about-me-text regular-text">{children}</p>
    </div>
  )
}

export default AboutMeTopic