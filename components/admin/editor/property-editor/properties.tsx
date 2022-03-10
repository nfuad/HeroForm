import { FC } from 'react'

const Properties: FC = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg text-black">Properties</h2>
      <div className="space-x-2">
        <input type="checkbox" />
        <span className="font-body">Required</span>
      </div>
    </div>
  )
}

export default Properties
