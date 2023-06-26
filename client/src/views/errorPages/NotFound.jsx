import FadeIn from 'react-fade-in';
import { HiOutlineEmojiSad } from  "react-icons/hi";

export function NotFound() 
{
  return (
    <FadeIn>
        <h1 className="sad_num">404</h1>
        <h2>Not Found</h2>
        <p>The page you are looking for does not exist</p>
        <h1 className="sad"><HiOutlineEmojiSad /></h1>
    </FadeIn>
  );
}
