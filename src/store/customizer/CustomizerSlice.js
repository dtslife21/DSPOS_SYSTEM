import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeDir: 'ltr',
  activeMode: 'light', 
  activeTheme: 'GREEN_THEME',  
  SidebarWidth: 280,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: 'full',  
  isCollapse: false,  
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: 'en',
  isCardShadow: true,
  borderRadius: 7,
};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.activeTheme = action.payload;
    },
    setDarkMode: (state, action) => {
      state.activeMode = action.payload;
    },
    setDir: (state, action) => {
      state.activeDir = action.payload;
    },
    setLanguage: (state, action) => {
      state.isLanguage = action.payload;
    },
    setCardShadow: (state, action) => {
      state.isCardShadow = action.payload;
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    hoverSidebar: (state, action) => {
      state.isSidebarHover = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebar = !state.isMobileSidebar;
    },
    toggleLayout: (state, action) => {
      state.isLayout = action.payload;
    },
    toggleHorizontal: (state, action) => {
      state.isHorizontal = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
  },
});

export const {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  hoverSidebar,
  toggleMobileSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setLanguage,
  setCardShadow,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
