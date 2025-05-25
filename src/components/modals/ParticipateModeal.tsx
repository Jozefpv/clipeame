import React, { useState } from 'react'
import { DashboardGateway } from '../../gateways/dashboard.gateway'

interface ParticipateModalProps {
  isOpen: boolean
  onClose: () => void
  campaignId: string
}

export const ParticipateModal: React.FC<ParticipateModalProps> = ({
  isOpen,
  onClose,
  campaignId,
}) => {
  const [postLink, setPostLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const gateway = new DashboardGateway()

  const handleSubmit = async () => {
    setError(null)
    setSuccess(null)

    if (!postLink.trim()) {
      setError('El enlace no puede estar vacío.')
      return
    }

    setLoading(true)
      try {
          await gateway.participate(campaignId, postLink.trim())
          setSuccess('¡Participación satisfactoria!')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err)
      } finally {

        setLoading(false)
      }
  }

  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0
        bg-black/30
        backdrop-blur-xs
        flex items-center justify-center
        z-50
      "
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-xl w-full max-w-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Crear envío</h2>
          <button
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            ✕
          </button>
        </header>

        <div className="px-6 py-4 space-y-4 text-white text-sm">
          <div className="bg-yellow-400/30 text-zinc-900 px-4 py-3 rounded-full text-sm">
            <p className="font-medium text-yellow-100/100">
              ⓘ Solo las visualizaciones posteriores al envío cuentan para el pago. Envíalo tan pronto como lo publiques para recibir el pago por todas tus visitas.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Envía tu publicación en redes sociales
            </h3>
            <p className="text-white/80">
              Comparte el enlace de tu publicación abajo. Una vez aprobado, comenzarás a ganar recompensas.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-white/80">Enlace*</label>
            <input
              type="text"
              value={postLink}
              onChange={e => setPostLink(e.target.value)}
              placeholder="https://tiktok.com/..."
              className="w-full bg-zinc-800 border border-gray-600 px-3 py-2 rounded focus:outline-none focus:border-blue-500 text-white"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}
        </div>

        <footer className="px-6 py-4 border-t border-gray-700 text-right">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full mr-2 disabled:opacity-50 cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-400 text-white px-5 py-2 rounded-full disabled:opacity-50 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </footer>
      </div>
    </div>
  )
}
