import React, { useRef, useEffect } from "react";
import styles from "./CollapsibleSection.module.scss";


type CollapsibleSectionProps = {
  children: React.ReactNode;
  className?: string;
  header: React.ReactNode;
};

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ children, header, className }) => {
  const contentRef = useRef<HTMLDivElement>(null);
//   console.log(contentRef.current?.getAttribute("data-collapsed"), "123", contentRef.current)
  useEffect(() => {
    // if (contentRef?.current?.getAttribute("data-collapsed") === "false") {
    if(contentRef.current) {
      contentRef.current.setAttribute("data-collapsed", "true");
      contentRef.current.style.height = "0px";
    }
  }, []);


  const collapseSection = (element: HTMLElement) => {
    const sectionHeight = element.scrollHeight;

    const elementTransition = element.style.transition;
    element.style.transition = "";

    requestAnimationFrame(() => {
      element.style.height = sectionHeight + "px";
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = "0px";
      });
    });

    element.setAttribute("data-collapsed", "true");
  };

  const expandSection = (element: HTMLElement) => {
    const sectionHeight = element.scrollHeight;

    element.style.height = sectionHeight + "px";

    element.addEventListener("transitionend", function transitionEndListener() {
      element.removeEventListener("transitionend", transitionEndListener);
      element.style.height = "";
    });

    element.setAttribute("data-collapsed", "false");
  };


const toggleCollapse = () => {
    if (contentRef.current) {
      const isCollapsed = contentRef.current.getAttribute('data-collapsed') === 'true';
      if (isCollapsed) {
        expandSection(contentRef.current);
        contentRef.current.setAttribute('data-collapsed', 'false');
      } else {
        collapseSection(contentRef.current);
        contentRef.current.setAttribute('data-collapsed', 'true');
      }
    }
  };

  return (
    <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={toggleCollapse}>
            {header}
        </div>
        <div className={styles.sectionContent} ref={contentRef}>
            {children}
        </div>
  </div>
  );
};

export default CollapsibleSection;