import {unified, Processor} from "unified";
import {Content} from "mdast";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMDX from 'remark-mdx'


class MDProcessor {
    private processor: Processor;

    constructor() {
        this.processor = unified()
        this.init()
    }

    private init() {
        this.processor
            .use(remarkParse)
            .use(remarkMDX)
            .use(remarkGfm)
    }

    public async parse(content: string) {
        const data = await this.processor.parse(content)
        return this.processor.run(data) as Promise<Content>
    }


    public getContentTree(content: string) {
        return this.processor.process(content)
    }

}

const processor = new MDProcessor()

export default processor
