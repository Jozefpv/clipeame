import React, { useState } from 'react'
import { FaYoutube, FaTwitch } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'
import { ParticipateModal } from './modals/ParticipateModeal'
import { CampaignParticipants } from '../models/CampaignParticipants'
import { mapCampaignCategory, mapCampaignSocialmedia, mapCampaignType } from '../utils/mappers'

export interface FileLink {
  name: string
  url: string
}

export interface CampaignDetailProps {
  id: string,
  authorName: string
  authorAvatar: string
  title: string
  typeId: number
  imageUrl: string
  socialMediaId: number
  status: number,
  paid: number,
  budget: number
  reward: number
  maxPayment: number
  categoryId: number
  requirements: string[]
  files: unknown[],
  participants: CampaignParticipants[]
  onParticipate?: () => void
}

export const CampaignDetail: React.FC<CampaignDetailProps> = ({
  id,
  authorName,
  authorAvatar,
  title,
  typeId,
  imageUrl,
  status,
  paid,
  budget,
  socialMediaId,
  reward,
  maxPayment,
  categoryId,
  requirements,
  files,
  participants
}) => {
  const overallProgress = Math.min(100, (paid / budget) * 100)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        
        <aside className="space-y-6">
          <div className="bg-zinc-800 rounded-2xl overflow-hidden shadow">
            <div className="px-4 py-3 flex items-center gap-3 bg-zinc-700">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-white">
                <p className="font-semibold">{authorName}</p>
              </div>
            </div>
            <div className="relative h-40">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <h2 className="text-2xl font-bold">{authorName}</h2>
                <p className="text-blue-400">{mapCampaignType(typeId)}</p>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-3 overflow-x-auto">
            <p className="font-medium text-white/70 mb-2">Más virales de esta campaña</p>
            <table className="min-w-full table-auto text-white">
              <thead>
                <tr className="bg-blue-700">
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase">Contenido</th>
                  <th className="px-3 py-2 text-right text-xs font-medium uppercase">Vistas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {participants && participants.map(({ postLink, views }, idx) => (
                  <tr key={idx} className="hover:bg-blue-500/30 cursor-pointer" onClick={() => window.open(postLink, '_blank')}>
                    <td className="px-3 py-2 truncate">
                        Video
                    </td>
                    <td className="px-3 py-2 text-right">{views}</td>
                  </tr>
                ))}
                {participants.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-3 py-2 text-center text-white/50">
                      Sin participaciones
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </aside>
        <section className="bg-zinc-800 rounded-2xl border border-gray-700 flex flex-col">
          
          <header className="px-6 py-3 border-b border-gray-700 flex items-center justify-between">
            <button className="flex items-center gap-2 text-white/70 hover:text-white">
              <p className="w-5 h-5" />
              <span>Todos los premios</span>
            </button>
            <h3 className="text-lg font-semibold text-white">{authorName}</h3>
          </header>
          
          <div className="p-6 flex-1 space-y-6 overflow-auto">
            
            <div className="hidden lg:block">
              <div className="relative bg-zinc-700 rounded-2xl overflow-hidden h-56">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h1 className="text-3xl font-bold text-white">{authorName}</h1>
                  <p className="text-xl text-blue-400">{mapCampaignType(typeId)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-400/30 text-zinc-900 px-4 py-3 rounded-full text-sm">
              <p className="font-medium text-yellow-100/100">ⓘ Envía tu post para que lo revisen en el plazo de 1 hora desde su publicación.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 text-sm">
              <div className='col-span-2'>
                <p className="font-medium text-white/70">PAGADO</p>
                <p className="font-bold text-white">
                  {paid.toFixed(2)}€ de {budget.toFixed(0)}€
                </p>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-white/70">{overallProgress.toFixed(0)}%</p>
              </div>
              <div>
                <p className="font-medium text-white/70">RECOMPENSA</p>
                <p className="font-bold text-white">{reward}</p>
              </div>
              <div>
                <p className="font-medium text-white/70">TIPO DE CONTENIDO</p>
                <p className="font-bold text-white">{mapCampaignType(typeId)}</p>
              </div>
              <div>
                <p className="font-medium text-white/70">PAGO MÁXIMO</p>
                <p className="font-bold text-white">{maxPayment.toFixed(0)}€</p>
              </div>
              <div>
                <p className="font-medium text-white/70">CATEGORÍA</p>
                <p className="font-bold text-white">{mapCampaignCategory(categoryId)}</p>
              </div>
              <div>
                <p className="font-medium text-white/70">ESTADO</p>
                {status === 0 && <p className="text-sm text-yellow-400">Pendiente</p>}
                {status === 1 && <p className="text-sm text-green-400">Activa</p>}
                {status === 2 && <p className="text-sm text-red-400">Finalizada</p>}
              </div>
            </div>
            
            <div>
              <p className="font-medium text-white/70 mb-2">PLATAFORMAS</p>
              <div className="flex items-center gap-3 text-lg">
                {mapCampaignSocialmedia(socialMediaId).includes('YOUTUBE') && <FaYoutube className="w-5 h-5" />}
                {mapCampaignSocialmedia(socialMediaId).includes('TIKTOK') && <SiTiktok className="w-5 h-5" />}
                {mapCampaignSocialmedia(socialMediaId).includes('INSTAGRAM') && <FaTwitch className="w-5 h-5" />}
              </div>
            </div>
            
            <div>
              <p className="font-medium text-white/70 mb-2">REQUISITOS</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-white">
                {requirements.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>
            
            <div>
              <p className="font-medium text-white/70 mb-2">ARCHIVOS</p>
              <ul className="space-y-2">
                {files && files.map(f => (
                  <li>
                    <a
                      href={f}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
                    >
                      <span className="w-4 h-4 grid place-items-center bg-white/20 rounded-full">+</span>
                      test
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="font-medium text-white/70 mb-2">DESCARGO DE RESPONSABILIDAD</p>
              <p className="text-sm text-white">
                Sube tu clip de {authorName} bajo tu propia responsabilidad. Asegúrate de cumplir con todos los requisitos de calidad y derechos de imagen.
              </p>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-400 text-white font-semibold px-6 py-2 rounded-full transition cursor-pointer"
            >
              PARTICIPAR
            </button>
          </div>
        </section>
      </div>
    </div>
     <ParticipateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        campaignId={id}
      />
    </>
  )
}
