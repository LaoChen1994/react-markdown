import type { Content, Parent } from 'mdast'
import { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx";
import { ReactNode } from 'react';

export type ITree = Content | MdxJsxFlowElement | MdxJsxTextElement

export interface IRoot extends Parent {
  children: ITree[]
}

export type IHandler<T extends ITree, Options extends Record<string, any> = Record<string, any>> = (node: T, options?: Options) => ReactNode