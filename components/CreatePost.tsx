import {IoBrush} from 'react-icons/io5'

interface buttonClickProps{
  onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void
}
const CreatePost = ({onClick}:buttonClickProps) => {

  return (
    <button onClick={(e)=>{e.preventDefault(); onClick(e)}} className="fixed z-20 h-16 rounded-full bottom-6 drop-shadow-glow right-4 grid place-items-center bg-interactive aspect-square">
      <IoBrush className="text-3xl text-white" />
    </button>
        )
}

export default CreatePost
