import React, { useState, useEffect, useRef } from 'react';
import Square from '../components/Square';

import './SquareContainer.css';

const colorList = [
    "#000000", "#C0C0C0", '#808080', "#00FFFF",
    "#800000", "#FF0000", "#800080", "#FF00FF",
    "#008000", "#00FF00", "#808000", "#FFFF00",
    "#000080", "#0000FF", "#008080"];

/**
* Randomly initializing the colors
* @param {Array[]} squares 
* @returns 
*/
export const populateSquareData = (squares) => {
    return squares.reduce((acc, val, i) => {
        const color = colorList[Math.floor(Math.random() * colorList.length)];
        acc.push({ id: i, color, ...val });
        return acc;
    }, []);
};

/**
 * Creating sqaures list based on available space
 * @returns Array[]
 */
export const  createSquareArray = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return new Array(Math.floor((width * height)/(15 * 15))).fill(0);
};

const SquareContainer = () => {

    const squareRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [squareList, setSqaureList] = useState(populateSquareData(createSquareArray()));

    /**
     * Updaling clickied square
     * @param {String} id 
     * @param {Boolean} isClicked 
     */
    const onClickSquare = (id, isClicked) => {
        squareList[id].isClicked = !isClicked;
        setSqaureList([...squareList]);
    };

    /**
     * Filling squares upon scrolling
     */
    const fillSqaures = () => {
        const element = squareRef.current;
        if ((element.scrollHeight - element.clientHeight - 200) <=  element.scrollTop && scrollY < element.scrollTop) {
            setScrollY(element.scrollTop);
            setSqaureList(populateSquareData([...squareList, ...createSquareArray()]));
        }
    }

    /**
    * Reseting Squares to the default and auto scring to top of scroll element
    */
    const resetData = () => {
        setSqaureList(populateSquareData(createSquareArray()));
        window.scrollTo(0, squareRef.current.offsetTop) 
        setScrollY(0);
    }

    useEffect(() => {
        document.addEventListener("scroll", fillSqaures, true);
        return () => {
            document.removeEventListener('scroll', fillSqaures, true);
        }
    });

    // TO DO need to virtualize the redering to improve performance and support for huge squre list
    return <div className="main-container">
            <div className="reset-button-panel">
                <button type="button" onClick={resetData} >Reset All</button>
            </div>
            <div className="right-panel"> 
                <div className="right-panel-top">Cumulative number of squares created: {squareList.length}</div>
                <div id="quare-container"  ref={squareRef} className="square-container">{
                    [...squareList].map(sq => {
                        return <Square {...sq} onClickSquare={onClickSquare} />
                    })}
                </div>
            </div>
        </div>;
}

export default SquareContainer;