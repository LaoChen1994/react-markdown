import './index.less';
import {CSSProperties, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import Column, {IOption, IValue} from "./Column";
import './index.less'

export interface IBaseProps {
    className?: string;
    style?: CSSProperties
}

interface IPickerProps extends IBaseProps {
    visible: boolean;
    optionGroups: Record<string, IOption[]>;
    valueGroups: Record<string, IValue>;
    onChange?: (name: string, value: IValue) => void;
    onClick?: (name: string, value: IValue) => void;
    itemHeight?: number;
    height?: number;
    wheel?: 'off' | 'natural' | 'normal';
    onClose?: () => void
}

const ReactPicker = (props: IPickerProps) => {
    const {
        optionGroups,
        valueGroups,
        itemHeight = 36,
        height = 216,
        style,
        className,
        visible,
        onClose,
        ...res
    } = props

    const memoStyle = useMemo(() => {

        return {
            ...style,
            height: height
        }
    }, [style, height])

    const [innerShow, setInnerShow] = useState(false)
    const [startAnimation, setStartAnimtion] = useState(false)

    const highlightStyle: CSSProperties = useMemo(() => {
        return {
            height: itemHeight,
            marginTop: -(itemHeight / 2)
        }
    }, [itemHeight])

    const handleClose = () => {
        onClose && onClose()
    }

    useEffect(() => {
        if (visible) {
            // 拉起弹框
            setInnerShow(true)
            setTimeout(() => {
                setStartAnimtion(true)
            }, 200)
        } else {
            // 关闭弹框
        }
    }, [visible])

    return (
        <div className={
            classNames(
                className,
                'picker-modal-container',
                {
                    show: innerShow
                }
            )}
        >

            <div
                className={classNames(
                    'picker-modal-mask',
                    {
                        show: startAnimation
                    }
                )}
                onClick={handleClose}
            />

            <div
                className={classNames(
                    "picker-container",
                    {
                        show: startAnimation
                    }
                )} style={memoStyle}
            >
                <div className="picker-inner">
                    {
                        Object.keys(optionGroups).map((optionKey) => (
                            <Column
                                key={optionKey}
                                name={optionKey}
                                columnHeight={height}
                                options={optionGroups[optionKey as keyof typeof optionGroups]}
                                value={valueGroups[optionKey as keyof typeof optionGroups]}
                                itemHeight={itemHeight}
                                {...res}
                            />
                        ))
                    }
                    <div className="picker-highlight" style={highlightStyle}></div>
                </div>
            </div>
        </div>
    )
}

export default ReactPicker;
