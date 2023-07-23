import {IBaseProps} from './'
import {CSSProperties, TouchEventHandler, useEffect, useMemo, useRef, useState, WheelEventHandler} from "react";
import "./index.less"
import classNames from 'classnames'

export type IValue = string | number;

export interface IOption {
    label: string;
    value: IValue;
}


interface ColumnProps {
    name: string;
    value: IValue;
    options: IOption[];
    itemHeight: number;
    columnHeight: number;
    onChange?: (name: string, value: IValue) => void;
    onClick?: (name: string, value: IValue) => void;
    wheel?: 'off' | 'natural' | 'normal';
}

const Column = (props: ColumnProps) => {
    const {
        name,
        value,
        columnHeight,
        itemHeight,
        options,
        onClick,
        onChange,
        wheel,
    } = props

    const [isMoving, setIsMoving] = useState(false)
    const [startTouchY, setStateTouchY] = useState(0)
    const [startScrollerTranslate, setStartScrollerTranslate] = useState(0)

    const [scrollerTranslate, setScrollerTranslate] = useState(0)
    const [minTranslate, setMinTranslate] = useState(0)
    const [maxTranslate, setMaxTranslate] = useState(0)

    const reference = useRef<HTMLDivElement>(null)

    const onValueSelected = (value: IValue) => {
        onChange && onChange(name, value)
    }

    const transitionStyle = useMemo(() => {
        const translateString = `translate3d(0, ${scrollerTranslate}px, 0)`;
        const style: CSSProperties = {
            WebkitTransform: translateString,
            transform: translateString
        };

        if (isMoving) {
            style.transitionDuration = '0ms';
        }

        return style
    }, [scrollerTranslate, isMoving])

    const handleItemClick = (
        option: IOption
    ) => {
        if (option.value !== value) {
            onValueSelected(option.value);
        }

        const clickValue = option.value

        onClick && onClick(name, clickValue)
    }

    const updateTranslate = () => {
        let selectedIndex = options.findIndex(option => value === option.value);

        if (selectedIndex < 0) {
            // throw new ReferenceError();
            console.warn('Warning: "' + name+ '" doesn\'t contain an option of "' + value + '".');
            onValueSelected(options[0].value);
            selectedIndex = 0;
        }

        setScrollerTranslate(columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight)
        setMinTranslate(columnHeight / 2 - itemHeight * options.length + itemHeight / 2)
        setMaxTranslate(columnHeight / 2 - itemHeight / 2)
    };

    const onScrollerTranslateSettled = (scrollerTranslate: number) => {
        let activeIndex = 0;

        if (scrollerTranslate >= maxTranslate) {
            activeIndex = 0;
        } else if (scrollerTranslate <= minTranslate) {
            activeIndex = options.length - 1;
        } else {
            activeIndex = -Math.round((scrollerTranslate - maxTranslate) / itemHeight);
        }

        // @todo check
        updateTranslate()

        onValueSelected(options[activeIndex].value);
    }

    const handleWheel: WheelEventHandler<HTMLDivElement> = (e) => {
        var delta = e.deltaY * 0.1;

        if (Math.abs(delta) < itemHeight) {
            delta = itemHeight * Math.sign(delta);
        }

        switch (wheel) {
            case 'natural':
                // ignore and continue
                break;
            case 'normal':
                delta = delta * -1;
                break;
            default:
                return;
        }

        onScrollerTranslateSettled(scrollerTranslate + delta);
    }

    useEffect(() => {
        updateTranslate()
    }, [value, itemHeight, columnHeight, options.length])

    const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
        const passiveEvents = ['onTouchStart', 'onTouchMove', 'onWheel'];
        // @ts-ignore
        if(!passiveEvents.includes(event._reactName)) {
            event.preventDefault();
        }

        const touchY = event.targetTouches[0].pageY;
        if (!isMoving) {
            setIsMoving(true)
            return
        }

        let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;

        if (nextScrollerTranslate < minTranslate) {
            nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
        } else if (nextScrollerTranslate > maxTranslate) {
            nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
        }

        setScrollerTranslate(nextScrollerTranslate)
    };
    const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
        const startTouchY = event.targetTouches[0].pageY;
        setStateTouchY(startTouchY);
        setStartScrollerTranslate(scrollerTranslate)
    };

    const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
        if (!isMoving) {
            return;
        }

        setIsMoving(false);
        setStateTouchY(0);
        setScrollerTranslate(0)

        setTimeout(() => {
            onScrollerTranslateSettled(scrollerTranslate);
        }, 0);
    }


    const handleTouchCancel: TouchEventHandler<HTMLDivElement> = (event) => {
        if (!isMoving) {
            return;
        }

        setIsMoving(false);
        setStateTouchY(0);
        setStartScrollerTranslate(0)
        setScrollerTranslate(startScrollerTranslate)
    };

    return (
        <div
            className="picker-column"
            ref={reference}
            onWheel={handleWheel}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
        >
            <div
                className="picker-scroller"
                style={transitionStyle}
            >
                {
                    options.map((option, index) => (
                            <div
                                key={index}
                                className={classNames(
                                    'picker-item',
                                    {
                                        'picker-item-selected': value === option.value,
                                    }
                                )}
                                style={{
                                    height: itemHeight,
                                    lineHeight: `${itemHeight}px`
                                }}
                                onClick={() => handleItemClick(option)}>
                                {option.label}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Column;
