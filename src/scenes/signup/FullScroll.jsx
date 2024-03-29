import React, { useState, useEffect, useRef } from "react";
import "./FullScroll.css";
import gxtLogo from "../../assets/flogo.jpeg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

// For individual pages
const FullScrollPage = (props) => {
  const { logo, children, answers } = props;
  return (
    <div className="full-scroll-page">
      <ProgressBar answers={answers} totalQuestions={7} />
      <img src={logo} alt="GrowtX" className="logo" />
      <div className="full-scroll-page-content">{children}</div>
    </div>
  );
};

function FullScroll(props) {
  const {
    answers,
    handleShowError,
    currentQuestionId,
    // isRequiredQuestionAnswered,
    checkIfLastQuestion
  } = props;

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pages = React.Children.toArray(props.children);
  const SCROLL_THRESHOLD = 30;

  const isQuestion = (pageIndex) => {
    if (pageIndex === 0) {
      return false;
    }
    return true;
  };

  const handleNextQuestion = (pageIndex) => {
    // dont scroll if required not filled
    if (isQuestion(pageIndex) 
    // && 
    // !isRequiredQuestionAnswered()
    ) {
      handleShowError(true);
      return pageIndex;
    }

    return Math.min(pageIndex + 1, pages.length - 1);
  };

  const handlePrevQuestion = (pageIndex) => {
    handleShowError(false);

    return Math.max(pageIndex - 1, 0);
  };

  const getNextIndex = (prevPageIndex, delta) => {
    return delta > 0
      ? handleNextQuestion(prevPageIndex)
      : handlePrevQuestion(prevPageIndex);
  };

  useEffect(() => {
    let isScrolling = false;
    let startY;

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      const deltaY = startY - event.touches[0].clientY;
      // Check if the current page has reached the top or bottom
      const container = event.target;
      const isAtTop = container.scrollTop === 0;
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      if (!isScrolling && Math.abs(deltaY) > SCROLL_THRESHOLD) {
        if ((deltaY > 0 && !isAtBottom) || (deltaY < 0 && !isAtTop)) {
          // Prevent default scrolling behavior
          event.preventDefault();
          const scrollY = container.scrollTop + deltaY;
          container.scrollTo({
            top: scrollY,
            behavior: "smooth",
          });
        } else {
          // Allow normal scrolling behavior
          isScrolling = true;
          const delta = Math.sign(deltaY);
          setCurrentPageIndex((prevPageIndex) =>
            getNextIndex(prevPageIndex, delta)
          );

          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    const handleWheel = (event) => {
      const delta = Math.sign(event.deltaY);

      // Check if the current page has reached the top or bottom
      const container = event.target;
      const isAtTop = container.scrollTop === 0;
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      if (!isScrolling && Math.abs(event.deltaY) > SCROLL_THRESHOLD) {
        if ((delta > 0 && !isAtBottom) || (delta < 0 && !isAtTop)) {
          // Prevent default scrolling behavior
          event.preventDefault();
          const scrollY = container.scrollTop + event.deltaY;
          container.scrollTo({
            top: scrollY,
            behavior: "smooth",
          });
        } else {
          // Allow normal scrolling behavior
          isScrolling = true;
          setCurrentPageIndex((prevPageIndex) =>
            getNextIndex(prevPageIndex, delta)
          );

          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [answers, currentQuestionId]);

  const containerStyle = {
    transform: `translateY(-${currentPageIndex * (100 / pages.length)}%)`,
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
    scrollBehavior: "smooth",
  };

  const updateNextPage = () => {
    checkIfLastQuestion()
    setCurrentPageIndex((prevPageIndex) => handleNextQuestion(prevPageIndex));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      checkIfLastQuestion()
    }
    else if (event.key === "Enter") {
      event.preventDefault();
      updateNextPage();
    }
  };

  function addPropsToReactElement(element) {
    if (React.isValidElement(element)) {
      let clonedChildP = React.cloneElement(element, {
        updateNextPage,
      });

      return clonedChildP;
    }
    return element;
  }

  function addPropsToChildren(children) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children);
    }
    return children.map((childElement) => addPropsToReactElement(childElement));
  }

  return (
    <div
      className="full-scroll-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="full-scroll-content" style={containerStyle}>
        {pages.map((page, index) => (
          <FullScrollPage key={index} logo={gxtLogo} answers={answers}>
            {addPropsToChildren(page)}
          </FullScrollPage>
        ))}
      </div>
    </div>
  );
}

export default FullScroll;
