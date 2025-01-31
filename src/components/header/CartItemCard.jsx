import { Minus, Plus, X } from "lucide-react"
  
 

export function CartItemCard({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={96}
          height={96}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">Color: {item.color}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 text-gray-600 hover:text-gray-700"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-1 text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 text-gray-600 hover:text-gray-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

