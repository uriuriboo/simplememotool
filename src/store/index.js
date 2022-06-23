import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  storage:localStorage
})

export default createStore({
  state: {
    count:0,
    memos:[]
  },
  getters: {
    getCount:(state)=>{
      return state.memos.length
    },
    getAll:(state)=>{
      return state.memos
    },
    getMemoById:(state)=>(id)=>{
      return state.memos.find(memos => memos.id === id)
    }
  },
  mutations: {
    RESTRE_MUTAION: vuexPersist.RESTORE_MUTATION,
    save(state,newMemo) {
      if(newMemo.id) {
        let x = state.memos.find(memo => newMemo.id === memo.id)
        x.title = newMemo.title
        x.content = newMemo.content
      }
      else {
        newMemo.id = ++state.count;
        state.memos.unshift(newMemo)
      }
    },
    delete(state,id) {
      state.memos = state.memos.filter(memo => memo.id !== id)

    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[vuexPersist.plugin]
})
