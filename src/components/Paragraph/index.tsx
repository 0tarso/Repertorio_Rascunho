//React icons
import { FaRegEdit } from "react-icons/fa"
import { IoTrashBinOutline } from "react-icons/io5"

interface ParagraphProps {
  text: string
  onDelete: () => void
  onEdit: () => void
  disabled: boolean
}

const Paragraph = ({ text, onDelete, onEdit, disabled }: ParagraphProps) => {
  return (
    <div className="group p-1 hover:bg-white rounded-md hover:drop-shadow-md relative transition-all border mb-2">

      <p className="select-none w-full break-words">{text}</p>

      {!disabled && (

        <div className="transition-all duration-1000 bottom-0 right-0 gap-x-2 hidden group-hover:flex flex-row justify-end p-1">

          <button className="px-2 py-1 rounded-sm text-zinc-700 text-sm opacity-80 hover:opacity-100 transition-all hover:drop-shadow-xl flex flex-row items-center gap-x-1"
            onClick={() => onDelete()}
            title="Excluir Parágrafo"
          >
            <IoTrashBinOutline />
            Excluir
          </button>

          <button className="px-2 py-1 rounded-sm text-zinc-700 text-sm opacity-80 hover:opacity-100 transition-all hover:drop-shadow-xl flex flex-row items-center gap-x-1"
            onClick={() => onEdit()}
            title="Editar Parágrafo"
          >
            <FaRegEdit />
            Editar
          </button>

        </div>

      )}

    </div>
  )
}

export default Paragraph