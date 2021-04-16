<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                >
                    <Icon name="format_bold"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                >
                    <Icon name="format_italic"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                >
                    <Icon name="format_strikethrough"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                >
                    <Icon name="format_underlined"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                >
                    <Icon name="code"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                >H1</button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                >H2</button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                >H3</button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                >
                    <Icon name="format_list_bulleted"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                >
                    <Icon name="format_list_numbered"></Icon>
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                >
                    <Icon name="format_quote"></Icon>
                </button>

                <button class="menubar__button" @click="commands.undo">
                    <Icon name="undo"></Icon>
                </button>

                <button class="menubar__button" @click="commands.redo">
                    <Icon name="redo"></Icon>
                </button>
            </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
} from 'tiptap-extensions'
import Icon from '@/components/Icon.vue';

export default {
    props: {
        id: {
            required: true
        }
    },
    components: {
        EditorContent,
        EditorMenuBar,
        Icon,
    },
    data() {
        return {
            editor: new Editor({
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new HorizontalRule(),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                ],
                content: `<h2>
                        Hi there,
                    </h2>
                    <p>
                        this is a very <em>basic</em> example of tiptap.
                    </p>
                    <pre><code>body { display: none; }</code></pre>
                    <ul>
                        <li>
                        A regular list
                        </li>
                        <li>
                        With regular items
                        </li>
                    </ul>
                    <blockquote>
                        It's amazing 👏
                        <br />
                        – mom
                    </blockquote>`,
                onUpdate: ({ getHTML }) => {
                    localStorage.setItem(`note${this.id}`, JSON.stringify(getHTML()));
                },
            }),
            json: '',
        }
    },
    methods: {
        setContent() {
            this.editor.setContent(this.json, true);
        },
    },
    created() {
        this.json = JSON.parse(localStorage.getItem(`note${this.id}`));
        if (this.json) {
            this.setContent();
        }
    },
    beforeDestroy() {
        this.editor.destroy();
    }
}
</script>

<style lang="scss" scoped>
.menubar {
    display: flex;
}
button {
    border: none;
    background-color: transparent;
    font-weight: bolder;
    cursor: pointer;
    appearance: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
}
/deep/ .ProseMirror:focus {
    outline: none;
}
</style>