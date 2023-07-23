import React, {FC, ReactElement} from "react";

interface IContent {
    title: string
}

const Content: (props: IContent) => ReactElement = (props) => {
    const {title} = props

    return (
        <div className="title">{title}</div>
    )
}

export default Content
