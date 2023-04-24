import {useState} from "react"
import {IoIosClose} from "react-icons/io"

interface catagoryItemType {
  key: string,
  value: number,
  selected: boolean
}

const SelectedElement = ({catagoryItem, clickEvent}:{catagoryItem: catagoryItemType, clickEvent:(object:catagoryItemType)=>void}) => {
  return (
    <button onClick={(e)=>clickEvent(catagoryItem)} className="p-1 px-2 min-w-[4rem] border-4 border-solid text-sm rounded-full bg-secondary border-interactive text-heading shadow-glowLow font-Inter">
      {catagoryItem.key}
      <IoIosClose className="float-right h-full text-sm text-center"/>
    </button>
  )
}

export default function MultiSelect({catagory}:{catagory: catagoryItemType[]}) {

  const [catagoryList, SetCatagoryList] = useState( catagory )
  const handleDropdownChange = (selectedOption: catagoryItemType) => {
    const updatedCatagoryList = catagoryList.map((option)=>{
     if(selectedOption.key === option.key) {
        selectedOption.selected = !selectedOption.selected
        }
      return option
      })
    console.log(updatedCatagoryList)

    SetCatagoryList(updatedCatagoryList)
  }
  return (
    <div className="w-full grid place-items-center">
      <section className="flex flex-wrap mb-2 gap-2">{
        catagoryList.map((object, index)=>{
          if(object.selected)
            {
              return (<SelectedElement catagoryItem={object} key={index} clickEvent={handleDropdownChange}/>)
            }
        })}
      </section>
      <select value={"Hello"} onChange={(e)=>handleDropdownChange(catagoryList[Number(e.target.value)])} className="w-64 h-12 text-sm text-center border-4 border-solid rounded-full font-Inter text-interactive drop-shadow-glow bg-secondary border-interactive">
        <option value={-1}>Select Categories</option>
      {  
          catagoryList.map((object, index)=>{
            if(!object.selected)
              {
                return (<option value={index} key={index}>{object.key}</option>)
              }
          })
        }
      </select>
    </div>
  )
}
