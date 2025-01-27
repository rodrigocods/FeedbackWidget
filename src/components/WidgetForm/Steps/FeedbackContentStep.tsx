import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType,
  onRequestRestartFeedback: () => void,
  onFeedbackSent: () => void,
}

export function FeedbackContentStep({feedbackType, onRequestRestartFeedback, onFeedbackSent}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('');
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [isSendingFeedback, setIsSeedingFeedback] = useState(false);

  async function submitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSeedingFeedback(true);
    
    await api.post('/feedback', {
      type: feedbackType,
      comment,
      screenshot,
    });
    
    setIsSeedingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onRequestRestartFeedback}
        >
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={submitFeedback}>
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 
            border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 
            focus-ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent 
            scrollbar-thin"
            onChange={event => setComment(event.target.value)}
          placeholder="Conte com detalhes o que está acontecendo..."  
        />
        <footer className="flex gap-2 my-2 w-full">
          <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot} />

          <button type="submit" className="p-2 flex bg-brand-500 rounded-md border-transparent flex-1 justify-center 
            items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>

    </>
  );
}