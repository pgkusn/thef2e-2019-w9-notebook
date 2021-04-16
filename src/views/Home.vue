<template>
    <div class="home">
        <div class="container">
            <div class="tools">
                <label class="mainBtn">
                    <input type="checkbox" v-model="showMarkNotes" />
                    <Icon :name="this.showMarkNotes ? 'star' : 'star_border'"></Icon>顯示星號筆記
                </label>

                <div class="search">
                    <input type="text" v-model="searchText" />
                    <Icon name="search"></Icon>
                </div>

                <div class="layoutSwitch icons">
                    <label>
                        <input type="radio" v-model="layout" name="layout" value="list" checked />
                        <Icon name="format_list_bulleted"></Icon>
                    </label>
                    <label>
                        <input type="radio" v-model="layout" name="layout" value="card" />
                        <Icon name="grid_on"></Icon>
                    </label>
                </div>
            </div>

            <ul class="grid" :class="layout">
                <li @click.prevent="addNote">
                    新增筆記本
                    <Icon name="add"></Icon>
                </li>
                <router-link
                    :to="{ name: 'notebook', params: { id: idx }}"
                    tag="li"
                    v-for="(note, idx) in notes"
                    :key="note.name"
                    replace
                >
                    {{note.name}}
                    <div class="icons">
                        <Icon
                            :name="note.mark ? 'star' : 'star_border'"
                            @click.native.stop="markNote(note)"
                        ></Icon>
                        <Icon name="close" @click.native.stop="removeNote({ note, idx })"></Icon>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
export default {
    name: 'home',
    components: {
        Icon,
    },
    data() {
        return {
            showMarkNotes: false,
            layout: 'list',
            searchText: '',
        }
    },
    computed: {
        notes() {
            let result = this.$store.state.notes;
            if (this.showMarkNotes) {
                result = result.filter(note => note.mark === true);
            }
            if (this.searchText) {
                result = result.filter(note => note.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1);
            }
            return result;
        },
    },
    methods: {
        addNote() {
            let name = prompt('筆記本名稱');
            if (name) {
                this.$store.commit('addNote', { name, mark: false });
            }
        },
        removeNote(obj) {
            if (confirm('確定刪除？')) {
                this.$store.commit('removeNote', obj);
            }
        },
        markNote(note) {
            this.$store.commit('markNote', note);
        },
    },
}
</script>

<style lang="scss" scoped>
.tools {
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
}
.mainBtn {
    cursor: pointer;
    [type="checkbox"] {
        display: none;
    }
    .icon {
        margin-right: 0.5em;
    }
}
.search {
    position: relative;
    width: 223px;
    height: 39px;
    input {
        padding-right: 40px;
        padding-left: 20px;
        width: 100%;
        height: 100%;
        border: 1px solid #000;
        border-radius: 24.5px;
        background-color: transparent;
        &:focus {
            outline: none;
        }
    }
    .icon {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
    }
}
.layoutSwitch {
    display: flex;
    label {
        cursor: pointer;
        & + label {
            margin-left: 10px;
        }
    }
    [type="radio"] {
        display: none;
    }
    .icon {
        opacity: 0.3;
        @at-root {
            .layoutSwitch [type="radio"]:checked + .icon {
                opacity: 1;
            }
        }
    }
}
.grid {
    display: flex;
    margin: -15px;
    padding: 0;
    font-size: 18px;
    flex-wrap: wrap;
    &.card {
        margin: -18px;
        font-size: 16px;
    }
    li {
        display: flex;
        margin: 15px;
        padding: 20px;
        width: 350px;
        border-radius: 5px;
        line-height: 1;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        @at-root {
            .grid.card li {
                flex-direction: column;
                margin: 18px;
                width: 155px;
                height: 206px;
                border-radius: 9px;
            }
        }
        &:first-child {
            border: 1px solid #000;
            @at-root {
                .grid.card li:first-child {
                    justify-content: center;
                    .icon {
                        order: -1;
                    }
                }
            }
            /deep/ .material-icons {
                font-size: 30px;
                @at-root {
                    .grid.card li:first-child /deep/ .material-icons {
                        margin-bottom: 5px;
                        font-size: 36px;
                    }
                }
            }
        }
        &:not(:first-child) {
            background-color: #f4f4f4;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
            @at-root {
                .grid.card li:not(:first-child) {
                    align-items: flex-start;
                    /deep/ .material-icons {
                        font-size: 30px;
                    }
                }
            }
        }
    }
    .icon + .icon {
        margin-left: 5px;
    }
}
.icons {
    display: flex;
    align-items: center;
    @at-root {
        .grid.card .icons {
            width: 100%;
            justify-content: space-between;
        }
    }
}
</style>