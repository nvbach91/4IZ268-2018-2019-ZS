const initialState = {
  spotify: {}
}
export const state = () => ({ ...initialState })

export const mutations = {
  setSpotify(state, spotify) {
    state.spotify = spotify
  }
}
