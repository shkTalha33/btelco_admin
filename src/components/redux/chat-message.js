import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    messageList: [],
    activeChatId: null,
    activeUser: null,
    responsiveChat: false
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload
    },
    setMessageList: (state, action) => {
      state.messageList = action.payload
    },
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload
    },
    setResponsiveChat: (state, action) => {
      state.responsiveChat = action.payload
    }
  }
})

export const { setChatList, setMessageList, setActiveChatId, setResponsiveChat, setActiveUser } = ChatSlice.actions

export default ChatSlice.reducer