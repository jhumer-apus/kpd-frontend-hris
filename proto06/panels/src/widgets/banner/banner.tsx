import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from './custom-styles/Carousel.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
// import { RootState } from "@/store/reducers";
import dayjs from "dayjs";
import { UnderDevelopmentMsg } from "@/pages/dashboard/hris-portal/local-components/projects-card";
import { ACTIVEANNOUNCEMENTViewAction, ANNOUNCEMENTViewAction } from "@/store/actions/payroll-eoy";
import { APILink } from "@/store/configureStore";


const CarouselUI = ({ items }: any) => {
    const dispatch = useDispatch();
    const { employee_detail } = useSelector((state: RootState) => state.auth);
    const state = useSelector((state: RootState) => state.payrollEOY.ACTIVEANNOUNCEMENTView)
    const [greetings, setGreeting] = useState("");
    
    useEffect(()=> {
        let timeNow = new Date().getHours();
        if (timeNow >= 5 && timeNow < 12){
            setGreeting("Good Morning")
        } else if (timeNow >= 12 && timeNow < 18){
            setGreeting("Good Afternoon")
        } else  {
            setGreeting("Good Evening")
        }
        dispatch(ACTIVEANNOUNCEMENTViewAction({rank: 1, dept: 1, pin: true}))
    }, [])

    const noAnnouncementsFound = [
        {
          imageUrl2: "/img/team-1.jpeg",
          date: "",
          altText: "Image 1",
          message: "In accordance with the Black Nazarene. There will be a holiday for Manila Area on Jan. 09, 2024..",
          posted_by: "Admin "
        },
        {
          imageUrl2: "/img/team-2.jpeg",
          date: "",
          altText: "Image 2",
          message: "There is no pinned announcement found. Check the announcement page/tab.",
          posted_by: "Admin "
        },
        {
          imageUrl2: "/img/team-3.jpeg",
          date: "",
          altText: "Image 3",
          message: "There is no pinned announcement found. Check the announcement page/tab.",
          posted_by: "Admin "
        },
      ];

    const activeAnnouncement = Array.isArray(state.data) ? state?.data?.map((item, index)=> {
        return (
            {
                imageUrl: item.emp_image,
                date: dayjs(item.date_posted).format("MMM DD, YYYY"),
                altText: `profile-image${index}`,
                message: item.message,
                posted_by: item.emp_name
                
            }
        )
    }) : [];
  return (
    <React.Fragment>
        <div className={styles.exampleWrap}>
        <div className={styles.wholeCarouselWrap}>
            <div className={styles.leftSide}>
                <div className={styles.greetingsBar}>{greetings}, {employee_detail?.gender?.includes("F")? 'Ms.': 'Mr.'} {employee_detail?.last_name}!</div>
                <div className={styles.newsWrap}> 
                    {/* <span className="italic">Announcements</span> */}
                    {/* <UnderDevelopmentMsg/> */}
                    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay swipeable={true} showStatus={false} showIndicators={false}>
                        {activeAnnouncement.length > 0 ?  
                        activeAnnouncement.map((item, index) => (
                            <div className={styles.carouselWrap} key={index}>
                                <div className={styles.date}>
                                    {item.date}
                                </div>
                                <div className={styles.caption}>
                                    {item?.message}
                                </div>
                                <div className={styles.personInfo}>
                                    <img className={styles.personPic} src={`${APILink.replace('/api/v1/', '')}${item.imageUrl}`} alt={item.altText} />
                                    <div className={styles.person}>{item?.posted_by}</div>
                                </div>
                            </div>
                        ))
                        : 
                        noAnnouncementsFound.map((item, index) => (
                            <div className={styles.carouselWrap} key={index}>
                                <div className={styles.date}>
                                    {item.date}
                                </div>
                                <div className={styles.caption}>
                                    {item?.message}
                                </div>
                                <div className={styles.personInfo}>
                                    <img className={styles.personPic} src={item.imageUrl2} alt={item.altText} />
                                    <div className={styles.person}>{item?.posted_by}</div>
                                </div>
                            </div>
                        ))
                    }
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