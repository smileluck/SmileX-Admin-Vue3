// v-md-editor
// 文档地址: https://ckang1229.gitee.io/vue-markdown-editor/zh/
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core';
// 按需引入语言包
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
    hljs,
    config: {
        toc: {
            includeLevel: [1, 2, 3],
        },
    },
});

export default (app) => {
    app.use(VueMarkdownEditor);
}