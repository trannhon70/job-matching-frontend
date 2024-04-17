export interface ConversationItemType {
  _id: string;
  idEmployee: number;
  idCompany: number;
  fileLogo: string;
  avatarUrl: string;
  employeeName: string;
  companyName: string;
  lastMessage: string;
}

export interface DetailConversationType {
  chat: Chat[];
  convesation: string;
  imageEmployee?: string;
  employeeName?: string;
  companyName?: string;
  fileLogo?: string;
}

export interface Chat {
  _id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
