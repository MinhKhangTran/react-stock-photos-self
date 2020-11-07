import React from "react";
import styled from "styled-components";

export default function Photo({
  urls: { regular },
  likes,
  alt_description,
  user: {
    username,
    portfolio_url,
    profile_image: { medium },
  },
}) {
  return (
    <Wrapper>
      <div className="relative overflow-hidden bild">
        <div className=" w-full h-64">
          <img
            className="h-full w-full object-cover rounded-xl"
            src={regular}
            alt={alt_description}
          />
        </div>
        <article className="beschreibung flex justify-around py-4 transition transition-all duration-300 ease-in-out">
          <div className="text-white text-xl">
            <h1 className="font-bold">{username}</h1>
            <h2>likes: {likes}</h2>
          </div>
          <a href={portfolio_url}>
            <img className="rounded-full" src={medium} alt="user" />
          </a>
        </article>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .beschreibung {
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    right: 0;

    transform: translateY(100%);
  }
  .bild:hover .beschreibung {
    transform: translateY(0);
  }
`;
