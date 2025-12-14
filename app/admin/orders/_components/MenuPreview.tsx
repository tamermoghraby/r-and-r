export function MenuPreview({
  item,
  onClose,
  onAdd,
}: {
  item: any;
  onClose: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[360px] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-lg">${item.price}</span>
            <button
              onClick={onAdd}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add to order
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-black/50 rounded-full w-8 h-8"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
