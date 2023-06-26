import FadeIn from 'react-fade-in';
import { HiOutlineEmojiSad } from  "react-icons/hi";

export function NoPermission() 
{
  return (
    <FadeIn>
        <h1 className="sad_num">Forbidden</h1>
        <h2>Access Denied!</h2>
        <p>You Don’t Have Permission To Access This Site</p>
        <h1 className="sad"><HiOutlineEmojiSad /></h1>
    </FadeIn>
  );
}
