import React, {useEffect, useRef} from "react";
import MDEditor from '@uiw/react-md-editor';

import processor from "./markdown-utils";
import { ITree } from './render/interface';
import Render from "./render/react";


export default function App() {
    const [value, setValue] = React.useState("");
    const [tree, setTree] = React.useState<ITree>({} as ITree)
    const ref = useRef<HTMLDivElement>(null)

    const onChange = async (value: string | undefined = '') => {
        setValue(value)
        const html = await processor.parse(value)

        console.log(html)

        setTree(html)
    }

    useEffect(() => {
        onChange("**Hello world!!!** \n \n <Content title='我是Content' /> \n # 1  \n ## 2")
    }, [])

    return (
        <div className="container">
            <h2>MDEditor</h2>
            <MDEditor
                value={value}
                onChange={onChange}
                preview="edit"
            />

            <Render node={tree} />
        </div>
    );
}
