import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { media } from "../public/media";
import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import { device } from "../styles/media";

const Wrapper = styled.div`
  .embla {
    position: relative;
    margin-left: 12.5rem;
    margin-right: 12.5rem;

    @media only screen and (${device.lg}) {
      margin-left: 5rem;
      margin-right: 5rem;
    }

    @media only screen and (${device.md}) {
      margin-left: 3rem;
      margin-right: 3rem;
    }

    @media only screen and (${device.sm}) {
      margin-left: 0;
      margin-right: 0;
    }

    .label {
      height: unset;
      position: absolute;
      z-index: 10;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(2, 0, 14, 0.5);

      & p {
        color: #fff;
        margin: 0;
        z-index: 15;
        font-weight: 500;
        font-size: 2.5rem;
        letter-spacing: 2px;
      }
    }
  }

  .embla__viewport {
    overflow: hidden;
    width: 100%;
  }

  .embla__viewport.is-draggable {
    cursor: move;
    cursor: grab;
  }

  .embla__viewport.is-dragging {
    cursor: grabbing;
  }

  .embla__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
    margin-left: -10px;
  }

  .embla__slide {
    position: relative;
    min-width: 100%;
    padding-left: 10px;
  }

  .embla__slide__inner {
    position: relative;
    overflow: hidden;
  }

  .embla__slide__img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover; // Optional
    object-position: center center;
  }

  .embla__button {
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    fill: #1bcacd;
    padding: 0;
  }

  .embla__button:disabled {
    cursor: default;
    opacity: 0.3;
  }

  .embla__button__svg {
    width: 100%;
    height: 100%;
  }

  .embla__button--prev {
    left: 27px;
  }

  .embla__button--next {
    right: 27px;
  }

  .embla__dots {
    display: flex;
    list-style: none;
    justify-content: center;
    padding-top: 10px;
  }

  .embla__dot {
    background-color: transparent;
    cursor: pointer;
    position: relative;
    padding: 0;
    outline: 0;
    border: 0;
    width: 30px;
    height: 30px;
    margin-right: 7.5px;
    margin-left: 7.5px;
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
  }

  .embla__dot:after {
    background-color: #efefef;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    content: "";
  }

  .embla__dot.is-selected:after {
    background-color: #1bcacd;
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 50rem;
  position: relative !important;
  object-fit: cover; // Optional
  object-position: center center;

  @media only screen and (${device.lg}) {
    height: 40rem;
  }
  @media only screen and (${device.sm}) {
    height: 30rem;
  }
`;

// Image optimization
export type ImageLoaderProps = {
  src: string;
  width?: number;
  quality?: number;
};

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `blog-iz7vbxt1o-hyl3rid.vercel.app/${src}?w=${900}&q=${quality || 75}`;
};

const EmblaCarousel = ({ slides }: any) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <Wrapper>
      <h2>Featured Dishes</h2>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map((index: number) => {
              return (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    <ImageWrapper>
                      <Link href={media[index].url}>
                        <div>
                          <div className="label">
                            <p>{media[index].title}</p>
                          </div>
                          <ImageContainer>
                            <Image
                              loader={myLoader}
                              className="embla__slide__img"
                              src={media[index].img}
                              alt={media[index].title}
                              layout="fill"
                              priority={true}
                            />
                          </ImageContainer>
                        </div>
                      </Link>
                    </ImageWrapper>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default EmblaCarousel;
