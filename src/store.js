import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultNotes = [
    {
        name: 'Default',
        mark: false
    }
];

const LS = {
    load() {
        return JSON.parse(localStorage.getItem('notes') || JSON.stringify(defaultNotes));
    },
    save(data) {
        localStorage.setItem('notes', JSON.stringify(data));
    },
    remove(key) {
        localStorage.removeItem(key);
    },
};

export default new Vuex.Store({
    state: {
        notes: [],
    },
    mutations: {
        setNotes(state, payload) {
            state.notes = payload;
            LS.save(state.notes);
        },
        addNote(state, payload) {
            state.notes.push(payload);
            LS.save(state.notes);
        },
        removeNote(state, payload) {
            let index = state.notes.indexOf(payload.note);
            state.notes.splice(index, 1);
            LS.save(state.notes);
            LS.remove(`note${payload.idx}`);
        },
        markNote(state, payload) {
            let index = state.notes.indexOf(payload);
            state.notes[index].mark = !state.notes[index].mark;
            LS.save(state.notes);
        },
    },
    actions: {
        getNotes({ commit }) {
            commit('setNotes', LS.load());
        }
    }
})
