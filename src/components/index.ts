import { default as Content } from './Content'
import type {ReactElement} from "react";

const components: Record<string, (props: any) => ReactElement> = {
    content: Content
}

export default components
