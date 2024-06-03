import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap-trial/SplitText';
import { Observer } from 'gsap/Observer';

import './Home.css';
import MainVideo from '/Main3.mp4';
import Video from '../Components/Video';
import MarqueeComponent from '../Components/VantaBg/MarqueeComponent';
// import 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js'
// import  VantaBg  from '../Components/VantaBg/VantaBg';

function Home() {
    const words = ['Purpose', 'People', 'Partnerships', 'Performance', 'Planet'];
    const [visibleWordIndex, setVisibleWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVisibleWordIndex((prevIndex) => (prevIndex === words.length - 1 ? 0 : prevIndex + 1));
        }, 5200);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(Observer);
        gsap.registerPlugin(SplitText);

        let sections = document.querySelectorAll("section"),
            images = document.querySelectorAll(".bg"),
            headings = gsap.utils.toArray(".section-heading"),
            outerWrappers = gsap.utils.toArray(".outer"),
            innerWrappers = gsap.utils.toArray(".inner"),
            splitHeadings = headings.map(
                (heading) =>
                    new SplitText(heading, {
                        type: "chars,words,lines",
                        linesClass: "clip-text"
                    })
            ),
            currentIndex = -1,
            animating;

        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });

        function gotoSection(index, direction) {
            if (index < 0 || index >= sections.length) return; // Prevent scrolling beyond available sections
            animating = true;
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => (animating = false)
                });
            if (currentIndex >= 0) {
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
                    sections[currentIndex],
                    { autoAlpha: 0 }
                );
            }
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            tl.fromTo(
                [outerWrappers[index], innerWrappers[index]],
                {
                    yPercent: (i) =>  (i ? -100 * dFactor : 100 * dFactor)
                },
                {
                    yPercent: 0
                },
                0
            )
                .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
                .fromTo(
                    splitHeadings[index].chars,
                    {
                        autoAlpha: 0,
                        yPercent: 150 * dFactor
                    },
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1,
                        ease: "power2",
                        stagger: {
                            each: 0.02,
                            from: "random"
                        }
                    },
                    0.2
                );

            currentIndex = index;
        }

        Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
            onUp: () => !animating && gotoSection(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true
        });

        gotoSection(0, 1);
    }, []);

    return (
        <div className='app-parent nestle-regular'>
            <section className="first">
                <div className="outer">
                    <div className="inner">
                        <div className="bg one">
                            <Video src={MainVideo} />
                            <div className='banner-content  flex'>
                                <img className='nestlegirl' src="/nestlegirl.webp" alt="" />
                                <div className='banner-text-wrapper'>
                                    <h2 className="section-heading nestle-regular">Our path to <br />Progress</h2>
                                    <span className="words-wrapper">
                                        {words.map((word, index) => (
                                            <b key={index} className={index === visibleWordIndex ? 'is-visible' : 'is-hidden'}>
                                                {word}
                                            </b>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="second" id='second'>
                <div className="outer">
                    <div className="inner">
                        <div className="md-bg">
                          
                            <img className='bg' src="/md-bg.svg" alt="" />
                        <div className="md-wrapper">
                                <div className='md-msg-wrap' >
                                    <img className='quotes-icon' src="/quotes.svg" alt="" />
                                    <h1>
                                        Your Company's total sales grew by over ßßxx % on the back of p xx and xx growth, navigating a dynamic market landscape.
                                    </h1>
                                    <h3>Suresh Narayanan</h3>
                                    <p>Chairman and Managing Director, <br />Nestlé India</p>
                                    <a href="/docs/MDMessage2.html" target='blank_' className="read-msg-btn">
                                        Read Full Message
                                        <img className="msg-btn-icon" src="/but.svg"  alt="" />
                                    </a>
                                </div>
                                <div className='md-avatar-wrap'>
                                    <img src="/md-avatar.webp" alt="" />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </section>
            <section className="third">
                <div className="outer">
                    <div className="inner">
                        <div className="bg ">
                            <div className='our-purpose'>

                            <h2 className="section-heading">Our Purpose</h2>
                            <p className='purpose-p'>
                            We unlock the power of food to enhance quality of <br />life for everyone, today and for generations to come.
                            </p>
                            <h5 className='purpose-h5'>
                            Our path to progress is underpinned by our <br />Purpose, Performance, People, Partnership <br />and Planet.
                            </h5>
                            <div className='purpose-icons-row flex'>
                                <img src="/Icon1.svg" alt="" />
                                <img src="/Icon2.svg" alt="" />
                                <img src="/Icon3.svg" alt="" />
                                <img src="/Icon4.svg" alt="" />
                                <img src="/Icon5.svg" alt="" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fourth">
                <div className="outer">
                    <div className="inner">
                        <div className="bg nes-story">
                            {/* <h2 className="section-heading">Content 3</h2> */}
                            {/* <VantaBg/> */}
                            <MarqueeComponent/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fifth">
                <div className="outer">
                    <div className="inner">
                        <div className="bg">
                            <h2 className="section-heading">Content 3</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sixth">
                <div className="outer">
                    <div className="inner">
                        <div className="bg">
                            <h2 className="section-heading">Content 3</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="seventh">
                <div className="outer">
                    <div className="inner">
                        <div className="bg">
                            <h2 className="section-heading">Content 3</h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
