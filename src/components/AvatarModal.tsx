import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { AuthGateway } from '../gateways/auth.gateway'
import { AuthContext } from '../context/AuthContext'

interface AvatarModalProps {
  isOpen: boolean
  onClose: () => void
  currentUrl: string
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
}) => {
  const [preview, setPreview] = useState<string>(currentUrl)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const gateway = new AuthGateway()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { profile, setProfile } = useContext(AuthContext);
  

  
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }
  
  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const url = await gateway.uploadAvatar(file)
      setPreview(url)
      setProfile({
        ...profile,
        avatarUrl: url,
      })
      
      onClose()
    } catch (err) {
      console.error(err)
      alert('Error subiendo avatar')
    } finally {
      setLoading(false)
    }
  }
  
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isOpen) {
      setPreview(currentUrl)
      setFile(null)
    }
  }, [isOpen, currentUrl])
  
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-xl max-w-sm w-full mx-4 p-6"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Cambiar Avatar</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={loading}
          >
            ✕
          </button>
        </header>

        <div className="flex flex-col items-center space-y-4">
          <div
            onClick={triggerFileSelect}
            className="relative group cursor-pointer"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-600 transition-all duration-200 group-hover:brightness-75"
            />
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <span className="text-white text-sm font-medium">Cambiar</span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={loading}
            className="hidden"
          />
        </div>

        <footer className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50"
          >
            {loading ? 'Subiendo...' : 'Guardar'}
          </button>
        </footer>
      </div>
    </div>
  )
}
