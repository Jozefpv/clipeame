import React, { useState, useContext } from 'react'
import { DashboardGateway } from '../../gateways/dashboard.gateway'
import { AuthContext } from '../../context/AuthContext'
import { Campaign } from '../../models/CampingModel'

interface CreateCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (newCampaign: Campaign) => void
}

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const { profile } = useContext(AuthContext)
  const gateway = new DashboardGateway()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [reward, setReward] = useState<number | ''>('')
  const [type, setType] = useState('Clip')
  const [socialMedia, setSocialMedia] = useState('YouTube')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)
    if (!title.trim() || !description.trim() || !imageUrl.trim() 
      || !budget || !reward || !startDate || !endDate) {
      setError('Por favor rellena todos los campos obligatorios.')
      return
    }

    setLoading(true)
    try {
      const newCampaign = await gateway.addCampaign({
        title,
        description,
        imageUrl,
        budget: Number(budget),
        paid: 0,
        reward: Number(reward),
        type,
        socialMedia,
        requirements: [],
        category: '',
        files: [],
        status: 0,
        creationDate: new Date(),         
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        authorId: profile.id,
        authorName: profile.profileName,
        authorAvatar: profile.avatarUrl,
      })
      onCreated(newCampaign)
      onClose()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error creando campaña')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Crear campaña</h2>
          <button
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            ✕
          </button>
        </header>

        <div className="px-6 py-4 space-y-4 text-white text-sm">
          {error && <p className="text-red-400">{error}</p>}

          <div className="space-y-1">
            <label className="block text-white/80">Título*</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nombre de la campaña"
              className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-white/80">Descripción*</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Explica brevemente la campaña"
              className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-white/80">URL de imagen*</label>
            <input
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://…"
              className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-white/80">Presupuesto (€)*</label>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">Recompensa (€ por 1K visitas)*</label>
              <input
                type="number"
                value={reward}
                onChange={e => setReward(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-white/80">Tipo*</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option>Clip</option>
                <option>Short</option>
                <option>Reel</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">Red social*</label>
              <select
                value={socialMedia}
                onChange={e => setSocialMedia(e.target.value)}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              >
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Instagram</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-white/80">Inicio*</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-white/80">Fin*</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <footer className="px-6 py-4 border-t border-gray-700 text-right">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full mr-2 disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Creando…' : 'Crear campaña'}
          </button>
        </footer>
      </div>
    </div>
  )
}
