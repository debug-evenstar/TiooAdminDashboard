import { FC, useState, useEffect } from "react";

interface Props{
    text: any
    interval: number
    setStop: any
    Markup?: any
}
export const TextTyper:FC<Props> = ({
  text = "",
  interval,
  Markup = "",
  setStop
}) => {
  const [typedText, setTypedText] = useState("");

  const typingRender = (text:any, updater:any, interval:any) => {
    let localTypingIndex = 0;
    let localTyping = "";
    if (text) {
      let printer = setInterval(() => {
        if (localTypingIndex < text.length) {
          updater((localTyping += text[localTypingIndex]));
          localTypingIndex += 1;
        } else {
          localTypingIndex = 0;
          localTyping = "";
          clearInterval(printer);
          setStop(true)
          //  return setter && setter(value)
        }
      }, interval);
    }
  };
  useEffect(() => {
    typingRender(text, setTypedText, interval);
  }, [text, interval]);

  function createMarkup() {
    return {__html: typedText};
  }
  
  return (
      <div dangerouslySetInnerHTML={createMarkup()} style={{ whiteSpace: 'pre-line'}} className='text-[16px] type p-2'/>
  );
}
