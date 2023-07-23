import type { Content, Root, Parent } from 'mdast'
import { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx";
import { ReactNode } from 'react';

export type ITree = Root | Content | MdxJsxFlowElement | MdxJsxTextElement

export interface IRoot extends Parent {
  children: (Content | MdxJsxFlowElement | MdxJsxTextElement)[]
}

export type IHandler<T extends ITree, Options extends Record<string, any> = Record<string, any>> = (node: T, options?: Options) => ReactNode

export interface IMetaComponentBase <T extends ITree> {
  node: T
}