import { useState } from "react";

function App() {
  const [items, setItems] = useState([])
  const handleAddItem = (item) => {
    setItems((items)=>[...items, item])
  }
  const handleDeleteItem = (id) => {
    setItems((items)=>items.filter((item)=>item.id !== id))
  }
  const handleToggleItem = (id) => {
    setItems((items)=>items.map((item)=>{
      if(item.id === id){
        return {
          ...item,
          packed: !item.packed
        }
      }
      return item
    }))
  }
  
  return (
    <div className="">
      <TopHeader />
      <FormSection onAdditem={handleAddItem} />
      <ListSection items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <FooterSection items={items} />
    </div>
  );
}

function TopHeader() {
  return (
    <div className="flex justify-center items-center bg-yellow-600 w-full py-2">
      <h1 className="text-4xl py-3 font-bold">FAR AWAY</h1>
    
    </div>

  );
}
function FormSection({onAdditem}){
  
  
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name) return
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      packed: false
    }
    console.log(newItem)
    onAdditem(newItem)
    setName('')
    setQuantity(1)
  }
  return (
    <div className="flex justify-center items-center bg-yellow-700 w-full py-2">
      <p>What do you want for your trip</p>
      <form onSubmit={handleSubmit}>
        <select className="shadow appearance-none border rounded  py-2 px-3 mx-3" name="" id="" value={quantity} onChange={(e)=>setQuantity(e.target.value)} >
          {
            Array.from({length: 20}, (_, i) => i + 1).map((item) => {
              return (
                <option key={item} value={item}>{item}</option>
              )
            })
          
          }
          
        </select>
        <input className="shadow appearance-none border rounded py-2 px-3" type="text" placeholder="item..." value={name} onChange={(e)=>setName(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2">Add</button>
      </form>
    </div>
  );
}

function ListSection({items, onDeleteItem, onToggleItem}){
  return (
    <div className="grid grid-cols-8 bg-yellow-800 w-full py-2 h-96 ">
      {
        items.map((item) => {
          return (
            <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
          )
        })
      }
    </div>
  );
}
function FooterSection({items}){
  const packedItems = items.filter((item)=>item.packed).length
  const packedPercentage = (packedItems / items.length) * 100
  
  return (
    <div className="flex justify-center items-center bg-teal-400 w-full py-10">
      <p>You have  {items.length} items on your list and you have already packed {packedItems} ({Math.floor(packedPercentage)}%)</p>
    </div>
  );
}

function Item({item, onDeleteItem, onToggleItem}){
  return (
    <div className={`flex items-center  mx-2 text-white ${item.packed ? 'line-through':''}`}>
       <input type="checkbox" className="mx-2" value={item.id} onChange={()=>{onToggleItem(item.id)}} />
      <p className="px-2">{item.name}</p>
      <p>{item.quantity}</p>
      <span onClick={()=>onDeleteItem(item.id)} className="text-red-600 text-sm px-1 cursor-pointer font-bold">X</span>
     
    </div>
  );
}

export default App;
