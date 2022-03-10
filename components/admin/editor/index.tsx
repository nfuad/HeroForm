import { FC } from 'react'
import PropertyEditor from './property-editor'
import QuestionList from './question-list'

const Editor: FC = () => {
  return (
    <div className="flex items-start flex-grow bg-[#FCF1FE] rounded-t-3xl px-6 py-8 gap-x-8">
      <QuestionList />
      <div className="flex items-center self-stretch justify-center flex-grow bg">
        <h3 className="w-full max-w-sm text-4xl text-center text-gray-700">
          I should be editable... by next year, perhaps :)
        </h3>
        <style jsx>{`
          .bg {
            background-image: url('/background.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}</style>
      </div>
      <PropertyEditor />
    </div>
  )
}

export default Editor
