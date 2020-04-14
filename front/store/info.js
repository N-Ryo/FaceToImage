export const state = () => ({
  mobile: false
})

export const mutations = {
  setMobile(state, mobile) {
    state.mobile = mobile;
  },
}

export const actions = {
  fetchAccessInfo({commit}, {ua}) {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    const mobile = toMatch.some((toMatchItem) => {
        return ua.match(toMatchItem);
    });
    commit('setMobile', mobile);
  }
}