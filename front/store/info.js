export const state = () => ({
  mobile: false,
  locale: 'ja'
})

export const mutations = {
  setMobile(state, mobile) {
    state.mobile = mobile;
  },
  setLocale(state, locale) {
    state.locale = locale;
  }
}

export const actions = {
  fetchAccessInfo({commit}, {ua, lang}) {
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
    console.log(lang)
    console.log(ua)
    commit('setMobile', mobile);
    commit('setLocale', lang);
  }
}