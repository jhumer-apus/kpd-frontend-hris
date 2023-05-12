import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from './custom-styles/Carousel.module.scss';


const CarouselUI = ({ items }: any) => {
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
                <div className={styles.greetingsBar}>Good Afternoon, User!</div>
                <div className={styles.newsWrap}>
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
            </div>
        </div>
        </div>

    </React.Fragment>
    
  );
};

export default CarouselUI;