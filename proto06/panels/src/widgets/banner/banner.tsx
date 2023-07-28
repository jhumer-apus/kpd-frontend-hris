import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from './custom-styles/Carousel.module.scss';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
// import { RootState } from "@/store/reducers";
import { UnderDevelopmentMsg } from "@/pages/dashboard/hris-portal/local-components/projects-card";

const CarouselUI = ({ items }: any) => {
    const { employee_detail } = useSelector((state: RootState) => state.auth);

    const carouselItems = [
        {
          imageUrl: "/img/team-1.jpeg",
          caption: "05/12/2023",
          altText: "Image 1",
        },
        {
          imageUrl: "/img/team-2.jpeg",
          caption: "05/05/2023",
          altText: "Image 2",
        },
        {
          imageUrl: "/img/team-3.jpeg",
          caption: "05/02/2023",
          altText: "Image 3",
        },
      ];
  return (
    <React.Fragment>
        <div className={styles.exampleWrap}>
        <div className={styles.wholeCarouselWrap}>
            <div className={styles.leftSide}>
                <div className={styles.greetingsBar}>Good Afternoon, {employee_detail?.gender?.includes("F")? 'Ms.': 'Mr.'} {employee_detail?.last_name}!</div>
                <div className={styles.newsWrap}>
                    <UnderDevelopmentMsg/>
                    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay swipeable={true} showStatus={false} showIndicators={false}>
                        {carouselItems.map((item, index) => (
                            <div className={styles.carouselWrap} key={index}>
                                <div className={styles.date}>
                                    {item.caption}
                                </div>
                                <div className={styles.caption}>
                                    Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur dolor sit amet consectetur
                                </div>
                                <div className={styles.personInfo}>
                                    <img className={styles.personPic} src={item.imageUrl} alt={item.altText} />
                                    <div className={styles.person}>Esther Howard</div>
                                </div>
                            </div>
                            
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className={styles.rightSide}>
                <iframe src={"/img/astronaut.svg"}/>
                <svg className={styles.planet} viewBox="0 0 160 160" width="160" height="160">
                    <circle cx="80" cy="80" r="50" fill="#757575" fill-opacity={"0.9"}/>
                    <g transform=" matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
                        <path d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z" fill="#fff">
                        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="1s" repeatCount="indefinite" />
                        </path>
                    </g>
                    <path d="M 50,0 A 50,50 0 0,0 -50,0Z" transform="matrix(0.866, -0.5, 0.5, 0.866, 80, 80)" fill="#757575" />
                </svg>
            </div>
        </div>
        </div>
    </React.Fragment>
    
  );
};

export default CarouselUI;