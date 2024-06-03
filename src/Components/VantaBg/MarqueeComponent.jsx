import React from 'react';
import "./MarqueeComponent.css";

const MarqueeComponent = () => {
  const cards = ["circle", "rectangle", "triangle", "ellipse", "square", "pentagon", "hexagon", "star"].map((shape, index) => (
    <Card key={index} shape={shape} />
  ));

  return (
    <div className='marquee-wrapper'>
      <article className="wrapper">
        {/* <div className="marquee">
          <div className="marquee__group">{cards}</div>
          <div className="marquee__group">{cards}</div>
        </div> */}
        <div className="marquee marquee--reverse">
          <div className="marquee__group">{cards}</div>
          <div className="marquee__group">{cards}</div>
        </div>
      </article>
    </div>
  );
};

const Card = ({ shape }) => {
  const shapes = {
    circle: { image: "./nesstory-1.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"},
    rectangle: { image: "nesstory-2.svg", text1: "", value: "423,000+", text2: "Shareholders"},
    triangle: { image: "nesstory-3.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"},
    ellipse: { image: "nesstory-4.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"},
    square: { image: "nesstory-5.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"},
    pentagon: { image: "nesstory-1.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"},
    hexagon: { image: "nesstory-2.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"},
    star: { image: "nesstory-3.svg", text1: "Legacy of", value: "110+ Years", text2: "of safety, quality"}
  };

  return (
    <div className="story-card">
      <img src={shapes[shape].image}/>
      <p>{shapes[shape].text1}</p>
      <h6>{shapes[shape].value}</h6>
      <p>{shapes[shape].text2}</p>
    </div>
  );
};

export default MarqueeComponent;
