import React, { useState } from 'react'
import { FaYoutube, FaTwitch } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'
import { ParticipateModal } from './modals/ParticipateModeal'

export interface FileLink {
  name: string
  url: string
}

export interface CampaignDetailProps {
  id: string,
  authorName: string
  authorAvatar: string
  title: string
  type: string
  imageUrl: string
  socialMedia: string
  paid: number
  budget: number
  reward: number
  maxPayment: number
  category: string
  requirements: string[]
  files: string[]
  onParticipate?: () => void
}

export const CampaignDetail: React.FC<CampaignDetailProps> = ({
  id,
  authorName,
  authorAvatar,
  title,
  type,
  imageUrl,
  paid,
  budget,
  socialMedia,
  reward,
  maxPayment,
  category,
  requirements,
  files,
}) => {
  const overallProgress = Math.min(100, (paid / budget) * 100)
  const videoProgress   = Math.min(100, (35.50 / budget) * 100)
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
                <p className="text-sm text-green-400">21 miembros en línea</p>
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
                <p className="text-blue-400">{type}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-2xl overflow-hidden shadow">
            <div className="px-4 py-2 flex items-center gap-2 bg-blue-700">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
              />
              <span className="text-sm text-white/90">
                {authorName} ganó <strong>35.50€</strong> en este vídeo
              </span>
            </div>
            <div className="w-full aspect-video">
              <iframe
                src="https://www.youtube.com/watch?v=nr9ldQ5JR5c"
                title={title}
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="px-4 py-3">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-white text-xs">
                <span>35.50€ de {budget.toFixed(0)}€</span>
                <span>{videoProgress.toFixed(0)}%</span>
              </div>
              <div className="mt-2 text-right">
                <span className="inline-block bg-white text-zinc-900 text-[10px] px-2 py-1 rounded-full">
                  €{reward} / 1K
                </span>
              </div>
            </div>
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
                  <p className="text-xl text-blue-400">{type}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-400/30 text-zinc-900 px-4 py-3 rounded-full text-sm">
              <p className="font-medium text-yellow-100/100">ⓘ Envía tu post para que lo revisen en el plazo de 1 hora desde su publicación.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
              <div>
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
                <p className="font-bold text-white">{type}</p>
              </div>
              <div>
                <p className="font-medium text-white/70">PAGO MÁXIMO</p>
                <p className="font-bold text-white">{maxPayment.toFixed(0)}€</p>
              </div>
              <div>
                <p className="font-medium text-white/70">CATEGORÍA</p>
                <p className="font-bold text-white">{category}</p>
              </div>
            </div>
            
            <div>
              <p className="font-medium text-white/70 mb-2">PLATAFORMAS</p>
              <div className="flex items-center gap-3 text-lg">
                {socialMedia.toLowerCase().includes('youtube') && <FaYoutube className="text-white"/>}
                {socialMedia.toLowerCase().includes('tiktok')  && <SiTiktok className="text-white"/>}
                {socialMedia.toLowerCase().includes('twitch')  && <FaTwitch className="text-white"/>}
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
                {files.map(f => (
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition cursor-pointer"
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
