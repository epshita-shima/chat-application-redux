import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationApi";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";
import getPartnerInfo from "../../utils/getPartnerInfo";
import { Link } from "react-router-dom";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);

  let content = null;

  if (isLoading) {
    content = <li className="mt-2 text-center">Loading....</li>;
  } 
  else if (!isLoading && isError) {
    content = (
      <li className="mt-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } 
  else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li className="mt-2 text-center">No conversations found!</li>;
  } 
  else if (!isLoading && !isError && conversations?.length > 0) {
    content = conversations.map((conversation) => {
   const {id, message,timestamp}=conversation;
   const {name}=getPartnerInfo(conversation.users,email)
     return <li key={id}>
      <Link to={`/inbox/${id}`}>
      <ChatItem
          avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
          name={name }
          lastMessage={message}
          lastTime='25 minutes ago'
        />
      </Link>
        
      </li>
    });
  }
  return <ul>{content}</ul>;
}
