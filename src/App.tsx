import React, {useEffect, useMemo, useRef, useState} from "react";
import MDEditor from '@uiw/react-md-editor';

import processor from "./markdown-utils";
import {ITree} from './render/interface';
import Render from "./render/react";

import ReactPicker from './components/react-picker'
import {IOption, IValue} from "./components/react-picker/Column";

const OptionsMap: Record<string, IOption[]> = {
    title: [
        {label: 'Mr.', value: 'Mr.'},
        {label: 'Mrs.', value: 'Mrs.'},
        {label: 'Ms.', value: 'Ms.'},
        {label: 'Dr.', value: 'Dr.'}
    ],
    firstName: [
        {
            label: 'John',
            value: 'John',
        },

        {
            label: 'Micheal',
            value: 'Micheal',
        },
        {
            label: 'Elizabeth',
            value: 'Elizabeth',
        }
    ],
    secondName: [
        {

            label: 'Lennon',
            value: 'Lennon',
        },
        {
            label: 'Jackson',
            value: 'Jackson',
        },

        {
            label: 'Jordan',
            value: 'Jordan',

        },
        {
            label: 'Legend',
            value: 'Legend',
        },

        {
            label: 'Taylor',
            value: 'Taylor',
        }
    ]
}


export default function App() {
    const [value, setValue] = React.useState("");
    const [tree, setTree] = React.useState<ITree>({} as ITree)
    const ref = useRef<HTMLDivElement>(null)

    const [valueGroups, setValueGroups] = useState({
        title: 'Mr.',
        firstName: 'John',
        secondName: 'Lennon'
    })

    const [visible, setVisible] = useState(false)

    const onPickerChange = (name: string, value: IValue) => {
        setValueGroups({
            ...valueGroups,
            [name]: value
        })
    }

    const onChange = async (value: string | undefined = '') => {
        setValue(value)
        const html = await processor.parse(value)

        setTree(html)
    }

    useEffect(() => {
        onChange("**Hello world!!!** \n \n <Content title='我是Content' /> \n # 1  \n ## 2")
    }, [])

    const content = useMemo(() => {

        return Object.values(valueGroups).join(" ")
    }, [valueGroups])
    return (
        <div className="container">
            <h2>MDEditor</h2>
            <MDEditor
                value={value}
                onChange={onChange}
                preview="edit"
            />

            {/*<Render node={tree} />*/}

            <button onClick={() => setVisible(true)}>open picker</button>

            <div>
                <strong>{content}</strong>
            </div>

            <ReactPicker
                wheel='normal'
                visible={visible}
                optionGroups={OptionsMap}
                valueGroups={valueGroups}
                onChange={onPickerChange}
            />
        </div>
    );
}
