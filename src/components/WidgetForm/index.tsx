import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';


export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de uma balão de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  function RestartFeedback() {
    setIsFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      { isFeedbackSent ? (
        <FeedbackSuccessStep onRequestRestartFeedback={RestartFeedback} />
      ) : (
        <>
          { !feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType}
              onRequestRestartFeedback={RestartFeedback}
              onFeedbackSent={() => setIsFeedbackSent(true)}
            />
          ) }
        </>
      ) }

      <footer className="text-xs text-neutral-400">
        <span>Feito com amor por <a className="underline underline-offset-2" href="https://www.linkedin.com/in/rodrigo-oliveira-981b5a1a7/">Rodrigo Oliveira</a></span>
      </footer>
    </div>
  );
}