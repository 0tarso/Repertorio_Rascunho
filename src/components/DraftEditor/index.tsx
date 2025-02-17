//React
import { toast } from 'react-toastify'
import { ChangeEvent, useState } from 'react'
import { LuNotebookPen } from 'react-icons/lu'

//Component
import Paragraph from '../Paragraph'

//ID Generator
import { v4 as uuidv4 } from 'uuid'


interface paragraphs {
  id: string
  text: string
}


const DraftEditor = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const [writing, setWriting] = useState<paragraphs[]>([])
  const [inputText, setInputText] = useState<string>("")

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editTextId, setEditTextId] = useState<string>("")

  const [isViewingFinalWriting, setIsViewingFinalWriting] = useState<boolean>(false)
  const [finalWriting, setFinalWriting] = useState<string>("")


  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }


  const addParagraph = () => {
    if (inputText === "") {
      toast.info("Comece inserindo um texto :)")
      return
    }

    if (inputText.length < 120) {
      toast.info("Podemos ir aumentando o tamanho, hein!")
    }

    const newParagraph = {
      id: uuidv4(),
      text: inputText
    }

    setWriting([...writing, newParagraph])
    setInputText("")
  }


  const handleEdit = (data: paragraphs) => {
    if (inputText) {
      toast.info("Apague o texto da lousa para editar.")
      return
    }
    setInputText(data.text)
    setEditTextId(data.id)
    setIsEditing(true)
  }


  const handleSaveEdit = ({ id, text }: paragraphs) => {
    if (inputText === "") {
      toast.info("Comece inserindo um texto :)")
      return
    }

    const updatedParagraph = writing.map(paragraph => {
      if (paragraph.id === id) {
        return { ...paragraph, text }
      }

      return paragraph
    })

    setWriting(updatedParagraph)
    setInputText("")
    setIsEditing(false)

  }


  const handleDelete = (data: paragraphs) => {
    const updatedWriting = writing.filter(paragraph => paragraph.id !== data.id)
    setWriting(updatedWriting)
  }


  const handleSaveWriting = () => {
    if (writing.length === 0) {
      toast.info("Primeiro crie sua redação :)")
      return
    }

    setLoading(true)

    // Simulando atraso com o banco ou storage local
    setTimeout(() => {
      setLoading(false)
      toast.success("Redação salva!")
      setInputText("")
      setWriting([])
    }, 1000);
  }


  const handleViewFullWriting = () => {
    if (writing.length === 0) {
      const message = "Comece escrevendo seus primeiros parágrafos :)"
      setFinalWriting(message)
      setIsViewingFinalWriting(true)
      return
    }

    const fullWriting = writing.map(paragraph => {

      return ` ${paragraph.text}`

    }).join("\n")

    setFinalWriting(fullWriting)
    setIsViewingFinalWriting(true)
  }


  if (isViewingFinalWriting) {
    return (
      <section className='max-w-5xl w-3/4 mx-auto p-4 bg-white rounded-xl shadow-lg shadow-[#092bd6]/20 transition-all duration-700 fadeInEff relative max-md:w-11/12 '>

        <h1 className='text-xl font-medium'>Seu rascunho</h1>
        <p className='whitespace-pre-line break-words'>{finalWriting}</p>

        <div className='flex flex-row justify-center mt-2 gap-x-2'>

          <button
            className="px-4 py-2 bg-[#9702e7] text-white rounded hover:bg-green-500 transition-all hover:scale-[1.02] hover:drop-shadow-md active:scale-100"
            onClick={() => setIsViewingFinalWriting(!isViewingFinalWriting)}
            title='Voltar para editor de rascunhos'
          >
            Voltar
          </button>

        </div>
      </section>

    )
  }


  return (
    <section className="max-w-5xl w-3/4 mx-auto p-4 bg-white rounded-xl shadow-lg shadow-[#092bd6]/20 transition-all duration-700 fadeInEff relative max-md:w-11/12 border-b-2 border-blue-500/50">


      <header className='flex justify-between items-start'>

        <div className='flex flex-row items-center gap-x-2 mb-6'>
          <LuNotebookPen size={38} color='#9702e7' aria-label="Ícone de um caderno" />
          <h1 className="text-2xl font-medium drop-shadow-md text-[#9702e7]">Editor de Rascunhos</h1>

        </div>

        <button className='text-xl font-bold text-zinc-700 rounded-full w-[30px] h-[30px] flex items-center justify-center hover:bg-[#9702e7]/60 hover:text-zinc-300 hover:drop-shadow-md transition-all active:scale-95 drop-shadow-none'
          aria-label='Fechar editor'
          title='Fechar editor'
        >
          x
        </button>

      </header>


      <textarea
        className="w-full p-2 border rounded min-h-[200px]"
        value={inputText}
        onChange={(e) => handleInput(e)}
        placeholder="Digite um parágrafo..."
        aria-label='Área de texto para escrever os parágrafos de seu rascunho'
      ></textarea>


      <div className='flex flex-row justify-end max-sm:justify-center'>

        {/* Para todos os botões, poderiamos ter um componente só. Mas para simplicidade e maior entendimento, deixei cada um montado separadamente. */}

        {!isEditing && (
          <button
            className="px-4 py-2 bg-[#092bd6] text-white rounded hover:bg-blue-500 transition-all mr-2 hover:scale-[1.02] hover:drop-shadow-md active:scale-100"
            onClick={() => setInputText("")}
            title='Limpar todo o parágrafo da área de texto'
          >
            Limpar Lousa
          </button>
        )}



        {isEditing ? (
          <button
            className="px-4 py-2 bg-[#092bd6] text-white rounded hover:bg-blue-500 transition-all hover:scale-[1.02] hover:drop-shadow-md active:scale-100"
            onClick={() => handleSaveEdit({ id: editTextId, text: inputText })}
            title='Salvar edição'
          >
            Salvar Edição
          </button>

        ) : (

          <button
            className="px-4 py-2 bg-[#092bd6] text-white rounded hover:bg-blue-500 transition-all hover:scale-[1.02] hover:drop-shadow-md active:scale-100"
            onClick={() => addParagraph()}
            title='Adicionar parágrafo'
          >
            Adicionar Parágrafo
          </button>
        )}

      </div>


      <div className="mt-6">

        <h2 className="text-xl font-medium text-[#9702e7]">
          {writing.length > 0 ? "Rascunho atual" : "Comece a escrever..."}
        </h2>

        <div className="border p-4 rounded bg-gray-100 overflow-scroll h-[250px]">

          {writing.length > 0 ? (
            writing.map((paragraph) => (
              <Paragraph key={paragraph.id}
                text={paragraph.text}
                onDelete={() => handleDelete(paragraph)}
                onEdit={() => handleEdit(paragraph)}
                disabled={isEditing}
              />
            )
            )
          ) : (
            <p className="text-gray-500">Nenhum parágrafo adicionado ainda.</p>
          )}

        </div>

        <div className='flex flex-row justify-center mt-2 gap-x-2 max-sm:flex-col max-sm:gap-y-2'>

          <button
            className="px-4 py-2 bg-[#9702e7] text-white rounded hover:bg-green-500 transition-all hover:scale-[1.02] hover:drop-shadow-md active:scale-100"
            onClick={() => handleSaveWriting()}
            title='Salvar Rascunho'
          >
            {loading ? "Salvando..." : "Salvar Rascunho"}
          </button>

          <button
            className="px-4 py-2 bg-[#9702e7] text-white rounded hover:bg-green-500 transition-all hover:scale-[1.02] hover:drop-shadow-md active:scale-100"
            onClick={() => handleViewFullWriting()}
            title='Visualizar Rascunho Completo'
          >
            Visualizar Rascunho
          </button>

        </div>

      </div>

    </section>
  )
}

export default DraftEditor